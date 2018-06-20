import {ThemeOptions} from '@material-ui/core/styles/createMuiTheme';

export const defaultTheme: ThemeOptions = {
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: 'none'
      }
    },
    MuiDrawer: {
      paper: {
        width: 275
      }
    },
    MuiListItemText: {
      primary: {
        fontSize: 14
      }
    }
  },
  props: {
    MuiButton: {
      disableFocusRipple: true,
      disableRipple: true
    }
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(', '),
    fontSize: 14
  }
};
