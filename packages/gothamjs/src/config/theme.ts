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
    MuiGrid: {
      container: {
        flex: 1,
        width: 'auto'
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
    fontSize: 13,
    h1: {
      color: 'rgba(0, 0, 0, 0.15)',
      fontFamily: 'inherit',
      fontSize: '50px',
      fontWeight: 100,
      lineHeight: 'inherit'
    },
    h4: {
      color: 'inherit',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 'inherit'
    },
    useNextVariants: false
  }
};