export type NotificationType = 'default' | 'error' | 'info' | 'success' | 'warning';

export interface NotificationProps {
  readonly classes: any;
  readonly className?: string;
  readonly message: string;
  readonly onClose: (event: any, reason?: string) => any;
  readonly variant?: NotificationType;
}
