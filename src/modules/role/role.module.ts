import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { DatabaseModule } from '../database/database.module';
import { RoleRepository } from '../database';

@Module({
  imports: [DatabaseModule],
  providers: [
    RoleService,
    RoleRepository,
    { provide: 'IRoleRepository', useClass: RoleRepository },
  ],
  exports: [RoleService],
})
export class RoleModule {}
