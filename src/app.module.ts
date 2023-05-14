import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { RoleModule } from './module/role/role.module';
import { EventModule } from './module/event/event.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './util/jwt.strategy';
import { DatabaseModule } from './module/database/database.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    EventModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    DatabaseModule,
  ],
  exports: [JwtModule],
  providers: [JwtStrategy],
})
export class AppModule {}
