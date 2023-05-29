import { Role } from 'src/entities';

export interface IPermission {
  id: number;
  name: string;
  roles: Role[];
}
