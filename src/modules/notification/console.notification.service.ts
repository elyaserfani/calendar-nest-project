import { ConsoleNotificationInterface } from 'src/interfaces/notifications';

export class ConsoleNotificationService
  implements ConsoleNotificationInterface
{
  logMessage(message: string) {
    console.log('Console Notificatoin Service : ' + message);
  }
  sendNotification(message: string) {
    console.log('Console Notificatoin Service : ' + message);
  }
}
