/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import * as React from 'react';
import {Form as FinalForm} from 'react-final-form';

import {AutoSave} from './AutoSave';
import {FormProps} from './Form.types';

export const renderForm = (props) => ({handleSubmit}) => {
  const {children, onChange = () => {}} = props;

  return (
    <form onSubmit={handleSubmit}>
      <AutoSave onChange={onChange} />
      {children}
    </form>
  );
};

export const Form = (props: FormProps) => {
  const {
    debug,
    destroyOnUnregister,
    initialValues,
    keepDirtyOnReinitialize,
    mutators,
    onSubmit,
    validate,
    validateOnBlur
  } = props;

  return (
    <FinalForm
      debug={debug}
      destroyOnUnregister={destroyOnUnregister}
      initialValues={initialValues}
      keepDirtyOnReinitialize={keepDirtyOnReinitialize}
      mutators={mutators}
      onSubmit={onSubmit}
      render={renderForm(props)}
      validate={validate}
      validateOnBlur={validateOnBlur} />
  );
};
