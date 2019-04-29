/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export interface PromoItemProps {
  readonly details?: string;
  readonly image?: JSX.Element;
  readonly title?: string;
}

export interface PromoRowProps {
  readonly list?: PromoItemProps[];
}
