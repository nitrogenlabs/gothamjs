/**
 * Copyright (c) 2019-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export type NotificationType = 'default' | 'error' | 'info' | 'success' | 'warning';

export interface NotificationProps {
  readonly classes: any;
  readonly className?: string;
  readonly message: string;
  readonly onClose: (event: any, reason?: string) => any;
  readonly variant?: NotificationType;
}
