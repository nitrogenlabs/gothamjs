/**
 * Copyright (c) 2020-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {DateTime} from 'luxon';

export interface TimeSelectProps {
  readonly interval: number;
  readonly maxDate: DateTime;
  readonly minDate: DateTime;
  readonly onChange: (event: React.MouseEvent<HTMLElement>, date: DateTime) => any;
  readonly selectedDate: DateTime;
  readonly setSelected: (date: DateTime) => any;
  readonly use24Hour: boolean;
}
