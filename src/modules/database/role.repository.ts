import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entities';
import { IRoleRepository } from '../../interfaces';

@Injectable()
export class RoleRepository
  extends Repository<Role>
  implements IRoleRepository
{
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
    super(
      roleRepository.target,
      roleRepository.manager,
      roleRepository.queryRunner,
    );
  }
  findByName(name: string): Promise<Role> {
    return this.findOneBy({ name });
  }
}
