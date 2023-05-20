import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../database';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}
}
