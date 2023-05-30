import { IRole } from 'src/modules/role';
import { IDeleteResult } from '../common';

export interface IRoleRepository {
  findByName(name: string): Promise<IRole | undefined>;
  findById(id: number): Promise<IRole | undefined>;
  createRole(roleData: Partial<IRole>): Promise<IRole>;
  deleteRole(id: number): Promise<IDeleteResult>;
  pagination(page: number, pageSize: number): Promise<[IRole[], number]>;
}
