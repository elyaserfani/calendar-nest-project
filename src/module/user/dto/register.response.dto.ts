import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/module/common';

class RegisteredUser {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  accessToken: string;
}
export class RegisterResponseDto implements ResponseDto {
  @ApiProperty({ type: RegisteredUser })
  data: {
    user: RegisteredUser;
  };
}
