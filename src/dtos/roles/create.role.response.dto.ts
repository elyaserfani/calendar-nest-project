import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/commons';
import { Permission } from 'src/entities';

class CreatedRole {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  permissions: Permission[];
}
export class CreateRoleResponseDto implements ResponseDto {
  @ApiProperty({ type: CreatedRole })
  data: {
    role: CreatedRole;
  };
}
