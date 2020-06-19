/**
 * Copyright (c) 2020-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {DateTime} from 'luxon';

export interface WeekProps {
  readonly date: DateTime;
  readonly dateDisabled: (date: DateTime) => any;
  readonly maxDate: DateTime;
  readonly minDate: DateTime;
  readonly onSelectDate: (event: React.MouseEvent<HTMLElement>, date: DateTime) => any;
  readonly selectedDate: DateTime;
}
