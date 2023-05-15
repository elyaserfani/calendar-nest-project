import { Module } from '@nestjs/common';
import { EventController } from '../../controllers/event.controller';
import { EventService } from '../../services/event.service';
import { EventRepository } from 'src/modules/event/event.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [EventService, EventRepository],
})
export class EventModule {}
