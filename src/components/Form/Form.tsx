/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import setFieldData from 'final-form-set-field-data';
import * as React from 'react';
import {Form as FinalForm} from 'react-final-form';

import {AutoSave} from './AutoSave';
import {FormProps} from './Form.types';

export const renderForm = (props) => ({form: finalForm, handleSubmit}) => {
  const {children, onChange = () => {}} = props;

  return (
    <form onSubmit={handleSubmit}>
      <AutoSave onChange={onChange} setFieldData={finalForm.mutators.setFieldData} />
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
      mutators={setFieldData}
      onSubmit={onSubmit}
      render={renderForm(props)}
      subscription={{}}
      validate={validate}
      validateOnBlur={validateOnBlur} />
  );
};
