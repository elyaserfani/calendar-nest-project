import { User } from 'src/entities';

export interface IEvent {
  id: number;
  title: string;
  description: string;
  due_date: Date;
  notified: boolean;
  user: User;
  created_at: Date;
  updated_at: Date;
}
