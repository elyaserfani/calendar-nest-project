import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database.module';
import { EventModule } from './event.module';
import { RoleModule } from './role.module';
import { UserModule } from './user.module';
import { JwtStrategy } from 'src/utils';

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
