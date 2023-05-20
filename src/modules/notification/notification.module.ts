import { Module } from '@nestjs/common';
import { ConsoleNotificationService } from './console.notification.service';
import { SmsNotificationService } from './sms.notification.service';
import { EmailNotificationService } from './email.notification.service';

@Module({
  providers: [
    ConsoleNotificationService,
    EmailNotificationService,
    SmsNotificationService,
  ],
  exports: [
    ConsoleNotificationService,
    EmailNotificationService,
    SmsNotificationService,
  ],
})
export class NotificationModule {}
