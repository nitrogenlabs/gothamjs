/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Theme, ThemeOptions} from '@material-ui/core';

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
  components: {
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          flexDirection: 'row'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: `
        html, body, #app {
          margin: 0;
          min-height: 100vh;
          padding: 0;
          position: relative;
        }
        #app {
          display: flex;
        }
        body, button, p, h1, input, textarea {
          font-family: "Open Sans", sans-serif;
        }
        h1, h2, h3, h4, h5, h6 {
          color: #606676;
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 0.5rem;
          margin-top: 0;
        }
        h1 {
          font-size: 3rem;
        }
        h2 {
          font-size: 2rem;
        }
        h3 {
          font-size: 1rem;
        }`
    },
    MuiButton: {
      styleOverrides: {
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
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
        focusRipple: true
      }
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          position: 'relative'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 275
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          display: 'flex'
        }
      }
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          flexDirection: 'row'
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          alignItems: 'flex-start'
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14
        }
      }
    },
    MuiNativeSelect: {
      styleOverrides: {
        select: {
          height: 24,
          paddingBottom: 0,
          paddingTop: 14
        }
      }
    },
    MuiRadio: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true
      }
    },
    MuiSwitch: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true
      }
    },
    MuiTabs: {
      styleOverrides: {
        flexContainer: {
          flexDirection: 'row'
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          flexDirection: 'row',
          height: 64
        }
      }
    }
  },
  palette,
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
