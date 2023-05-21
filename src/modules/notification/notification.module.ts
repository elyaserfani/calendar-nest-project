import { Module } from '@nestjs/common';
import {
  EmailNotificationService,
  ConsoleNotificationService,
  SmsNotificationService,
} from './notification.service';

@Module({
  providers: [
    SmsNotificationService,
    EmailNotificationService,
    ConsoleNotificationService,
  ],
  exports: [
    SmsNotificationService,
    EmailNotificationService,
    ConsoleNotificationService,
  ],
})
export class NotificationModule {}
