import { Module } from '@nestjs/common';
import { UserController } from '../../controllers/user.controller';
import { UserService } from '../../services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { UtilityModule } from '../utility/utility.module';
import { CustomConfigService } from 'src/services';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { RoleRepository } from '../role/role.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [DatabaseModule, JwtModule, UtilityModule, ConfigModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, RoleRepository, CustomConfigService],
})
export class UserModule {}
