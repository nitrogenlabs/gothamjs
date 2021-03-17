/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Theme, ThemeOptions} from '@material-ui/core/styles/createMuiTheme';

/* eslint-disable sort-keys */
const palette: any = {
  error: {
    contrastText: '#fff',
    dark: '#c4272f',
    light: '#ffe5e5',
    main: '#cc0000'
  },
  info: {
    contrastText: '#fff',
    dark: '#035aa6',
    light: '#d5e5f2',
    main: '#4ea4d9'
  },
  neutral: {
    contrastText: '#fff',
    dark: '#1d1d1d',
    light: '#f1f1f1',
    main: '#565656'
  },
  primary: {
    contrastText: '#fff',
    dark: '#1A0935',
    light: '#bb8eff',
    main: '#341861'
  },
  secondary: {
    contrastText: '#fff',
    main: '#442b69'
  },
  success: {
    contrastText: '#fff',
    dark: '#038c65',
    light: '#e0ffeb',
    main: '#66d9af'
  },
  warning: {
    contrastText: '#fff',
    dark: '#ffcb04',
    light: '#fff5cd',
    main: '#ffe068'
  }
};

export {Theme, ThemeOptions};

export const breakpoints: any = {
  values: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }
};

export const defaultTheme: ThemeOptions = {
  breakpoints,
  overrides: {
    MuiInputAdornment: {
      root: {
        flexDirection: 'row'
      }
    },
    MuiCssBaseline: {
      '@global': {
        '*': {
          boxSizing: 'border-box'
        },
        'html, body, #app': {
          margin: 0,
          minHeight: '100vh',
          padding: 0,
          position: 'relative'
        },
        'body, p, h1, input': {
          fontFamily: '"Open Sans", sans-serif'
        },
        'div, html, body': {
          flexDirection: 'column'
        },
        'div, html, body, nav, header, hgroup, footer, section, article': {
          display: 'flex',
          flexShrink: 0
        },
        'h1, h2, h3, h4, h5, h6': {
          color: '#606676',
          fontWeight: 300,
          lineHeight: 1.2,
          marginBottom: '0.5rem',
          marginTop: 0
        },
        h1: {
          fontSize: '3rem'
        },
        h2: {
          fontSize: '2rem'
        },
        h3: {
          fontSize: '1rem'
        },
        button: {
          fontFamily: '"Open Sans", sans-serif'
        }
      }
    },
    MuiButton: {
      contained: {
        boxShadow: 'none'
      },
      outlined: {
        backgroundColor: 'transparent',
        borderColor: palette.primary.main,
        borderRadius: 0,
        borderWidth: 1
      },
      root: {
        outline: 0,
        transition: '.3s ease-in all'
      }
    },
    MuiDrawer: {
      paper: {
        width: 275
      }
    },
    MuiFormControl: {
      root: {
        display: 'flex'
      }
    },
    MuiInputBase: {
      root: {
        flexDirection: 'row'
      }
    },
    MuiListItem: {
      root: {
        alignItems: 'flex-start'
      }
    },
    MuiListItemText: {
      primary: {
        fontSize: 14
      }
    },
    MuiNativeSelect: {
      select: {
        height: 24,
        paddingBottom: 0,
        paddingTop: 14
      }
    },
    MuiTabs: {
      flexContainer: {
        flexDirection: 'row'
      }
    },
    MuiToolbar: {
      root: {
        flexDirection: 'row',
        height: 64
      }
    }
  },
  palette,
  props: {
    MuiButtonBase: {
      disableRipple: true,
      disableTouchRipple: true,
      focusRipple: true
    },
    MuiCheckbox: {
      disableRipple: true
    },
    MuiIconButton: {
      disableRipple: true,
      disableTouchRipple: true
    },
    MuiMenuItem: {
    },
    MuiRadio: {
      disableRipple: true,
      disableTouchRipple: true
    },
    MuiSwitch: {
      disableRipple: true,
      disableTouchRipple: true
    }
  },
  typography: {
    fontFamily: ['"Open Sans"', 'sans-serif'].join(', '),
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
    }
  }
};
