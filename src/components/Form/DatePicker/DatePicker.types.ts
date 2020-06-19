/**
 * Copyright (c) 2020-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FormHelperTextProps} from '@material-ui/core/FormHelperText';
import {InputProps} from '@material-ui/core/Input';
import {InputLabelProps} from '@material-ui/core/InputLabel';
import {DateTime} from 'luxon';

import {CalendarProps} from './Calendar/Calendar.types';

export type DatePickerTypes = 'date' | 'time' | 'datetime';

export interface DatePickerOrigin {
  readonly vertical: 'top' | 'center' | 'bottom';
  readonly horizontal: 'left' | 'center' | 'right';
}

export interface DatePickerProps {
  readonly autoFocus: boolean;
  readonly anchorOrigin?: DatePickerOrigin;
  readonly calendarProps?: CalendarProps;
  readonly className?: string;
  readonly dateDisabled?: (date: Date) => boolean;
  readonly dateFormat?: string | ((date: Date) => string);
  readonly defaultValue?: string;
  readonly dialog?: boolean;
  readonly disabled?: boolean;
  readonly endIcon?: Node;
  readonly error?: boolean;
  readonly format?: string;
  readonly formHelperTextProps?: FormHelperTextProps;
  readonly fullWidth?: boolean;
  readonly inputLabelProps?: InputLabelProps;
  readonly inputProps?: InputProps;
  readonly label?: string;
  readonly min?: string;
  readonly max?: string;
  readonly name: string;
  readonly onChange?: (event: React.MouseEvent<HTMLElement>, selectedDate: DateTime) => void;
  readonly onChangeInput?: (event: any) => void;
  readonly placeholder?: string;
  readonly timeInterval: number;
  readonly transformOrigin?: DatePickerOrigin;
  readonly type?: DatePickerTypes;
  readonly use24Hour?: boolean;
  readonly value?: string;
}
