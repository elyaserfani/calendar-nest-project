import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    example: 1,
    required: false,
    type: Number,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  @Max(999999999999999)
  page = 1;

  @ApiProperty({
    example: 10,
    required: false,
    type: Number,
    minimum: 1,
  })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @Max(999999999999999)
  pageSize = 10;
}
