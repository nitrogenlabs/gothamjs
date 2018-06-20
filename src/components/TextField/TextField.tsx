import MaterialTextField, {TextFieldProps} from '@material-ui/core/TextField/TextField';
import * as React from 'react';
import {Field} from 'react-final-form';

export class TextField extends React.Component<TextFieldProps, {}> {
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

    return (
      <React.Fragment>
        <Field name={name} render={this.renderField} />
      </React.Fragment>
    );
  }
}
