import { Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/modules/role/role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}
}
