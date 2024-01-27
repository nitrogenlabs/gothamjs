/**
 * Copyright (c) 2024-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import styled from '@emotion/styled';
import {FC} from 'react';

import {GothamMenuItem} from '../../views/Gotham';

export interface FooterMenuProps {
  readonly copyright?: string;
  readonly logo?: JSX.Element;
  readonly menu?: GothamMenuItem[];
}

const MenuStyled = styled.div<FooterMenuProps>`
  color: #fff;
  padding-bottom: 80;
  padding-top: 60;
`;

const FooterListStyled = styled.div<FooterMenuProps>`
  font-size: 14px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const FooterTitleStyled = styled.div<FooterMenuProps>`
  font-size: 14px;
  font-weight: 700;
`;

const FooterLinkStyled = styled.a<FooterMenuProps>`
  color: #fff;
`;

export const FooterMenu: FC<FooterMenuProps> = ({logo, menu}) => (
  <MenuStyled className="row justify-content-between">
    <div className="col">{logo}</div>
    {menu.map(({menu: subMenu = [], label, url}: GothamMenuItem) => (
      <div key={label} className="col">
        <FooterTitleStyled>{url ? <FooterLinkStyled href="url">label</FooterLinkStyled> : label}</FooterTitleStyled>
        {subMenu && (
          <FooterListStyled>
            {subMenu.map(({label: itemLabel, url: itemUrl}) => (
              <li key={itemLabel}>
                <FooterLinkStyled href={itemUrl}>{itemLabel}</FooterLinkStyled>
              </li>
            ))}
          </FooterListStyled>
        )}
      </div>
    ))}
  </MenuStyled>
);
