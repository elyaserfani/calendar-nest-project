import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationType } from 'src/commons';
import { EventRepository } from 'src/modules/database';
import { Notification, NotificationFactory } from 'src/modules/notification';

@Injectable()
export class EventScheduler {
  constructor(private readonly eventRepository: EventRepository) {}

  @Cron('*/5 * * * * *') //Run every 5 second
  async sendEventReminders() {
    const currentDate = new Date();
    const events = await this.eventRepository.findNotNotifiedEvents(
      currentDate,
      false,
    );
    for (const event of events) {
      const notification: Notification = NotificationFactory.createNotification(
        NotificationType.CONSOLE,
      );
      notification.sendNotification({
        subject: 'Event reminder',
        email: event.user.email,
        phoneNumber: '09153887158',
        message: `Your event "${event.title}" is due on ${event.due_date}.`,
      });
      await this.eventRepository.updateEvent(event.id, { notified: true });
    }
  }
}
