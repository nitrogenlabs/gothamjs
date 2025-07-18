/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {useMemo} from 'react';

import {getErrorClasses} from '../../utils/colorUtils.js';

import type {FC} from 'react';
import type {GothamColor} from '../../utils/colorUtils.js';

export interface ErrorMessageProps {
  readonly color?: GothamColor;
  readonly message?: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({color, message}) => {
  if (!message) {
    return null;
  }

  const errorClasses = useMemo(() => getErrorClasses(color as GothamColor), [color]);

  return (
    <p className={`absolute -bottom-5 left-5 text-xs ${errorClasses}`}>
      {message}
    </p>
  );
};