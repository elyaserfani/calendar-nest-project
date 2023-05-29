import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/commons/response.dto';
import { Permission } from 'src/entities';

class Roles {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  permissions: Permission[];
}
class Meta {
  @ApiProperty()
  page: number;
  @ApiProperty()
  pageSize: number;
  @ApiProperty()
  total: number;
}
export class RolesResponseDto implements ResponseDto {
  @ApiProperty({ isArray: true, type: Roles })
  data: Roles[];

  @ApiProperty()
  meta: Meta;
}
