export interface IScheduler {
  scheduleJob(cronExpression: string, callback: () => void): void;
  stopAllJobs(): void;
}
