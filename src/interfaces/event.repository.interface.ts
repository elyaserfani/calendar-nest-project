import { Event } from 'src/entities';
import { DeleteResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IEventRepository {
  createEvent(eventData: Partial<Event>, userId: number): Promise<Event>;
  findById(id: number): Promise<Event | undefined>;
  checkEventOwnership(
    eventId: number,
    userId: number,
  ): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<DeleteResult>;
  pagination(
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<[Event[], number]>;
  updateEvent(
    eventId: number,
    entity: QueryDeepPartialEntity<Event>,
  ): Promise<UpdateResult>;
}
