/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import MaterialTextField from '@material-ui/core/TextField/TextField';
import React from 'react';
import {Field} from 'react-final-form';

import {TextFieldProps} from './Form.types';

export const renderField = (props) => ({input = {}, meta}): JSX.Element => {
  const {validate, ...remainingProps} = props;
  const {active, dirty, error, touched} = meta;
  let updatedProps;

  if(!active && !!error && (dirty || touched)) {
    updatedProps = {
      ...remainingProps,
      error: true,
      helperText: <span>{error}</span>
    };
  } else {
    updatedProps = {...remainingProps};
  }

  return <MaterialTextField {...input} {...updatedProps} />;
};

export const TextField = (props: TextFieldProps) => {
  const {name, validate} = props;
  return <Field name={name} render={renderField(props)} validate={validate} />;
};
