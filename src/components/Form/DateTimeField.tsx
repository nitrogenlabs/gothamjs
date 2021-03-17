/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FormHelperTextProps} from '@material-ui/core/FormHelperText';
import {InputProps} from '@material-ui/core/Input';
import {InputLabelProps} from '@material-ui/core/InputLabel';
import React from 'react';

import {DatePicker} from './DatePicker/DatePicker';

export interface DateTimeFieldOrigin {
  readonly vertical: 'top' | 'center' | 'bottom';
  readonly horizontal: 'left' | 'center' | 'right';
}

export interface DateTimeFieldCalendarProps {
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

export interface DateTimeFieldProps {
  readonly anchorOrigin?: DateTimeFieldOrigin;
  readonly className?: string;
  readonly dateDisabled?: (date: Date) => boolean;
  readonly dateFormat?: string | ((date: Date) => string);
  readonly dialog?: boolean;
  readonly disabled?: boolean;
  readonly endIcon?: Node;
  readonly error?: string;
  readonly fullWidth?: boolean;
  readonly label?: string;
  readonly name: string;
  readonly max?: Date;
  readonly min?: Date;
  readonly onChange?: (value: Date, event?: React.MouseEvent<HTMLElement>) => any;
  readonly okToConfirm?: boolean;
  readonly transformOrigin?: DateTimeFieldOrigin;
  readonly validate?: (value: any) => object | Promise<object>;
  readonly value?: Date;
  readonly CalendarProps?: DateTimeFieldCalendarProps;
  readonly InputLabelProps?: InputLabelProps;
  readonly InputProps?: InputProps;
  readonly FormHelperTextProps?: FormHelperTextProps;
}

export const DateTimeField = (props: DateTimeFieldProps) => {
  console.log({props});
  // const {onChange: onChangeInput, validate, ...remainingProps} = props;
  // let updatedProps;

  // if(!active && !!error && (dirty || touched)) {
  //   updatedProps = {
  //     ...remainingProps,
  //     ...inputProps,
  //     error: true,
  //     helperText: <span>{error}</span>,
  //     onChangeInput
  //   };
  // } else {
  //   updatedProps = {...remainingProps, ...inputProps, onChangeInput};
  // }

  return <DatePicker name={props.name} autoFocus={false} timeInterval={1} />;
};
