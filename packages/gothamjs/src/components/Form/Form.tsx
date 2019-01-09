import {StyleRulesCallback} from '@material-ui/core/styles';
import * as React from 'react';
import {Form as FinalForm} from 'react-final-form';

import {FormProps} from '../../types/components/form';
import {initStyle} from '../../utils/components';
import {AutoSave} from './AutoSave';

/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
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
    const {children, onChange = () => {}} = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <AutoSave onChange={onChange} />
        {children}
      </form>
    );
  }

  render(): JSX.Element {
    const {
      debug,
      destroyOnUnregister,
      initialValues,
      keepDirtyOnReinitialize,
      mutators,
      onSubmit,
      validate,
      validateOnBlur
    } = this.props;

    return (
      <FinalForm
        debug={debug}
        destroyOnUnregister={destroyOnUnregister}
        initialValues={initialValues}
        keepDirtyOnReinitialize={keepDirtyOnReinitialize}
        mutators={mutators}
        onSubmit={onSubmit}
        render={this.renderForm}
        validate={validate}
        validateOnBlur={validateOnBlur} />
    );
  }
}

export const Form = initStyle(FormBase, styles);
