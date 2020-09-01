/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {NativeSelectProps as MaterialNativeSelectProps} from '@material-ui/core/NativeSelect/NativeSelect';
import {StandardTextFieldProps as MaterialTextFieldProps} from '@material-ui/core/TextField';
import {SyntheticEvent} from 'react';

export interface FormFieldState {
  readonly active?: boolean;
  readonly blur: () => {};
  readonly change: (value: any) => {};
  readonly data?: any;
  readonly dirty?: boolean;
  readonly dirtySinceLastSubmit?: boolean;
  readonly error?: any;
  readonly focus: () => {};
  readonly initial?: any;
  readonly invalid?: boolean;
  readonly length?: number;
  readonly name: string;
  readonly pristine?: boolean;
  readonly submitError?: any;
  readonly submitFailed?: boolean;
  readonly submitSucceeded?: boolean;
  readonly submitting?: boolean;
  readonly touched?: boolean;
  readonly valid?: boolean;
  readonly value?: any;
  readonly visited?: boolean;
}

export interface FormProps {
  readonly children?: any;
  readonly debug?: any;
  readonly destroyOnUnregister?: boolean;
  readonly initialValues?: object;
  readonly keepDirtyOnReinitialize?: boolean;
  readonly mutators?: any;
  readonly onChange?: any;
  readonly onSubmit?: any;
  readonly validate?: (value: any) => object | Promise<object>;
  readonly validateOnBlur?: boolean;
}

export interface TextFieldProps extends MaterialTextFieldProps {
  readonly onChange?: (event: SyntheticEvent, value?: string) => any;
  readonly validate?: (object) => object | Promise<object>;
}

export type SelectFieldValue = string | number | boolean;

export interface SelectFieldOption {
  readonly label: string;
  readonly value: SelectFieldValue;
}

export interface SelectFieldProps extends MaterialNativeSelectProps {
  readonly classes?: any;
  readonly label: string;
  readonly list: SelectFieldOption[];
  readonly value?: SelectFieldValue;
}
