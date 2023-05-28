import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sanitize, Trim } from 'src/decorators';
import { Permission } from 'src/entities';
import { Type } from 'class-transformer';

export class CreateRoleRequestDto {
  @ApiProperty({
    example: 'Role name',
    description: 'Enter your role name',
    maxLength: 90,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(90)
  @Sanitize()
  @Trim()
  name: string;

  @ArrayNotEmpty()
  @ApiProperty({
    type: [Permission],
    description: 'An array of permission associated with the role',
    example: [
      {
        id: 6,
        name: 'UPDATE',
      },
      {
        id: 7,
        name: 'READ',
      },
      {
        id: 8,
        name: 'WRITE',
      },
    ],
  })
  permissions: Permission[];
}
