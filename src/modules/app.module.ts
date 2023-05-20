import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';
import { EventModule } from './event/event.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { JwtStrategy } from 'src/utils';
import * as Joi from 'joi';
import {
  EventController,
  RoleController,
  UserController,
} from 'src/controllers';
import { UtilityModule } from './utility';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_DB_NAME: Joi.string().required(),
      }),
    }),
    UserModule,
    RoleModule,
    EventModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UtilityModule,
    NotificationModule,
  ],
  exports: [JwtModule],
  providers: [JwtStrategy],
  controllers: [UserController, RoleController, EventController],
})
export class AppModule {}
