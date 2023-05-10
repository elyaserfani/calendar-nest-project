import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  due_date: Date;

  @ManyToOne(() => User, (user) => user.events)
  user: User;

  @CreateDateColumn()
  creation_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
