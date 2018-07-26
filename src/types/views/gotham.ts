import {WithStyles} from '@material-ui/core/styles';
import {Store} from '@nlabs/arkhamjs';

export interface GothamProps extends WithStyles<any> {
  readonly config?: GothamConfiguration;
}

export interface GothamState {
  readonly isLoaded: boolean;
}

export interface GothamConfiguration {
  readonly name?: string;
  readonly routes?: object[];
  readonly stores?: Store[];
  readonly title?: string;
}
