import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/commons/response.dto';

class Permissions {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
class Meta {
  @ApiProperty()
  page: number;
  @ApiProperty()
  pageSize: number;
  @ApiProperty()
  total: number;
}
export class PermissionsResponseDto implements ResponseDto {
  @ApiProperty({ isArray: true, type: Permissions })
  data: Permissions[];

  @ApiProperty()
  meta: Meta;
}
