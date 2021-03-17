import './ToolbarButton.css';

import React from 'react';

export interface ToolbarButtonProps {
  readonly icon?: string;
}

export const ToolbarButton = (props: ToolbarButtonProps) => {
  const {icon} = props;
  return <i className={`toolbar-button ${icon}`} />;
};

export default ToolbarButton;
