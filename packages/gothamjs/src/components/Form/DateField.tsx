/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {DateFormatInput} from '@nlabs/material-ui-pickers';
import React from 'react';
import {Field} from 'react-final-form';

import {DateFieldProps, DateFieldState} from '../../types/components/dateField';

export class DateField extends React.Component<DateFieldProps, DateFieldState> {
  constructor(props: DateFieldProps) {
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
