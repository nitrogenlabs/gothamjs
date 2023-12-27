/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import FormControl from '@mui/material/FormControl/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import MaterialNativeSelect, {NativeSelectProps} from '@mui/material/NativeSelect/NativeSelect';
import {makeStyles} from '@mui/styles';
import * as React from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import {SelectFieldOption, SelectFieldValue, SelectOption} from './SelectOption';

const useStyles: any = makeStyles(() => ({
  field: {
    display: 'flex',
    flex: 1
  }
}));

export interface SelectFieldProps extends NativeSelectProps {
  readonly classes?: any;
  readonly label: string;
  readonly name: string;
  readonly list: SelectFieldOption[];
  readonly value?: SelectFieldValue;
}

export const renderOptions = (props, list: SelectFieldOption[] = []): JSX.Element[] =>
  list.map((optionProps: SelectFieldOption) => {
    const {name} = props;
    const {label, value} = optionProps;
    return <SelectOption key={`${name}${label}${value}`} {...optionProps} />;
  });

export const SelectField = (props: SelectFieldProps) => {
  const {defaultValue, label, list = [], name, ...restProps} = props;
  const classes = useStyles();
  const {control, formState: {errors}} = useFormContext();
  let labelElement: JSX.Element;

  // If using a label, add a label component
  if(label) {
    labelElement = <InputLabel shrink>{label}</InputLabel>;
  }

  const updatedProps = {
    ...props,
    // If no value is added, set the first item as the initial value
    value: (list.length && props.value === undefined) ? list[0].value : props.value
  };

  return (
    <FormControl className={classes.field}>
      {labelElement}
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({field: {name, onBlur, onChange, ref, value}}) => (
          <MaterialNativeSelect
            {...restProps}
            error={!!errors[name]}
            inputRef={ref}
            onBlur={onBlur}
            onChange={onChange}
            value={value}>
            {renderOptions(updatedProps, list)}
          </MaterialNativeSelect>
        )} />
    </FormControl>
  );
};
