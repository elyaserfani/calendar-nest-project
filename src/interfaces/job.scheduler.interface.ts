export interface IJobScheduler {
  cronExpression: string;
  functionToExecute: () => Promise<void>;
}
