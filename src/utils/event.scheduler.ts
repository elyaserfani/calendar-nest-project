import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from 'src/modules/database';
import { LessThanOrEqual } from 'typeorm';

@Injectable()
export class EventScheduler {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: EventRepository,
    private readonly mailerService: MailerService,
  ) {}

  @Cron('*/5 * * * * *') //Run every 5 second
  async sendEventReminders() {
    const currentDate = new Date();
    const events = await this.eventRepository.find({
      where: {
        due_date: LessThanOrEqual(currentDate),
        notified: false,
      },
      relations: ['user'],
    });
    for (const event of events) {
      const mailOptions = {
        to: event.user.email,
        subject: 'Event Reminder',
        text: `Your event "${event.title}" is due on ${event.due_date}.`,
      };
      const mailSent = await this.mailerService.sendMail(mailOptions);
      if (mailSent) {
        await this.eventRepository.update(event.id, { notified: true });
        console.log(
          `An email has been sent to ${event.user.email} for ${event.title}`,
        );
      }
    }
  }
}
