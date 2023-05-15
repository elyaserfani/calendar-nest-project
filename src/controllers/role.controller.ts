import { Controller } from '@nestjs/common';
import { RoleService } from 'src/services';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
}
