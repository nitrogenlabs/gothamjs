import {ButtonProps as MaterialButtonProps} from '@material-ui/core/Button/Button';
import {WithStyles} from '@material-ui/core/styles';
import {TextFieldProps as MaterialTextFieldProps} from '@material-ui/core/TextField/TextField';

export interface FormProps extends WithStyles<any> {
  readonly children?: any;
  readonly onSubmit?: any;
  readonly validate?: any;
}

export interface ButtonProps extends MaterialButtonProps {

}

export interface TextFieldProps extends MaterialTextFieldProps {

}
