/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import MaterialTextField from '@material-ui/core/TextField/TextField';
import React, {SyntheticEvent, useState} from 'react';
import {Field} from 'react-final-form';

import {TextFieldProps} from './Form.types';

export const onChange = (onChangeFn, setValue) => (event: SyntheticEvent) => {
  const {target: {value = ''}}: any = event;
  setValue(value);

  console.log('TextField::value', value);
  if(onChangeFn) {
    onChangeFn(event, value);
  }
};

export const renderField = (props) => ({input = {}, meta}: any): JSX.Element => {
  const {setValue, validate, ...remainingProps} = props;
  const {active, dirty, error, touched} = meta;
  let updatedProps;

  if(!active && !!error && (dirty || touched)) {
    updatedProps = {
      ...remainingProps,
      ...input,
      error: true,
      helperText: <span>{error}</span>
    };
  } else {
    updatedProps = {...remainingProps, ...input};
  }

  return <MaterialTextField {...input} {...updatedProps} />;
};

export const TextField = (props: TextFieldProps) => {
  const {name, onChange: customOnChange, validate, value = ''} = props;
  const [updatedValue, setValue] = useState(value);
  const updatedProps = {...props, onChange: onChange(customOnChange, setValue), setValue, value: updatedValue};
  return <Field name={name} render={renderField(updatedProps)} validate={validate} />;
};
