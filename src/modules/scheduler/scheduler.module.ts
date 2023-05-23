import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.service';
import { EventModule } from '../event';
import { Scheduler } from './scheduler';

@Module({
  imports: [ScheduleModule.forRoot(), EventModule],
  providers: [
    Scheduler,
    SchedulerService,
    { provide: 'IScheduler', useClass: Scheduler },
  ],
  exports: [Scheduler, SchedulerService, 'IScheduler'],
})
export class SchedulerModule {}
