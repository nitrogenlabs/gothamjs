import {ThemeOptions} from '@material-ui/core/styles/createMuiTheme';

const palette = {
  error: {
    main: '#ed1c24'
  },
  primary: {
    main: '#bb8eff'
  },
  secondary: {
    main: '#442b69'
  }
};

export const defaultTheme: ThemeOptions = {
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: 'none'
      },
      outlined: {
        borderColor: palette.primary.main,
        borderRadius: 0,
        borderWidth: 2
      },
      root: {
        transition: '.3s ease-in all'
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
  palette,
  props: {
    MuiButton: {
      disableFocusRipple: true,
      disableRipple: true
    }
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(', '),
    fontSize: 13
  }
};
