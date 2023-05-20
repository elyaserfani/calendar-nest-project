import { Controller } from '@nestjs/common';
import { RoleService } from 'src/modules/role';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
}
