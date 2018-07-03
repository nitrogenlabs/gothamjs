import {WithStyles} from '@material-ui/core/styles';

export interface LoginViewProps extends WithStyles<any> {
  readonly logo: JSX.Element;
}

export interface LoginViewState {
  readonly authentication: object;
  readonly session: object;
}
