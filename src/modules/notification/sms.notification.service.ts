import { SmsNotificationInterface } from 'src/interfaces/notifications';

export class SmsNotificationService implements SmsNotificationInterface {
  sendSMS(to: string, message: string) {
    throw new Error('Method not implemented.');
  }
  sendNotification(message: string) {
    throw new Error('Method not implemented.');
  }
}
