import { Role } from 'src/entities';
import { DeleteResult } from 'typeorm';

export interface IRoleRepository {
  findByName(name: string): Promise<Role | undefined>;
  findById(id: number): Promise<Role | undefined>;
  createRole(roleData: Partial<Role>): Promise<Role>;
  deleteRole(id: number): Promise<DeleteResult>;
  pagination(page: number, pageSize: number): Promise<[Role[], number]>;
}
