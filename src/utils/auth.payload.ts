import { Permission } from 'src/entities';

export class AuthPayload {
  sub: number;
  email: string;
  username: string;
  iat: number;
  role: string;
  permissions: Permission[];
}
