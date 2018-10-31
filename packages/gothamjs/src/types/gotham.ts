import {WithStyles} from '@material-ui/core/styles';
import {FluxMiddlewareType, Store} from '@nlabs/arkhamjs';

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
  readonly middleware?: FluxMiddlewareType[];
}

export interface GothamMenuItem {
  readonly label?: string;
  readonly url?: string;
  readonly menu?: GothamMenuItem[];
}

export interface GothamButtonItem {
  readonly label?: string;
  readonly url?: string;
}
