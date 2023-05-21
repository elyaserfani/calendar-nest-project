import { Inject, Injectable } from '@nestjs/common';
import { Notification } from './notification.interface';
import { NotificationType } from 'src/commons';
import {
  ConsoleNotificationService,
  EmailNotificationService,
  SmsNotificationService,
} from './notification.service';

@Injectable()
export class NotificationFactory {
  constructor(
    @Inject('NOTIFICATION_TYPE')
    private readonly notificationType: NotificationType,
  ) {}
  createNotification(): Notification {
    switch (this.notificationType) {
      case NotificationType.SMS:
        return new SmsNotificationService();
      case NotificationType.CONSOLE:
        return new ConsoleNotificationService();
      case NotificationType.EMAIL:
        return new EmailNotificationService();
      default:
        throw new Error('Invalid notification type');
    }
  }
}
