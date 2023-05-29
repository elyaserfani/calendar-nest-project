import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sanitize, Trim } from 'src/decorators';

export class RegisterRequestDto {
  @ApiProperty({
    example: 'Username',
    description: 'Enter your username',
    maxLength: 90,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(90)
  @Sanitize()
  @Trim()
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
  @Sanitize()
  @Trim()
  email: string;

  @ApiProperty({
    example: 'Password',
    description: 'Enter your password',
    maxLength: 256,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Sanitize()
  @Trim()
  password: string;

  @ApiProperty({
    example: 'Nickname',
    description: 'Enter your nickname',
    maxLength: 256,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Sanitize()
  @Trim()
  nickname: string;

  @ApiProperty({
    example: 1,
    description: 'Enter your role id',
  })
  @IsNumber()
  @IsNotEmpty()
  role: number;
}
