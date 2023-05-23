import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';
import { IScheduler } from 'src/interfaces';

@Injectable()
export class SchedulerAbstraction implements IScheduler {
  private cronJobs: CronJob[] = [];
  scheduleJob(cronExpression: string, callback: () => void): void {
    const cronJob = new CronJob(cronExpression, callback);
    cronJob.start();
    this.cronJobs.push(cronJob);
  }

  stopAllJobs(): void {
    for (const cronJob of this.cronJobs) {
      cronJob.stop();
    }
    this.cronJobs = [];
  }
}
