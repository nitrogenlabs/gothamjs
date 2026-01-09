/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {useFormContext} from 'react-hook-form';

import {Button} from './Button.js';

import type {ButtonProps} from './Button.js';

export interface FormButtonProps extends ButtonProps {
  readonly autoDisable?: boolean;
}

export const FormButton = ({autoDisable = true, type, ...props}: FormButtonProps) => {
  const {formState: {isSubmitting}} = useFormContext();

  return (
    <Button
      {...props}
      type={type}
      isLoading={autoDisable ? isSubmitting && type === 'submit' : props.isLoading}
      disabled={autoDisable ? isSubmitting && type === 'submit' : props.disabled}
    />
  );
};