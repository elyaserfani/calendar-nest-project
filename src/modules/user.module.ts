import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { UtilityModule } from './utility.module';
import { CustomConfigService } from 'src/services';
import { ConfigModule } from '@nestjs/config';
import { RoleRepository, UserRepository } from 'src/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    JwtModule,
    UtilityModule,
    ConfigModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, RoleRepository, CustomConfigService],
})
export class UserModule {}
