import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PermissionService } from './permission.service';
import { PermissionRepository } from '../database';

@Module({
  imports: [DatabaseModule],
  providers: [
    PermissionService,
    PermissionRepository,
    { provide: 'PERMISSION_REPOSITORY', useClass: PermissionRepository },
  ],
  exports: [PermissionService, PermissionRepository, 'PERMISSION_REPOSITORY'],
})
export class PermissionModule {}
