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
    { provide: 'IEventRepository', useClass: EventRepository },
  ],
  exports: [EventService, EventRepository, 'IEventRepository'],
})
export class EventModule {}
