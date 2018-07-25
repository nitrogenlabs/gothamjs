import MaterialTextField, {TextFieldProps} from '@material-ui/core/TextField/TextField';
import * as React from 'react';
import {Field} from 'react-final-form';

export class SelectField extends React.PureComponent<TextFieldProps, {}> {
  constructor(props: TextFieldProps) {
    super(props);

    // Methods
    this.renderField = this.renderField.bind(this);
  }

  renderField({input}): JSX.Element {
    return <MaterialTextField {...this.props} {...input} />;
  }

  render(): JSX.Element {
    const {name} = this.props;
    return <Field name={name} render={this.renderField} />;
  }
}
