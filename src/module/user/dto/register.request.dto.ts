import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiProperty({
    example: 'Username',
    description: 'Enter your username',
    maxLength: 90,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(90)
  username: string;

  @ApiProperty({
    example: 'Email@domain.com',
    description: 'Enter your email',
    maxLength: 256,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(256)
  email: string;

  @ApiProperty({
    example: 'Password',
    description: 'Enter your password',
    maxLength: 256,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  password: string;

  @ApiProperty({
    example: 'Nickname',
    description: 'Enter your nickname',
    maxLength: 256,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  nickname: string;

  @ApiProperty({
    example: 'Role',
    description: 'Enter your role',
    maxLength: 256,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  role: string;
}
