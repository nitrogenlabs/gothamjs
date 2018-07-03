import {WithStyles} from '@material-ui/core/styles';

export interface PageViewProps extends WithStyles<any> {
  readonly name: string;
  readonly title?: string;
}

export interface PageViewState {
}
