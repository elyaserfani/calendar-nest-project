import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column()
  creation_time: Date;

  @Column()
  update_time: Date;

  @Column()
  role: string;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];
}
