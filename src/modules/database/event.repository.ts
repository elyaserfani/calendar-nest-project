import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IEventRepository } from '../../interfaces';
import { Event } from 'src/entities';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class EventRepository
  extends Repository<Event>
  implements IEventRepository
{
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {
    super(
      eventRepository.target,
      eventRepository.manager,
      eventRepository.queryRunner,
    );
  }
  createEvent(eventData: Partial<Event>, userId: number): Promise<Event> {
    const event = this.create({
      title: eventData.title,
      description: eventData.description,
      due_date: eventData.due_date,
      user: { id: userId },
    });
    return this.save(event);
  }
  findById(id: number): Promise<Event> {
    return this.findOneBy({ id });
  }
  checkEventOwnership(eventId: number, userId: number): Promise<Event> {
    return this.findOneBy({
      id: eventId,
      user: { id: userId },
    });
  }
  deleteEvent(id: number): Promise<DeleteResult> {
    return this.delete(id);
  }
  pagination(
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<[Event[], number]> {
    return this.findAndCount({
      where: { user: { id: userId } },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }
  updateEvent(
    eventId: number,
    entity: QueryDeepPartialEntity<Event>,
  ): Promise<UpdateResult> {
    return this.update(eventId, entity);
  }
}
