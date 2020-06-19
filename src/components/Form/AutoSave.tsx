/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {useState} from '@nlabs/arkhamjs-utils-react';
import isEqual from 'lodash/isEqual';
import reduce from 'lodash/reduce';
import React, {useEffect} from 'react';
import {FormSpy} from 'react-final-form';

const update = async (props, state, setState, blurredField) => {
  const {values: newValues, setFieldData = () => {}, onChange} = props;
  const {values: existingValues} = state;

  if(!isEqual(existingValues, newValues)) {
    const updatedValues = reduce(existingValues, (result, value, key) =>
      (isEqual(value, newValues[key]) ? result : result.concat({[key]: value})), []);

    // values have changed
    setState({submitting: true, values: updatedValues});
    setFieldData(blurredField, {saving: true});
    await onChange(updatedValues);
    setState({submitting: false});
    setFieldData(blurredField, {saving: false});
  }
};

export const AutoSaveBase = (props) => {
  const {active, values} = props;

  // Initial state
  const [state, setState] = useState({submitting: false, values});

  console.log('AutoSaveBase::values', values);
  useEffect(() => {
    // Blur occurred
    update(props, state, setState, active);
  }, [active]);

  return null;
};

export const AutoSave = (props) => (
  <FormSpy
    {...props}
    component={AutoSaveBase}
    formatOnBlur
    subscription={{active: true, values: true}} />
);
