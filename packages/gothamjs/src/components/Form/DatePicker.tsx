/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {DateFormatInput} from '@nlabs/material-ui-pickers';
import React from 'react';
import {Field} from 'react-final-form';
import {DatePickerProps, DatePickerState} from 'types/components/datePicker';

export class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
  constructor(props: DatePickerProps) {
    super(props);

    // Methods
    this.renderField = this.renderField.bind(this);
  }

  renderField({input}): JSX.Element {
    return <DateFormatInput fullWidth {...this.props} {...input} />;
  }

  render(): JSX.Element {
    const {name} = this.props;
    return <Field name={name} render={this.renderField} />;
  }
}
