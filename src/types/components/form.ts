import {NativeSelectProps as MaterialNativeSelectProps} from '@material-ui/core/NativeSelect/NativeSelect';
import {WithStyles} from '@material-ui/core/styles';
import {TextFieldProps as MaterialTextFieldProps} from '@material-ui/core/TextField/TextField';


export interface FormProps extends WithStyles<any> {
  readonly children?: any;
  readonly onSubmit?: any;
  readonly validate?: any;
}

export interface TextFieldProps extends MaterialTextFieldProps {

}

export interface SelectFieldOption {
  readonly label: string;
  readonly value: string;
}

export interface SelectFieldProps extends MaterialNativeSelectProps {
  readonly label: string;
  readonly list: SelectFieldOption[];
}
