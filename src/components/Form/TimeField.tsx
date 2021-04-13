/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import MaterialTextField from '@material-ui/core/TextField';
import {DateTimePicker, TimePickerProps} from '@material-ui/pickers';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';

export interface TimeFieldProps extends TimePickerProps {
  readonly name: string;
}

export const TimeField = (props: TimeFieldProps) => {
  const {
    allowKeyboardControl = true,
    ampmInClock = true,
    minutesStep = 30,
    name,
    value
  } = props;
  const {control, formState: {errors}} = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={value}
      name={name}
      render={({field: {name, onChange, ref, value}}) => (
        <DateTimePicker
          allowKeyboardControl={allowKeyboardControl}
          ampmInClock={ampmInClock}
          data-testid={`dateTimeField-${name}`}
          ref={ref}
          minutesStep={minutesStep}
          onChange={onChange}
          renderInput={(props) => <MaterialTextField {...props} error={!!errors[name]} helperText={errors[name]} />}
          value={value}
        />
      )} />
  );
};
