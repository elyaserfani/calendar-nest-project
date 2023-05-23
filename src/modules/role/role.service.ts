import { Inject, Injectable } from '@nestjs/common';
import { RoleRepository } from '../database';

@Injectable()
export class RoleService {
  constructor(
    @Inject('IRoleRepository') private readonly roleRepository: RoleRepository,
  ) {}
}
