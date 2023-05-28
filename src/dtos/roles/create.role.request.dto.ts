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

  @ApiProperty({
    example: 'Permissions',
    description: 'Enter your permissions id',
    maxLength: 90,
  })
  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  @Type(() => Permission)
  permissions: Permission[];
}
