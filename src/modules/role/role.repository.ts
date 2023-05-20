import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from 'src/entities';
import { IRoleRepository } from '../../interfaces';

@Injectable()
export class RoleRepository
  extends Repository<Role>
  implements IRoleRepository
{
  findByName(name: string): Promise<Role> {
    return this.findOneBy({ name });
  }
}
