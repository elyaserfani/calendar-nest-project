import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import {
  JwtHelper,
  DateHelper,
  JwtStrategy,
  CustomConfigService,
  EventScheduler,
  NotificationServiceFactory,
} from 'src/utils';
import { DatabaseModule } from '../database';

@Module({
  imports: [
    JwtModule,
    ConfigModule,
    ScheduleModule.forRoot(),
    DatabaseModule,
    MailerModule.forRoot({
      transport: {
        service: 'Gmail',
        auth: {
          user: 'eventschedulertest@gmail.com',
          pass: 'euyxwqhlmecqhaag',
        },
      },
      defaults: {
        from: '"Nest Calendar Project" <eventschedulertest@gmail.com>',
      },
    }),
  ],
  providers: [
    JwtHelper,
    JwtStrategy,
    DateHelper,
    CustomConfigService,
    EventScheduler,
    NotificationServiceFactory,
  ],
  exports: [JwtHelper, JwtStrategy, DateHelper, CustomConfigService],
})
export class UtilityModule {}
