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
import { DatabaseModule, EventRepository } from '../database';
import { EventModule } from '../event';

@Module({
  imports: [
    JwtModule,
    ConfigModule,
    ScheduleModule.forRoot(),
    DatabaseModule,
    EventModule,
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
    {
      provide: 'IEventRepository',
      useClass: EventRepository,
    },
  ],
  exports: [
    JwtHelper,
    JwtStrategy,
    DateHelper,
    CustomConfigService,
    'IEventRepository',
  ],
})
export class UtilityModule {}
