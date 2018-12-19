import {NativeSelectProps as MaterialNativeSelectProps} from '@material-ui/core/NativeSelect/NativeSelect';
import {WithStyles} from '@material-ui/core/styles';
import {StandardTextFieldProps as MaterialTextFieldProps} from '@material-ui/core/TextField';

/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export interface FormProps extends WithStyles<any> {
  readonly children?: any;
  readonly debug: any;
  readonly destroyOnUnregister: boolean;
  readonly initialValues: object;
  readonly keepDirtyOnReinitialize: boolean;
  readonly mutators: any;
  readonly onChange?: any;
  readonly onSubmit: any;
  readonly validate?: any;
  readonly validateOnBlur: boolean;
}

export interface TextFieldProps extends MaterialTextFieldProps {
  readonly validate?: (object) => object | Promise<object>;
}

export type SelectFieldValue = string | number | boolean;

export interface SelectFieldOption {
  readonly label: string;
  readonly value: SelectFieldValue;
}

export interface SelectFieldProps extends MaterialNativeSelectProps, WithStyles<any> {
  readonly classes: any;
  readonly label: string;
  readonly list: SelectFieldOption[];
  readonly value?: SelectFieldValue;
}
