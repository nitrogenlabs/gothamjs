/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MaterialNativeSelect from '@material-ui/core/NativeSelect/NativeSelect';
import {makeStyles} from '@material-ui/styles';
import * as React from 'react';
import {Field} from 'react-final-form';

import {SelectFieldOption, SelectFieldProps} from './Form.types';
import {SelectOption} from './SelectOption';

const useStyles: any = makeStyles(() => ({
  field: {
    display: 'flex',
    flex: 1
  }
}));

export const renderOptions = (props, list: SelectFieldOption[] = []): JSX.Element[] =>
  list.map((optionProps: SelectFieldOption) => {
    const {name} = props;
    const {label, value} = optionProps;
    return <SelectOption key={`${name}${label}${value}`} {...optionProps} />;
  });

export const renderSelect = (props) => ({input}): JSX.Element => {
  const {label, list = [], ...restProps} = props;
  const classes = useStyles();
  let labelElement: JSX.Element;

  // If using a label, add a label component
  if(label) {
    labelElement = <InputLabel shrink>{label}</InputLabel>;
  }

  // If no value is added, set the first item as the initial value
  if(list.length && props.value === undefined) {
    props.value = list[0].value;
  }

  return (
    <FormControl className={classes.field}>
      {labelElement}
      <MaterialNativeSelect {...restProps} {...input}>{renderOptions(props, list)}</MaterialNativeSelect>
    </FormControl>
  );
};

export const SelectField = (props: SelectFieldProps) => {
  const {name} = props;
  return <Field name={name} render={renderSelect} />;
};
