import { Module } from '@nestjs/common';
import { RoleController } from '../../controllers/role.controller';
import { RoleService } from '../../services/role.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
