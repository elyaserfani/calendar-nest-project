import { Controller } from '@nestjs/common';
import { RoleService } from '../module/role/service/role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
}
