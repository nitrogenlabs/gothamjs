import {StyleRulesCallback, withStyles} from '@material-ui/core/styles';
import {hot} from 'react-hot-loader';

export const initComponent = (componentModule, component, styles?: StyleRulesCallback) => {
  if(styles) {
    return hot(componentModule)(withStyles(styles, {withTheme: true})(component));
  }

  return hot(componentModule)(component);
};
