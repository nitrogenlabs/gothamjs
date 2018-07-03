import {WithStyles} from '@material-ui/core/styles';

export interface FormProps extends WithStyles<any> {
  readonly children?: any;
  readonly onSubmit?: any;
  readonly validate?: any;
}
