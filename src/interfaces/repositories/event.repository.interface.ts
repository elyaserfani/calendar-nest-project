import { IEvent } from 'src/modules/event';
import {
  IDeleteResult,
  QueryDeepPartialEntity,
  IUpdateResult,
} from '../common';

export interface IEventRepository {
  createEvent(eventData: Partial<IEvent>, userId: number): Promise<IEvent>;
  findById(id: number): Promise<IEvent | undefined>;
  checkEventOwnership(
    eventId: number,
    userId: number,
  ): Promise<IEvent | undefined>;
  deleteEvent(id: number): Promise<IDeleteResult>;
  pagination(
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<[IEvent[], number]>;
  updateEvent(
    eventId: number,
    entity: QueryDeepPartialEntity<IEvent>,
  ): Promise<IUpdateResult>;
  findNotNotifiedEvents(due_date: Date, notified: boolean): Promise<IEvent[]>;
}
