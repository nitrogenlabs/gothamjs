/**
 * Copyright (c) 2024-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FC} from 'react';

export interface ErrorMessageProps {
  readonly message?: string;
}
export const ErrorMessage: FC<ErrorMessageProps> = ({message}) =>
  message && <div className="mb3 ph2 pv3">{message}</div>;