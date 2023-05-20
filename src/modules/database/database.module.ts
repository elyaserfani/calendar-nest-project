import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRepository } from './event.repository';
import { RoleRepository } from './role.repository';
import { UserRepository } from './user.repository';
import { User, Role, Event } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB_NAME,
        entities: [Role, User, Event],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([User, Role, Event]),
  ],
  exports: [TypeOrmModule, UserRepository, EventRepository, RoleRepository],
  providers: [UserRepository, EventRepository, RoleRepository],
})
export class DatabaseModule {}
