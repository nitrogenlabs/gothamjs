/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {TimeFormatInput} from '@nlabs/material-ui-pickers';
import React from 'react';
import {Field} from 'react-final-form';

import {TimeFieldProps, TimeFieldState} from '../../types/components/timeField';

export class TimeField extends React.Component<TimeFieldProps, TimeFieldState> {
  constructor(props: TimeFieldProps) {
    super(props);

    // Methods
    this.renderField = this.renderField.bind(this);
  }

  renderField({input}): JSX.Element {
    return <TimeFormatInput fullWidth {...this.props} {...input} />;
  }

  render(): JSX.Element {
    const {name} = this.props;
    return <Field name={name} render={this.renderField} />;
  }
}
