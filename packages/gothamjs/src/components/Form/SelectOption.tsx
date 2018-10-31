import * as React from 'react';

import {SelectFieldOption} from '../../types/components/form';

export const SelectOption = ({label, value}: SelectFieldOption): JSX.Element => {
  const optionValue: any = value;
  return <option value={optionValue}>{label}</option>;
};
