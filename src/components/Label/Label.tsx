/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {useMemo} from 'react';
import {cn} from '@nlabs/utils';

import {getTextClasses} from '../../utils/colorUtils.js';

import type {GothamColor} from '../../utils/colorUtils.js';
import type {FC} from 'react';

export interface LabelProps {
  readonly className?: string;
  readonly color?: GothamColor;
  readonly errorColor?: GothamColor;
  readonly hasError?: boolean;
  readonly label: string;
  readonly name: string;
}

export const Label: FC<LabelProps> = ({
  className,
  color = 'neutral',
  hasError = false,
  label,
  name
}) => {
  const labelClasses = useMemo(() => getTextClasses(hasError ? 'error' : color), [color, hasError]);

  if (!label) {
    return null;
  }

  return (
    <label
      className={cn(className, labelClasses)}
      htmlFor={name}
    >
      {label}
    </label>
  );
};