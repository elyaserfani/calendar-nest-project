import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EventRepository } from 'src/modules/database';

@Injectable()
export class EventScheduler {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly mailerService: MailerService,
  ) {}

  @Cron('*/5 * * * * *') //Run every 5 second
  async sendEventReminders() {
    const currentDate = new Date();
    const events = await this.eventRepository.findNotNotifiedEvents(
      currentDate,
      false,
    );
    for (const event of events) {
      const mailOptions = {
        to: event.user.email,
        subject: 'Event Reminder',
        text: `Your event "${event.title}" is due on ${event.due_date}.`,
      };
      const mailSent = await this.mailerService.sendMail(mailOptions);
      if (mailSent) {
        await this.eventRepository.updateEvent(event.id, { notified: true });
        console.log(
          `An email has been sent to ${event.user.email} for ${event.title}`,
        );
      }
    }
  }
}
