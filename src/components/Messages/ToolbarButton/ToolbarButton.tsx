import './ToolbarButton.css';

import React from 'react';

import {ToolbarButtonProps} from './ToolbarButton.types';

export const ToolbarButton = (props: ToolbarButtonProps) => {
  const {icon} = props;
  return <i className={`toolbar-button ${icon}`} />;
};

export default ToolbarButton;
