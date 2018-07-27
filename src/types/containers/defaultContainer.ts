import {WithStyles} from '@material-ui/core/styles';

import {TopBarProps} from '../containers/topBar';

export interface DefaultContainerProps extends WithStyles<any> {
  readonly location?: Location;
  readonly routes?: any[];
  readonly props?: DefaultContainerConfig;
  readonly title?: string;
}

export interface DefaultContainerState {
  readonly isTopSolid?: boolean;
}

export interface DefaultContainerConfig {
  readonly topBar?: TopBarProps;
}
