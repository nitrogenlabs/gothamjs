import './form.css';

import * as React from 'react';
import {Form as FinalForm} from 'react-final-form';

export interface FormProps {
  readonly children?: any;
  readonly onSubmit?: any;
  readonly validate?: any;
}

export class Form extends React.Component<FormProps, {}> {
  constructor(props: FormProps) {
    super(props);

    // Methods
    this.renderForm = this.renderForm.bind(this);
  }

  renderForm({handleSubmit}) {
    const {children} = this.props;

    return (
      <form className="form" onSubmit={handleSubmit}>{children}</form>
    );
  }

  render(): JSX.Element {
    const {onSubmit, validate} = this.props;

    return (
      <React.Fragment>
        <FinalForm
          onSubmit={onSubmit}
          validate={validate}
          render={this.renderForm} />
      </React.Fragment>
    );
  }
}
