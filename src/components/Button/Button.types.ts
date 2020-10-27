/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {ButtonProps as MaterialButtonProps} from '@material-ui/core/Button/Button';

export type ButtonVariant = 'text' | 'contained' | 'containedDark' | 'containedLight' | 'outlined' | 'outlinedDark' | 'outlinedLight';

export interface ModifiedButtonProps extends MaterialButtonProps {
  readonly variant?: any;
}
export interface ButtonProps extends ModifiedButtonProps {
  readonly isLoading?: boolean;
  readonly variant?: ButtonVariant;
}
