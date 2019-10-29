/**
 * Copyright (c) 2019-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {GothamStatus} from '../../views';

export type NotificationType = 'default' | 'error' | 'info' | 'success' | 'warning';

export interface NotificationProps {
  readonly className?: string;
  readonly currentNotification?: any;
  readonly hasNotification?: boolean;
  readonly notifications?: any;
  readonly setCurrent?: any;
  readonly setHasNotification?: any;
  readonly setNotifications?: any;
  readonly variant?: NotificationType;
}

export interface NotificationParams {
  readonly hideDuration?: number;
  readonly id: string;
  readonly message: string;
  readonly status?: GothamStatus;
}
