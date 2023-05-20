import { NotificationInterface } from './notification.interface';

export interface SmsNotificationInterface extends NotificationInterface {
  sendSMS(to: string, message: string);
}
