/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FC} from 'react';

import {Svg} from '../Svg/Svg';

export interface PageHeaderProps {
  readonly children: string;
  readonly icon?: string;
  readonly title: string;
}

export const PageHeader: FC<PageHeaderProps> = ({children, icon, title}) => (
  <div className="text-center">
    <h1>{title}</h1>
    <p className="subtitle">{children}</p>
    {icon && (<Svg name={icon} />)}
  </div>
);
