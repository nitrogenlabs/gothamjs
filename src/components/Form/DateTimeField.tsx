/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import MaterialTextField from '@material-ui/core/TextField';
import {DateTimePicker} from '@material-ui/pickers';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

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
  readonly allowKeyboardControl?: boolean;
  readonly allowSameDateSelection?: boolean;
  readonly ampmInClock?: boolean;
  readonly className?: string;
  readonly label?: string;
  readonly minutesStep?: number;
  readonly name: string;
  readonly onChange?: any;
  readonly placeholder?: string;
  readonly toolbarTitle?: string;
  readonly value?: any;
}

export const DateTimeField = (props: DateTimeFieldProps) => {
  const {
    allowKeyboardControl = true,
    allowSameDateSelection = true,
    ampmInClock = true,
    minutesStep = 30,
    toolbarTitle = 'Select Date',
    name,
    value
  } = props;
  const {t} = useTranslation();
  const {control, formState: {errors}} = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={value}
      name={name}
      render={({field: {name, onChange, ref, value}}) => (
        <DateTimePicker
          allowKeyboardControl={allowKeyboardControl}
          allowSameDateSelection={allowSameDateSelection}
          ampmInClock={ampmInClock}
          data-testid={`dateTimeField-${name}`}
          minutesStep={minutesStep}
          onChange={onChange}
          ref={ref}
          renderInput={(props) => <MaterialTextField {...props} error={!!errors[name]} helperText={errors[name]} />}
          toolbarTitle={t(toolbarTitle)}
          value={value}
        />
      )} />
  );
};
