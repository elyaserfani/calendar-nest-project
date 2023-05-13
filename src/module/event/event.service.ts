import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateEventRequestDto, CreateEventResponseDto } from './dto';

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
}
