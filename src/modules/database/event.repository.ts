import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  LessThanOrEqual,
  Repository,
  UpdateResult,
} from 'typeorm';
import { IEventRepository } from '../../interfaces';
import { Event } from 'src/entities';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class EventRepository implements IEventRepository {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}
  createEvent(eventData: Partial<Event>, userId: number): Promise<Event> {
    const event = this.eventRepository.create({
      title: eventData.title,
      description: eventData.description,
      due_date: eventData.due_date,
      user: { id: userId },
    });
    return this.eventRepository.save(event);
  }
  findById(id: number): Promise<Event> {
    return this.eventRepository.findOneBy({ id });
  }
  checkEventOwnership(eventId: number, userId: number): Promise<Event> {
    return this.eventRepository.findOneBy({
      id: eventId,
      user: { id: userId },
    });
  }
  deleteEvent(id: number): Promise<DeleteResult> {
    return this.eventRepository.delete(id);
  }
  pagination(
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<[Event[], number]> {
    return this.eventRepository.findAndCount({
      where: { user: { id: userId } },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }
  updateEvent(
    eventId: number,
    entity: QueryDeepPartialEntity<Event>,
  ): Promise<UpdateResult> {
    return this.eventRepository.update(eventId, entity);
  }

  findNotNotifiedEvents(due_date: Date, notified: boolean): Promise<Event[]> {
    return this.eventRepository.find({
      where: { due_date: LessThanOrEqual(due_date), notified },
      relations: ['user'],
    });
  }
}
