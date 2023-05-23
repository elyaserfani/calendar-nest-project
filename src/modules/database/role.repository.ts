import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entities';
import { IRoleRepository } from 'src/interfaces/repositories';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  findByName(name: string): Promise<Role> {
    return this.roleRepository.findOneBy({ name });
  }
}
