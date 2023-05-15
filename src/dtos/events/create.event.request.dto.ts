import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sanitize, Trim } from 'src/decorators';

export class CreateEventRequestDto {
  @ApiProperty({
    example: 'Event title',
    description: 'Enter your event title',
    maxLength: 90,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(90)
  @Sanitize()
  @Trim()
  title: string;

  @ApiProperty({
    example: 'Event description',
    description: 'Enter your event description',
    maxLength: 256,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Sanitize()
  @Trim()
  description: string;

  @ApiProperty({
    example: '2023-05-10 11:49:53',
    description: 'Enter your event due date',
    maxLength: 256,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Sanitize()
  @Trim()
  due_date: Date;
}
