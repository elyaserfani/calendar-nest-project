import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { RoleModule } from './module/role/role.module';
import { EventModule } from './module/event/event.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

console.log(process.env.JWT_SECRET);
@Module({
  imports: [
    UserModule,
    RoleModule,
    EventModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'calendardb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  exports: [JwtModule],
})
export class AppModule {}
