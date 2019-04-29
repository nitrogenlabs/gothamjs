/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {DateFormatInput} from '@nlabs/material-ui-pickers';
import React from 'react';
import {Field} from 'react-final-form';

import {DateFieldProps} from './DateField.types';

export const renderField = (props) => ({input}): JSX.Element => <DateFormatInput fullWidth {...props} {...input} />;

export const DateField = (props: DateFieldProps) => {
  const {name} = props;
  return <Field name={name} render={renderField(props)} />;
};
