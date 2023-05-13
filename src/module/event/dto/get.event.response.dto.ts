import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common';

class GetEvent {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty({ example: '2023-05-10 11:49:53' })
  due_date: Date;
  @ApiProperty({ example: '2023-05-10 11:49:53' })
  created_at: Date;
  @ApiProperty({ example: '2023-05-10 11:49:53' })
  updated_at: Date;
}
export class GetEventResponseDto implements ResponseDto {
  @ApiProperty({ type: GetEvent })
  data: {
    event: GetEvent;
  };
}
