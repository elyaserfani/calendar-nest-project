import { NotificationInterface } from './notification.interface';

export interface EmailNotificationInterface extends NotificationInterface {
  sendEmail(to: string, subject: string, body: string): Promise<void>;
}
