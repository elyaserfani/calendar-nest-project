export interface Notification {
  sendNotification(data: NotificationData): void;
}

export interface NotificationData {
  phoneNumber?: string;
  message?: string;
  email?: string;
  subject?: string;
}
