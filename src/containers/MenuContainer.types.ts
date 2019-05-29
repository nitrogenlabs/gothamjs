/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {SideBarProps} from '../components/SideBar/SideBar.types';
import {DefaultContainerProps, DefaultContainerState} from './DefaultContainer.types';

export interface MenuContainerProps extends DefaultContainerProps {
  readonly sideBar?: SideBarProps;
}

export interface MenuContainerState extends DefaultContainerState {
  readonly isMenuOpen: boolean;
}
