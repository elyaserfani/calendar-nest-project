import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventRepository } from 'src/modules/database/event.repository';
import { DatabaseModule } from '../database/database.module';
import { NotificationModule } from '../notification';
import { NotificationType } from 'src/commons';

@Module({
  imports: [
    DatabaseModule,
    NotificationModule.forFeature(NotificationType.CONSOLE),
  ],
  providers: [
    EventService,
    EventRepository,
    { provide: 'EVENT_REPOSITORY', useClass: EventRepository },
  ],
  exports: [EventService, EventRepository, 'EVENT_REPOSITORY'],
})
export class EventModule {}
