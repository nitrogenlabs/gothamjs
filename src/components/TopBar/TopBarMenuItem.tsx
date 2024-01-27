import {FC} from 'react';

import {Button} from '../Form/Button';
import {GothamMenuItem} from '../../views';
import {GothamActions} from '../../actions/GothamActions';

export interface TopBarMenuItemProps {
  readonly isTransparent?: boolean;
  readonly menuItem: GothamMenuItem;
  readonly solidTextColor?: string;
  readonly transparentTextColor?: string;
}

export const TopBarMenuItem: FC<TopBarMenuItemProps> = ({
  solidTextColor = '#fff',
  transparentTextColor = '#fff',
  isTransparent = false,
  menuItem
}) => {
  const {content, label, url} = menuItem;
  const color = isTransparent ? transparentTextColor : solidTextColor;

  if(label) {
    return (
      <Button
        color="inherit"
        key={`${label}:${url}`}
        onClick={() => GothamActions.navGoto(url)}
        label={label} />
    );
  }

  return content(color);
};