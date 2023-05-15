import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/commons';

class Success {
  @ApiProperty()
  success: boolean;
}

export class SuccessResponseDto implements ResponseDto {
  @ApiProperty({ type: Success })
  data: {
    result: Success;
  };
}
