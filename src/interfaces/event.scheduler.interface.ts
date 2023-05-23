export interface IEventScheduler {
  sendEventReminders(): Promise<void>;
}
