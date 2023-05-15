import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
