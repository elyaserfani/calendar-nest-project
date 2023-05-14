import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtHelper } from 'src/helper/jwt.helper';
import { DateHelper } from '../../helper';
import { Role } from '../role/entity/role.entity';
import { User } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), JwtModule],
  controllers: [UserController],
  providers: [UserService, DateHelper, JwtHelper],
})
export class UserModule {}
