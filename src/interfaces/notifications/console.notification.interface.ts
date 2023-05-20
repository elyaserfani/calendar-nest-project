import { NotificationInterface } from './notification.interface';

export interface ConsoleNotificationInterface extends NotificationInterface {
  logMessage(message: string);
}
