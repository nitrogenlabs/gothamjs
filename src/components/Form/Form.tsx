import {StyleRulesCallback} from '@material-ui/core/styles';
import * as React from 'react';
import {Form as FinalForm} from 'react-final-form';

import {FormProps} from '../../types/components/form';
import {initStyle} from '../../utils/components';

const styles: StyleRulesCallback = () => ({
  form: {
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  }
});

export class FormBase extends React.Component<FormProps, {}> {
  constructor(props: FormProps) {
    super(props);

    // Methods
    this.renderForm = this.renderForm.bind(this);
  }

  renderForm({handleSubmit}) {
    const {children, classes} = this.props;

    return (
      <form className={classes.form} onSubmit={handleSubmit}>{children}</form>
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

export const Form = initStyle(FormBase, styles);
