import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { RoleRepository } from '../database/role.repository';
import { UserRepository } from '../database/user.repository';
import { UtilityModule } from '../utility';

@Module({
  imports: [DatabaseModule, JwtModule, UtilityModule],
  providers: [
    UserService,
    UserRepository,
    RoleRepository,
    { provide: 'USER_REPOSITORY', useClass: UserRepository },
    { provide: 'ROLE_REPOSITORY', useClass: RoleRepository },
  ],
  exports: [UserService, UserRepository, RoleRepository],
})
export class UserModule {}
