/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import React from 'react';

export type SelectFieldValue = string | number | boolean;

export interface SelectFieldOption {
  readonly label: string;
  readonly value: SelectFieldValue;
}

export const SelectOption = ({label, value}: SelectFieldOption): JSX.Element => {
  const optionValue: any = value;
  return <option value={optionValue}>{label}</option>;
};
