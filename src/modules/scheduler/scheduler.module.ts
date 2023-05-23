import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerAbstraction } from './scheduler.abstraction';
import { SchedulerService } from './scheduler.service';
import { EventModule } from '../event';

@Module({
  imports: [ScheduleModule.forRoot(), EventModule],
  providers: [
    SchedulerAbstraction,
    SchedulerService,
    { provide: 'IScheduler', useClass: SchedulerAbstraction },
  ],
  exports: [SchedulerAbstraction, SchedulerService, 'IScheduler'],
})
export class SchedulerModule {}
