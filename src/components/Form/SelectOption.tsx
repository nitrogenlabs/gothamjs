/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import React from 'react';

import {SelectFieldOption} from './Form.types';

export const SelectOption = ({label, value}: SelectFieldOption): JSX.Element => {
  const optionValue: any = value;
  return <option value={optionValue}>{label}</option>;
};
