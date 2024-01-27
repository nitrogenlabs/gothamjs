import styled from '@emotion/styled';
import {FC} from 'react';
import {Backburger as BackBurgerIcon, Menu as MenuIcon} from 'mdi-material-ui';

export interface TopBarMenuIconProps {
  readonly iconColor: string;
  readonly isOpen: boolean;
  readonly onToggle: (isOpen: boolean) => void;
}

export interface MenuIconProps {
  readonly iconColor: string;
}

const MenuIconStyled = styled.div<MenuIconProps>`
  color: ${({iconColor}: MenuIconProps) => iconColor};

  & svg: {
    height: 32;
    width: 32;
  }
`;

export const TopBarMenuIcon: FC<TopBarMenuIconProps> = ({iconColor, isOpen, onToggle}) => (
  <MenuIconStyled
    aria-label="Open drawer"
    className="d-flex d-md-none"
    iconColor={iconColor}
    onClick={() => onToggle(!isOpen)}>
    {isOpen ? <BackBurgerIcon /> : <MenuIcon />}
  </MenuIconStyled>
);