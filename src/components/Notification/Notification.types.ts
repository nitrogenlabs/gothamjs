/**
 * Copyright (c) 2019-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export type NotificationType = 'default' | 'error' | 'info' | 'success' | 'warning';

export interface NotificationProps {
  readonly className?: string;
  readonly setState?: any;
  readonly state?: any;
  readonly variant?: NotificationType;
}
