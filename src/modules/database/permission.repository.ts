import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IPermissionRepository } from 'src/interfaces/repositories';
import { Permission } from 'src/entities';

@Injectable()
export class PermissionRepository implements IPermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}
  createPermission(permissionData: Partial<Permission>): Promise<Permission> {
    const permission = this.permissionRepository.create({
      name: permissionData.name,
    });
    return this.permissionRepository.save(permission);
  }
  findById(id: number): Promise<Permission> {
    return this.permissionRepository.findOneBy({ id });
  }
  deletePermission(id: number): Promise<DeleteResult> {
    return this.permissionRepository.delete(id);
  }
  pagination(page: number, pageSize: number): Promise<[Permission[], number]> {
    return this.permissionRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }
  updatePermission(
    permissionId: number,
    entity: QueryDeepPartialEntity<Permission>,
  ): Promise<UpdateResult> {
    return this.permissionRepository.update(permissionId, entity);
  }
}
