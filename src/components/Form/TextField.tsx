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
  onChange: onChangeFn,
  onBlur: onBlurFn,
  placeholder = '',
  type = 'text',
  variant = 'standard',
  ...restProps
}: TextFieldProps) => {
  const {t} = useTranslation();
  const {control, formState: {errors}} = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({field: {name, onBlur, onChange, ref, value}}) => (
        <MaterialTextField
          {...restProps}
          data-testid={`textField-${name}`}
          error={!!errors[name]}
          helperText={errors[name] && t(errors[name].message)}
          inputRef={ref}
          name={name}
          onChange={(event) => {
            onChange(event);

            if(onChangeFn) {
              onChangeFn(event);
            }
          }}
          onBlur={(event) => {
            onBlur();

            if(onBlurFn) {
              onBlurFn(event);
            }
          }}
          placeholder={t(placeholder)}
          type={type}
          value={value}
          variant={variant}
        />
      )}
    />
  );
};

