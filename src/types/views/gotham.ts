import {WithStyles} from '@material-ui/core/styles';

export interface GothamProps extends WithStyles<any> {
  readonly routes?: any[];
  readonly title?: string;
}

export interface GothamState {
  readonly isLoaded: boolean;
}
