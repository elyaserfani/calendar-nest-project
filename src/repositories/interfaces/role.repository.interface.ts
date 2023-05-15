import { Role } from 'src/entities';

export interface IRoleRepository {
  findByName(name: string): Promise<Role | undefined>;
}
