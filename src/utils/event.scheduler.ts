import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EventRepository } from 'src/modules/database';
import { NotificationServiceFactory } from './notification.service.factory';
import { NotificationType } from 'src/commons';

@Injectable()
export class EventScheduler {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly notificationServiceFactory: NotificationServiceFactory,
  ) {}

  @Cron('*/5 * * * * *') //Run every 5 second
  async sendEventReminders() {
    const currentDate = new Date();
    const events = await this.eventRepository.findNotNotifiedEvents(
      currentDate,
      false,
    );
    for (const event of events) {
      const notificationService =
        this.notificationServiceFactory.createNotificationService(
          NotificationType.CONSOLE,
        );
      notificationService.sendNotification(event.title);
      // const mailOptions = {
      //   to: event.user.email,
      //   subject: 'Event Reminder',
      //   text: `Your event "${event.title}" is due on ${event.due_date}.`,
      // };
      // const mailSent = await this.mailerService.sendMail(mailOptions);
      // if (mailSent) {
      //   await this.eventRepository.updateEvent(event.id, { notified: true });
      //   console.log(
      //     `An email has been sent to ${event.user.email} for ${event.title}`,
      //   );
      // }
    }
  }
}
