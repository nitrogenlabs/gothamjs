import clsx from 'clsx';

import {IButtonProps} from '../type';
import './Button.css';

import type {FC} from 'react';

export const Button: FC<IButtonProps> = ({disabled = false, backgroundColor = '#3979aa', color = 'white', ...props}) => (
  <button
    ref={props.buttonRef}
    title={props.title}
    className={clsx('rce-button', props.type, props.className)}
    style={{
      backgroundColor,
      color,
      borderColor: backgroundColor
    }}
    disabled={disabled}
    onClick={props.onClick}
  >
    {props.icon ? (
      <span className='rce-button-icon--container'>
        {(props.icon.float === 'right' || !props.icon.float) && <span>{props.text}</span>}

        <span style={{float: props.icon.float, fontSize: props.icon.size || 12}} className='rce-button-icon'>
          {props.icon.component}
        </span>

        {props.icon.float === 'left' && <span>{props.text}</span>}
      </span>
    ) : (
      <span>{props.text}</span>
    )}
  </button>
);
