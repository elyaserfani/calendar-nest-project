import { EmailNotificationInterface } from 'src/interfaces/notifications';

export class EmailNotificationService implements EmailNotificationInterface {
  sendEmail(to: string, subject: string, body: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  sendNotification(message: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
