import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
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
  createRole(roleData: Partial<Role>): Promise<Role> {
    const role = this.roleRepository.create({
      name: roleData.name,
      permissions: roleData.permissions,
    });
    return this.roleRepository.save(role);
  }
  findById(id: number): Promise<Role> {
    return this.roleRepository.findOneBy({ id });
  }
  deleteRole(id: number): Promise<DeleteResult> {
    return this.roleRepository.delete(id);
  }
  pagination(page: number, pageSize: number): Promise<[Role[], number]> {
    return this.roleRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }
}
