import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/commons';

class CreatedPermission {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
export class CreatePermissionResponseDto implements ResponseDto {
  @ApiProperty({ type: CreatedPermission })
  data: {
    permission: CreatedPermission;
  };
}
