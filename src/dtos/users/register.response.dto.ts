import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/commons';

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
  role: number;
  @ApiProperty()
  accessToken: string;
}
export class RegisterResponseDto implements ResponseDto {
  @ApiProperty({ type: RegisteredUser })
  data: {
    user: RegisteredUser;
  };
}
