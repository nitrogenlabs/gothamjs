/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FormHelperTextProps} from '@material-ui/core/FormHelperText';
import {InputProps} from '@material-ui/core/Input';
import {InputLabelProps} from '@material-ui/core/InputLabel';

export interface DatePickerOrigin {
  readonly vertical: 'top' | 'center' | 'bottom';
  readonly horizontal: 'left' | 'center' | 'right';
}

export interface DatePickerCalendarProps {
  readonly action: (actions: any) => void;
  readonly value: Date;
  readonly onChange: (value: Date, event?: React.MouseEvent<HTMLElement>) => void;
  readonly closeCalendar: () => void;
  readonly dateDisabled?: (date: Date) => boolean;
  readonly min?: Date;
  readonly max?: Date;
  readonly okToConfirm?: boolean;
  readonly classes?: {
    root?: string
    selectedDay?: string
    selectedDayText?: string
    selectedYear?: string
    selectedYearText?: string
  };
}

export interface DatePickerProps {
  readonly name: string;
  readonly label?: string;
  readonly value: Date;
  readonly onChange: (value: Date, event?: React.MouseEvent<HTMLElement>) => void;
  readonly anchorOrigin?: DatePickerOrigin;
  readonly transformOrigin?: DatePickerOrigin;
  readonly disabled?: boolean;
  readonly error?: string;
  readonly dateDisabled?: (date: Date) => boolean;
  readonly min?: Date;
  readonly max?: Date;
  readonly dateFormat?: string | ((date: Date) => string);
  readonly fullWidth?: boolean;
  readonly dialog?: boolean;
  readonly okToConfirm?: boolean;
  readonly endIcon?: Node;
  readonly className?: string;
  readonly InputLabelProps?: InputLabelProps;
  readonly InputProps?: InputProps;
  readonly FormHelperTextProps?: FormHelperTextProps;
  readonly CalendarProps?: DatePickerCalendarProps;
}

export interface DatePickerState {
  readonly date: Date;
}
