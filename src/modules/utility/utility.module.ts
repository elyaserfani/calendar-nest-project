import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtHelper, DateHelper, JwtStrategy } from 'src/utils';

@Module({
  imports: [JwtModule],
  providers: [JwtHelper, JwtStrategy, DateHelper],
  exports: [JwtHelper, JwtStrategy, DateHelper],
})
export class UtilityModule {}
