import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException, NotFoundException } from 'src/exception';
import { SwaggerCustomException } from 'src/decorator';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,
    description: 'Register new user',
    type: [RegisterResponseDto],
  })
  @SwaggerCustomException(() => [
    new NotFoundException('Role not found'),
    new BadRequestException('User with this username already exists'),
  ])
  async register(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return await this.userService.registerUser(registerRequestDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'Login user',
    type: [LoginResponseDto],
  })
  @SwaggerCustomException(() => [
    new NotFoundException('User with this username not found'),
    new BadRequestException('Invalid credentials'),
  ])
  async login(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return await this.userService.loginUser(loginRequestDto);
  }
}
