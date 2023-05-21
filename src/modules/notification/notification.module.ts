import { DynamicModule, Module } from '@nestjs/common';
import {
  EmailNotificationService,
  ConsoleNotificationService,
  SmsNotificationService,
} from './notification.service';
import { NotificationType } from 'src/commons';
import { NotificationFactory } from './notification.factory';

@Module({
  providers: [
    EmailNotificationService,
    ConsoleNotificationService,
    SmsNotificationService,
  ],
  exports: [
    EmailNotificationService,
    ConsoleNotificationService,
    SmsNotificationService,
  ],
})
export class NotificationModule {
  static forFeature(notificationType: NotificationType): DynamicModule {
    return {
      module: NotificationModule,
      providers: [
        NotificationFactory,
        {
          provide: 'NOTIFICATION_TYPE',
          useValue: notificationType,
        },
      ],
      exports: [NotificationFactory],
    };
  }
}
