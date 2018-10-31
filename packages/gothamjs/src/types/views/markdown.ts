import {PageViewProps} from './page';

export interface MarkdownViewProps extends PageViewProps {
  readonly external?: string;
}

export interface MarkdownViewState {
  readonly content?: string;
}
