import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'src/exceptions';
import { SuccessResponseDto } from 'src/commons';
import { Event } from '../entities/event.entity';
import {
  CreateEventRequestDto,
  CreateEventResponseDto,
  GetEventResponseDto,
  UpdateEventRequestDto,
  UpdateEventResponseDto,
} from 'src/dtos/events';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async createEvent(
    createEventRequestDto: CreateEventRequestDto,
    userId: number,
  ): Promise<CreateEventResponseDto> {
    const newEvent = this.eventRepository.create({
      title: createEventRequestDto.title,
      description: createEventRequestDto.description,
      due_date: createEventRequestDto.due_date,
      user: { id: userId },
    });
    const savedEvent = await this.eventRepository.save(newEvent);
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
  ): Promise<{
    data: Event[];
    meta: { total: number; page: number; pageSize: number };
  }> {
    const [data, total] = await this.eventRepository.findAndCount({
      where: { user: { id: userId } },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
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
    const event = await this.eventRepository.findOneBy({
      id: eventId,
      user: { id: userId },
    });
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
    const event = await this.eventRepository.findOneBy({
      id: eventId,
      user: { id: userId },
    });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    await this.eventRepository.update(eventId, {
      title: updateEventRequestDto.title,
      description: updateEventRequestDto.description,
      due_date: updateEventRequestDto.due_date,
      updated_at: new Date(),
    });
    const updatedEvent = await this.eventRepository.findOneBy({ id: eventId });
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
    const event = await this.eventRepository.findOneBy({
      id: eventId,
      user: { id: userId },
    });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    await this.eventRepository.delete(event.id);
    return {
      data: {
        result: { success: true },
      },
    };
  }
}
