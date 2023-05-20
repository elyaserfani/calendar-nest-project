import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {
  JwtHelper,
  DateHelper,
  JwtStrategy,
  CustomConfigService,
} from 'src/utils';

@Module({
  imports: [JwtModule, ConfigModule],
  providers: [JwtHelper, JwtStrategy, DateHelper, CustomConfigService],
  exports: [JwtHelper, JwtStrategy, DateHelper, CustomConfigService],
})
export class UtilityModule {}
