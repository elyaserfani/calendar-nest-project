import { Permission } from 'src/entities';
import { DeleteResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IPermissionRepository {
  createPermission(permissionData: Partial<Permission>): Promise<Permission>;
  findById(id: number): Promise<Permission | undefined>;
  deletePermission(id: number): Promise<DeleteResult>;
  pagination(page: number, pageSize: number): Promise<[Permission[], number]>;
  updatePermission(
    permissionId: number,
    entity: QueryDeepPartialEntity<Permission>,
  ): Promise<UpdateResult>;
}
