import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Role, Event, Permission } from 'src/entities';
import { EventRepository } from './event.repository';
import { RoleRepository } from './role.repository';
import { UserRepository } from './user.repository';
import { PermissionRepository } from './permission.repository';

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
        entities: [Permission, Role, User, Event],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([User, Role, Permission, Event]),
  ],
  exports: [
    TypeOrmModule,
    UserRepository,
    EventRepository,
    RoleRepository,
    PermissionRepository,
  ],
  providers: [
    UserRepository,
    EventRepository,
    RoleRepository,
    PermissionRepository,
  ],
})
export class DatabaseModule {}
