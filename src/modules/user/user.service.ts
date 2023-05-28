import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from '../../dtos/users';
import { BadRequestException, NotFoundException } from 'src/exceptions';
import { JwtHelper } from 'src/utils';
import { CustomConfigService } from '../../utils/custom.config.service';
import { IRoleRepository, IUserRepository } from 'src/interfaces/repositories';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: IUserRepository,
    @Inject('ROLE_REPOSITORY')
    private readonly roleRepository: IRoleRepository,
    private readonly jwtHelper: JwtHelper,
    private readonly customConfigService: CustomConfigService,
  ) {}

  async registerUser(
    registerRequestDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    const user = await this.userRepository.findByUsername(
      registerRequestDto.username,
    );
    if (user) {
      throw new BadRequestException('User with this username already exists');
    }
    const role = await this.roleRepository.findById(registerRequestDto.role);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    const hashedPassword = await bcrypt.hash(registerRequestDto.password, 10);
    const savedUser = await this.userRepository.createUser({
      username: registerRequestDto.username,
      email: registerRequestDto.email,
      password: hashedPassword,
      nickname: registerRequestDto.nickname,
      role: role,
    });
    const token = await this.jwtHelper.generateToken(
      await this.userRepository.findUserWithRolesAndPermissions(savedUser.id),
      this.customConfigService.getJwtSecret(),
    );
    return {
      data: {
        user: {
          id: savedUser.id,
          username: savedUser.username,
          email: savedUser.email,
          nickname: savedUser.nickname,
          role: savedUser.role.id,
          accessToken: token,
        },
      },
    };
  }

  async loginUser(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findByUsername(
      loginRequestDto.username,
    );
    if (!user) {
      throw new NotFoundException('User with this username not found');
    }
    const isPasswordValid = await bcrypt.compare(
      loginRequestDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }
    const token = await this.jwtHelper.generateToken(
      await this.userRepository.findUserWithRolesAndPermissions(user.id),
      this.customConfigService.getJwtSecret(),
    );
    return {
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          nickname: user.nickname,
          role: user.role.id,
          accessToken: token,
        },
      },
    };
  }
}
