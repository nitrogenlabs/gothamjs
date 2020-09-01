/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import React from 'react';
import {Field} from 'react-final-form';

import {DatePicker} from './DatePicker/DatePicker';
import {DateTimeFieldProps} from './DateTimeField.types';

export const renderField = (props) => (fieldProps): JSX.Element => {
  const {input = {}, meta}: any = fieldProps;
  const {onChange: onChangeInput, ...inputProps} = input;
  const {validate, ...remainingProps} = props;
  const {active, dirty, error, touched} = meta;
  let updatedProps;

  if(!active && !!error && (dirty || touched)) {
    updatedProps = {
      ...remainingProps,
      ...inputProps,
      error: true,
      helperText: <span>{error}</span>,
      onChangeInput
    };
  } else {
    updatedProps = {...remainingProps, ...inputProps, onChangeInput};
  }

  return <DatePicker fullWidth {...updatedProps} />;
};

export const DateTimeField = (props: DateTimeFieldProps) => {
  const {name, validate} = props;
  return <Field name={name} validate={validate}>{renderField(props)}</Field>;
};
