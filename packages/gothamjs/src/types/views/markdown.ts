/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {PageViewProps} from './page';

export interface MarkdownViewProps extends PageViewProps {
  readonly external?: string;
}

export interface MarkdownViewState {
  readonly content?: string;
}
