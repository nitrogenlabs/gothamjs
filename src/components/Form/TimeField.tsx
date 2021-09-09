/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import MaterialTextField from '@material-ui/core/TextField';
import {TimePicker, TimePickerProps} from '@material-ui/lab';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

export interface TimeFieldProps extends TimePickerProps {
  readonly format: string;
  readonly label: string;
  readonly name: string;
}

export const TimeField = ({
  ampm = true,
  format,
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
          inputFormat={format}
          label={t(label)}
          minutesStep={minutesStep}
          onChange={(date) => onChange(date)}
          onClose={onBlur}
          renderInput={(props) => (
            <MaterialTextField {...props} error={!!errors[name]} helperText={errors[name]} inputRef={ref} />
          )}
          value={value}
        />
      )} />
  );
};
