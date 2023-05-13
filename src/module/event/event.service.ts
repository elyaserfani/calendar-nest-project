import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/entity';
import { Repository } from 'typeorm';
import {
  CreateEventRequestDto,
  CreateEventResponseDto,
  GetEventResponseDto,
} from './dto';
import { NotFoundException } from 'src/exception';
import { SuccessResponseDto } from 'src/common';

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
