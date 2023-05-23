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
} from 'src/utils';
import { DatabaseModule } from '../database';
import { EventScheduler, NotificationModule } from '../notification';
import { NotificationType } from 'src/commons';

@Module({
  imports: [
    JwtModule,
    ConfigModule,
    ScheduleModule.forRoot(),
    DatabaseModule,
    NotificationModule,
    NotificationModule.forFeature(NotificationType.CONSOLE),
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
  ],
  exports: [
    JwtHelper,
    JwtStrategy,
    DateHelper,
    CustomConfigService,
    EventScheduler,
  ],
})
export class UtilityModule {}
