import {WithStyles} from '@material-ui/core/styles';

import {TopBarProps} from '../components/topBar';

export interface DefaultContainerProps extends WithStyles<any> {
  readonly location: Location;
  readonly logo: JSX.Element;
  readonly topBar: TopBarProps;
  readonly routes: any[];
  readonly siteTitle: string;
  readonly title: string;
}

export interface DefaultContainerState {
  readonly isTopSolid: boolean;
}
