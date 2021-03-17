import './Toolbar.css';

import React from 'react';

export interface ToolbarProps {
  readonly title?: string;
  readonly leftItems?: JSX.Element[];
  readonly rightItems?: JSX.Element[];
}

export const Toolbar = (props: ToolbarProps) => {
  const {title, leftItems, rightItems} = props;

  return (
    <div className="toolbar">
      <div className="left-items">{leftItems}</div>
      <h1 className="toolbar-title">{title}</h1>
      <div className="right-items">{rightItems}</div>
    </div>
  );
};

export default Toolbar;
