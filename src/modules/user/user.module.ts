import { Module } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { UtilityModule } from '../utility/utility.module';
import { DatabaseModule } from '../database/database.module';
import { RoleRepository } from '../role/role.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [DatabaseModule, JwtModule, UtilityModule],
  providers: [UserService, UserRepository, RoleRepository],
  exports: [UserService, UserRepository, RoleRepository],
})
export class UserModule {}
