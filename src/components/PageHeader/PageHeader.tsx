/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import * as React from 'react';

import {Svg} from '../Svg/Svg';
import {PageHeaderProps} from './PageHeader.types';

export const renderIcon = (icon: string) => {
  if(icon) {
    return (
      <Svg name={icon} />
    );
  }

  return null;
};

export const PageHeader = (props: PageHeaderProps) => {
  const {children, icon, title} = props;

  return (
    <React.Fragment>
      <div className="text-center">
        <h1>{title}</h1>
        <p className="subtitle">{children}</p>
        {renderIcon(icon)}
      </div>
    </React.Fragment>
  );
};
