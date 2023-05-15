import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';
import { EventModule } from './event/event.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { JwtStrategy } from 'src/utils';
import * as Joi from 'joi';
import { UtilityModule } from './utility/utility.module';

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
  ],
  exports: [JwtModule],
  providers: [JwtStrategy],
})
export class AppModule {}
