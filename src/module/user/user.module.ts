import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User } from 'src/entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtHelper } from 'src/helper/jwt.helper';
import { DateHelper } from '../../helper';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), JwtModule],
  controllers: [UserController],
  providers: [UserService, DateHelper, JwtHelper],
})
export class UserModule {}
