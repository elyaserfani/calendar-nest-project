import { Permission } from 'src/entities';

export interface IRole {
  id: number;
  name: string;
  permissions: Permission[];
}
