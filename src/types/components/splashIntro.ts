import {WithStyles} from '@material-ui/core/styles';

export interface SplashIntroProps extends WithStyles<any> {
  readonly backgroundImage?: string;
  readonly backgroundTextColor?: string;
}
