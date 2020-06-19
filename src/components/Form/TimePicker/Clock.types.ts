/**
 * Copyright (c) 2020-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {DateTime} from 'luxon';

export interface ClockProps {
  readonly onSelect: (
    selectedTime: DateTime,
    event?: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  ) => void;
  readonly onClose: () => any;
  readonly selectableMinutesInterval?: number;
  readonly setClockResize?: (action: any) => any;
  readonly value: string;
}
