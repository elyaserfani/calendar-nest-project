import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common';

class CreatedEvent {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty({ example: '2023-05-10 11:49:53' })
  due_date: Date;
}
export class CreateEventResponseDto implements ResponseDto {
  @ApiProperty({ type: CreatedEvent })
  data: {
    event: CreatedEvent;
  };
}
