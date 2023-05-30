import { QueryDeepPartialEntity } from '../common/query.deep.partial.entity.type';
import { IDeleteResult, IUpdateResult } from '../common';
import { IPermission } from 'src/modules/permission';

export interface IPermissionRepository {
  createPermission(permissionData: Partial<IPermission>): Promise<IPermission>;
  findById(id: number): Promise<IPermission | undefined>;
  deletePermission(id: number): Promise<IDeleteResult>;
  pagination(page: number, pageSize: number): Promise<[IPermission[], number]>;
  updatePermission(
    permissionId: number,
    entity: QueryDeepPartialEntity<IPermission>,
  ): Promise<IUpdateResult>;
}
