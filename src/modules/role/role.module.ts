import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { DatabaseModule } from '../database/database.module';
import { RoleRepository } from '../database';

@Module({
  imports: [DatabaseModule],
  providers: [
    RoleService,
    RoleRepository,
    { provide: 'ROLE_REPOSITORY', useClass: RoleRepository },
  ],
  exports: [RoleService, 'ROLE_REPOSITORY'],
})
export class RoleModule {}
