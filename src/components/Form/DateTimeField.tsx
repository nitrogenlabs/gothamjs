/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import MaterialTextField from '@material-ui/core/TextField';
import {DateTimePickerProps} from '@material-ui/lab/DateTimePicker';
import MobileDateTimePicker from '@material-ui/lab/MobileDateTimePicker';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

export interface DateTimeFieldProps extends Partial<DateTimePickerProps> {
  readonly cancelText?: string;
  readonly clearText?: string;
  readonly format?: string;
  readonly okText?: string;
  readonly label: string;
  readonly name: string;
  readonly todayText?: string;
  readonly toolbarTitle?: string;
  readonly variant?: 'filled' | 'outlined' | 'standard';
}

export const DateTimeField = ({
  allowSameDateSelection = true,
  cancelText = 'Cancel',
  clearText = 'Clear',
  format = 'ccc, DD @ ttt',
  minutesStep = 30,
  okText = 'Ok',
  label,
  name,
  todayText = 'Today',
  toolbarTitle = 'Select Date',
  value: defaultValue,
  variant = 'standard',
  ...props
}: DateTimeFieldProps) => {
  const {t} = useTranslation();
  const {control, formState: {errors}} = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({field: {name, onBlur, onChange, ref, value}}) => (
        <MobileDateTimePicker
          {...props}
          allowSameDateSelection={allowSameDateSelection}
          ampm
          ampmInClock
          cancelText={t(cancelText)}
          clearText={t(clearText)}
          data-testid={`dateTimeField-${name}`}
          inputFormat={format}
          label={t(label)}
          minutesStep={minutesStep}
          onChange={(date) => onChange(date)}
          onClose={onBlur}
          okText={t(okText)}
          reduceAnimations
          renderInput={(fieldProps) => (
            <MaterialTextField
              {...fieldProps}
              error={!!errors[name]}
              helperText={errors[name]}
              inputRef={ref}
              variant={variant} />
          )}
          showToolbar={false}
          todayText={t(todayText)}
          toolbarTitle={t(toolbarTitle)}
          value={value}
        />)
      }/>
  );
};
