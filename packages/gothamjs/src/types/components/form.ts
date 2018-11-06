import {NativeSelectProps as MaterialNativeSelectProps} from '@material-ui/core/NativeSelect/NativeSelect';
import {WithStyles} from '@material-ui/core/styles';
import {StandardTextFieldProps as MaterialTextFieldProps} from '@material-ui/core/TextField/TextField';

export interface FormProps extends WithStyles<any> {
  readonly children?: any;
  readonly onChange?: any;
  readonly onSubmit: any;
  readonly validate?: any;
}

export interface TextFieldProps extends MaterialTextFieldProps {

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
