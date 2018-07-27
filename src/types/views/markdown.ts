import {PageViewProps} from './page';

export interface MarkdownViewProps extends PageViewProps {
  readonly props?: MarkdownViewConfig;
}

export interface MarkdownViewState {
  readonly content?: string;
}

export interface MarkdownViewConfig {
  readonly external?: string;
}
