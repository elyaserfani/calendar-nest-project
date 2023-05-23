import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/exceptions';
import { SuccessResponseDto } from 'src/commons';
import {
  CreateEventRequestDto,
  CreateEventResponseDto,
  EventsResponseDto,
  GetEventResponseDto,
  UpdateEventRequestDto,
  UpdateEventResponseDto,
} from 'src/dtos/events';
import { IEventRepository } from 'src/interfaces/repositories';
import { IEventScheduler } from 'src/interfaces';
import { Cron } from '@nestjs/schedule';
import { Notification } from '../notification';

@Injectable()
export class EventService implements IEventScheduler {
  constructor(
    @Inject('IEventRepository') private eventRepository: IEventRepository,
    @Inject('NOTIFICATION_TYPE')
    private readonly notification: Notification,
  ) {}

  @Cron('*/5 * * * * *') //Run every 5 seconds
  async sendEventReminders(): Promise<void> {
    const currentDate = new Date();
    const events = await this.eventRepository.findNotNotifiedEvents(
      currentDate,
      false,
    );
    for (const event of events) {
      this.notification.sendNotification({
        subject: 'Event reminder',
        email: event.user.email,
        phoneNumber: '09153887158',
        message: `Your event "${event.title}" is due on ${event.due_date}.`,
      });
      await this.eventRepository.updateEvent(event.id, { notified: true });
    }
  }

  async createEvent(
    createEventRequestDto: CreateEventRequestDto,
    userId: number,
  ): Promise<CreateEventResponseDto> {
    const savedEvent = await this.eventRepository.createEvent(
      createEventRequestDto,
      userId,
    );
    return {
      data: {
        event: {
          id: savedEvent.id,
          title: savedEvent.title,
          description: savedEvent.description,
          due_date: savedEvent.due_date,
        },
      },
    };
  }

  async findEvents(
    page: number,
    pageSize: number,
    userId: number,
  ): Promise<EventsResponseDto> {
    const [data, total] = await this.eventRepository.pagination(
      userId,
      page,
      pageSize,
    );
    return {
      data: data,
      meta: {
        total: total,
        page: Number(page),
        pageSize: data.length,
      },
    };
  }

  async getEvent(
    eventId: number,
    userId: number,
  ): Promise<GetEventResponseDto> {
    const event = await this.eventRepository.checkEventOwnership(
      eventId,
      userId,
    );
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return {
      data: {
        event: event,
      },
    };
  }

  async updateEvent(
    eventId: number,
    updateEventRequestDto: UpdateEventRequestDto,
    userId: number,
  ): Promise<UpdateEventResponseDto> {
    const event = await this.eventRepository.checkEventOwnership(
      eventId,
      userId,
    );
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    await this.eventRepository.updateEvent(eventId, {
      title: updateEventRequestDto.title,
      description: updateEventRequestDto.description,
      due_date: updateEventRequestDto.due_date,
      updated_at: new Date(),
    });
    const updatedEvent = await this.eventRepository.findById(eventId);
    return {
      data: {
        event: {
          id: updatedEvent.id,
          title: updatedEvent.title,
          description: updatedEvent.description,
          due_date: updatedEvent.due_date,
          created_at: updatedEvent.created_at,
          updated_at: updatedEvent.updated_at,
        },
      },
    };
  }

  async deleteEvent(
    eventId: number,
    userId: number,
  ): Promise<SuccessResponseDto> {
    const event = await this.eventRepository.checkEventOwnership(
      eventId,
      userId,
    );
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    await this.eventRepository.deleteEvent(event.id);
    return {
      data: {
        result: { success: true },
      },
    };
  }
}
