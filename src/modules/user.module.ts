import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtHelper } from 'src/helpers/jwt.helper';
import { DateHelper } from '../helpers';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), JwtModule],
  controllers: [UserController],
  providers: [UserService, DateHelper, JwtHelper],
})
export class UserModule {}
