/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {DateOrTimeView} from '@mui/x-date-pickers';
import {MobileDateTimePicker, MobileDateTimePickerProps} from '@mui/x-date-pickers/MobileDateTimePicker';
import {DateTime} from 'luxon';
import {FC} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

export interface DateTimeFieldProps extends Partial<MobileDateTimePickerProps<DateTime, DateOrTimeView>> {
  readonly label: string;
  readonly name: string;
}

export const DateTimeField: FC<DateTimeFieldProps> = ({
  minutesStep = 30,
  label,
  name,
  value: defaultValue
}) => {
  const {t} = useTranslation();
  const {control, formState: {errors}} = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({field: {name, onBlur, onChange, ref, value}}) => (
        <MobileDateTimePicker
          ampm
          ampmInClock
          data-testid={`dateTimeField-${name}`}
          label={t(label)}
          minutesStep={minutesStep}
          onChange={(date) => onChange(date)}
          onClose={onBlur}
          reduceAnimations
          ref={ref}
          value={value}
        />)
      }/>
  );
};
