import { Inject, Injectable } from '@nestjs/common';
import { RoleRepository } from '../database';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY') private readonly roleRepository: RoleRepository,
  ) {}
}
