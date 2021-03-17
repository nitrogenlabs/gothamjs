/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import MaterialTextField, {StandardTextFieldProps} from '@material-ui/core/TextField';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';


export interface TextFieldProps extends StandardTextFieldProps {
  readonly autoFocus?: boolean;
  readonly defaultValue?: string;
  readonly fullWidth?: boolean;
  readonly name: string;
  readonly placeholder?: string;
  readonly rules?: any;
  readonly type?: string;
}

export const TextField = ({
  defaultValue = '',
  name,
  placeholder = '',
  type = 'text',
  ...restProps
}: TextFieldProps) => {
  const {t} = useTranslation();
  const {control, errors} = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({onBlur, onChange, ref, value}) => (
        <MaterialTextField
          {...restProps}
          data-testid={`textField-${name}`}
          error={!!errors[name]}
          helperText={errors[name] && t(errors[name].message)}
          inputRef={ref}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={t(placeholder)}
          type={type}
          value={value}
        />
      )}
    />
  );
};

