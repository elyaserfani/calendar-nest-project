import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventRepository } from 'src/modules/database/event.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    EventService,
    EventRepository,
    { provide: 'IEventRepository', useClass: EventRepository },
  ],
  exports: [EventService, EventRepository],
})
export class EventModule {}
