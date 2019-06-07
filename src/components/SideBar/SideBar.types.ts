/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {GothamMenuItem} from '../../views/Gotham/Gotham.types';

export interface SideBarProps {
  readonly logo?: JSX.Element;
  readonly menu?: GothamMenuItem[];
  readonly open?: boolean;
  readonly pathname?: string;
}
