/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import MaterialTextField from '@material-ui/core/TextField/TextField';
import * as React from 'react';
import {Field} from 'react-final-form';

import {TextFieldProps} from '../../types/components/form';

export class TextField extends React.PureComponent<TextFieldProps, {}> {
  constructor(props: TextFieldProps) {
    super(props);

    // Methods
    this.renderField = this.renderField.bind(this);
  }

  renderField({input = {}, meta}): JSX.Element {
    const {validate, ...remainingProps} = this.props;
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

    return <MaterialTextField {...updatedProps} {...input} />;
  }

  render(): JSX.Element {
    const {name, validate} = this.props;
    return <Field name={name} render={this.renderField} validate={validate} />;
  }
}
