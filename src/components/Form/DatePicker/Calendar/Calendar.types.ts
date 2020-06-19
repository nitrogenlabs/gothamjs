/**
 * Copyright (c) 2020-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {DateTime} from 'luxon';

export interface CalendarProps {
  readonly dateDisabled: (date: any) => boolean;
  readonly maxDate: DateTime;
  readonly minDate: DateTime;
  readonly onChange: (event: React.MouseEvent<HTMLElement>, date: DateTime) => any;
  readonly onClose: () => any;
  readonly selectedDate: DateTime;
  readonly setSelected: (date: DateTime) => any;
}
