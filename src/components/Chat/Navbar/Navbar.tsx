import clsx from 'clsx';

import {INavbarProps} from '../type';

import type {FC} from 'react';

export const Navbar: FC<INavbarProps> = ({type = 'light', ...props}) => (
  <div className={clsx('rce-navbar', type, props.className)}>
    <div className='rce-navbar-item rce-navbar-item__left'>{props.left}</div>
    <div className='rce-navbar-item rce-navbar-item__center'>{props.center}</div>
    <div className='rce-navbar-item rce-navbar-item__right'>{props.right}</div>
  </div>
);
