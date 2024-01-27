/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import styled from '@emotion/styled';
import {FC} from 'react';

import {GothamMenuItem} from '../../views/Gotham';
import {FooterCopyright} from './FooterCopyright';
import {FooterMenu} from './FooterMenu';

export interface FooterProps {
  readonly copyright?: string;
  readonly logo?: JSX.Element;
  readonly menu?: GothamMenuItem[];
}

const FooterStyled = styled.div<FooterProps>`
  background-color: #808080;
  box-shadow: inset 0 10px 10px -5px rgba(0,0,0,.2);
  display: flex;
  padding-left: 50px;
  padding-right: 50px;
`;

export const Footer: FC<FooterProps> = ({copyright, logo, menu}) => (
  <FooterStyled>
    <div className="container">
      <FooterMenu logo={logo} menu={menu} />
      <FooterCopyright>{copyright}</FooterCopyright>
    </div>
  </FooterStyled>
);
