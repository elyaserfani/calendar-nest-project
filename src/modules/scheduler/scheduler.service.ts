import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { EventService } from '../event';
import { IJobScheduler, IScheduler } from 'src/interfaces/scheduler';

@Injectable()
export class SchedulerService implements IJobScheduler, OnModuleInit {
  constructor(
    private readonly eventService: EventService,
    @Inject('IScheduler')
    private readonly iScheduler: IScheduler,
  ) {}
  cronExpression = '*/5 * * * * *'; //Run every 5 second

  async functionToExecute(): Promise<void> {
    await this.eventService.checkEventsDueDates();
  }
  scheduleCronJob(): void {
    this.iScheduler.scheduleJob(
      this.cronExpression,
      this.functionToExecute.bind(this),
    );
  }
  onModuleInit() {
    this.scheduleCronJob();
  }
}
