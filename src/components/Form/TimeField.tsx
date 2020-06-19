/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import React from 'react';
import {Field} from 'react-final-form';

import {TimeFieldProps} from './TimeField.types';
import {TimePicker} from './TimePicker/TimePicker';


export const renderField = (props) => ({input}): JSX.Element => <TimePicker fullWidth {...props} {...input} />;

export const TimeField = (props: TimeFieldProps) => {
  const {name} = props;
  return <Field name={name} render={renderField(props)} />;
};
