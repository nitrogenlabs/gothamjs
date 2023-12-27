/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {TimePicker, TimePickerProps} from '@mui/x-date-pickers/TimePicker';
import {DateTime} from 'luxon';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

export interface TimeFieldProps extends TimePickerProps<DateTime> {
  readonly format: string;
  readonly label: string;
  readonly name: string;
}

export const TimeField = ({
  ampm = true,
  label,
  minutesStep = 30,
  name,
  value,
  ...props
}: TimeFieldProps) => {
  const {t} = useTranslation();
  const {control, formState: {errors}} = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={value}
      name={name}
      render={({field: {name, onBlur, onChange, ref, value}}) => (
        <TimePicker
          {...props}
          ampm={ampm}
          data-testid={`dateTimeField-${name}`}
          label={t(label)}
          minutesStep={minutesStep}
          onChange={(date) => onChange(date)}
          onClose={onBlur}
          ref={ref}
          value={value}
        />
      )} />
  );
};
