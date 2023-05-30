import { Event, Role } from 'src/entities';

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  nickname: string;
  created_at: Date;
  updated_at: Date;
  events: Event[];
  role: Role;
}
