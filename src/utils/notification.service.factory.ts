import { NotificationType } from 'src/commons';
import { NotificationInterface } from 'src/interfaces/notifications';
import {
  ConsoleNotificationService,
  EmailNotificationService,
  SmsNotificationService,
} from 'src/modules/notification';

export class NotificationServiceFactory {
  createNotificationService(type: NotificationType): NotificationInterface {
    switch (type) {
      case NotificationType.EMAIL:
        return new EmailNotificationService();
      case NotificationType.SMS:
        return new SmsNotificationService();
      case NotificationType.CONSOLE:
        return new ConsoleNotificationService();
      default:
        throw new Error('Invalid notification type');
    }
  }
}
