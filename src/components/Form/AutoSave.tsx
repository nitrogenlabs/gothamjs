/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {useState} from '@nlabs/arkhamjs-utils-react';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import transform from 'lodash/transform';
import React, {useEffect} from 'react';
import {FormSpy} from 'react-final-form';

export const difference = (origObj, newObj) => {
  const changes = (newObj, origObj) => {
    let arrayIndexCounter: number = 0;

    return transform(newObj, (result, value, key) => {
      if(!isEqual(value, origObj[key])) {
        const resultKey = isArray(origObj) ? arrayIndexCounter++ : key;
        result[resultKey] = (isObject(value) && isObject(origObj[key])) ? changes(value, origObj[key]) : value;
      }
    });
  };

  return changes(newObj, origObj);
};

const update = async (props, state, setState, blurredField) => {
  const {values: newValues, setFieldData = () => {}, onChange} = props;
  const {values: existingValues} = state;
  const updatedValues = difference(existingValues, newValues);

  if(Object.keys(updatedValues).length) {
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
  const [currentActive, setActive] = useState(active);

  useEffect(() => {
    // Blur occurred
    if(active && active !== currentActive) {
      setActive(active);
      update(props, state, setState, active);
    }
  }, [currentActive]);

  return null;
};

export const AutoSave = (props) => (
  <FormSpy
    {...props}
    component={AutoSaveBase}
    formatOnBlur
    subscription={{active: true, values: true}} />
);
