import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sanitize, Trim } from 'src/decorator';

export class LoginRequestDto {
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
}
