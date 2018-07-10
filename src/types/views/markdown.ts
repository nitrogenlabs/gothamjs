import {WithStyles} from '@material-ui/core/styles';

export interface MarkdownViewProps extends WithStyles<any> {
  readonly external: string;
}

export interface MarkdownViewState {
  readonly content: string;
}
