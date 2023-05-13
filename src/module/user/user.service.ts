import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role, User } from 'src/entity';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from './dto';
import { BadRequestException, NotFoundException } from 'src/exception';
import { JwtHelper } from 'src/helper/jwt.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtHelper: JwtHelper,
  ) {}

  async registerUser(
    registerRequestDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    const user = await this.userRepository.findOneBy({
      username: registerRequestDto.username,
    });
    if (user) {
      throw new BadRequestException('User with this username already exists');
    }
    const role = await this.roleRepository.findOneBy({
      name: registerRequestDto.role,
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    const hashedPassword = await bcrypt.hash(registerRequestDto.password, 10);
    const newUser = this.userRepository.create({
      username: registerRequestDto.username,
      email: registerRequestDto.email,
      password: hashedPassword,
      nickname: registerRequestDto.nickname,
      role: registerRequestDto.role,
    });
    const savedUser = await this.userRepository.save(newUser);
    const token = await this.jwtHelper.generateToken(savedUser);
    return {
      data: {
        user: {
          id: savedUser.id,
          username: savedUser.username,
          email: savedUser.email,
          nickname: savedUser.nickname,
          role: savedUser.role,
          accessToken: token,
        },
      },
    };
  }

  async loginUser(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOneBy({
      username: loginRequestDto.username,
    });
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
    const token = await this.jwtHelper.generateToken(user);
    return {
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          nickname: user.nickname,
          role: user.role,
          accessToken: token,
        },
      },
    };
  }
}
