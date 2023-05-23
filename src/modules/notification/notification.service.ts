import { Injectable } from '@nestjs/common';
import { Notification, NotificationData } from './notification.interface';

@Injectable()
export class SmsNotificationService implements Notification {
  sendNotification(data: NotificationData): void {
    console.log(`Sending SMS to ${data.phoneNumber}: ${data.message}`);
  }
}

@Injectable()
export class ConsoleNotificationService implements Notification {
  sendNotification(data: NotificationData): void {
    console.log(`Console notification: ${data.message}`);
  }
}

@Injectable()
export class EmailNotificationService implements Notification {
  sendNotification(data: NotificationData): void {
    console.log(`Sending email to ${data.email}`);
    console.log(`Subject: ${data.subject}`);
    console.log(`Message: ${data.message}`);
  }
}
