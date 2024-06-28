import { alpha, createTheme } from '@mui/material/styles';
import { useMemo } from 'react';


export const useGetTheme = () => {
  const primary = '#89c75f';

  const error = '#ff3a6e';

  const backgroundColor = '#FFFFFF';

  const borderRadius = 4;

  const fontColor = '#474955';

  const fontDark = primary;

  const useTheme = useMemo(
    () =>
      createTheme({
        shape: {
          borderRadius,
        },

        palette: {
          mode: 'light',

          primary: {
            main: primary,
          },

          error: {
            main: error,
          },

          success: {
            main: '#6fd943',
          },

          secondary: {
            main: '#808080',
          },

          warning: {
            main: '#facc15',
          },

          info: {
            main: '#93c5fd',
          },

          background: {
            default: backgroundColor,
            paper: backgroundColor,
          },

          mainColor: '#f1f5f9',

          fontColor,

          text: {
            primary: fontColor,
            secondary: fontDark,
          },
        },

        typography: {
          fontSize: 10.5,

          fontWeightRegular: 500,

          allVariants: {
            fontFamily: '"Poppins", sans-serif',
            color: fontColor,
          },
        },

        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                fontWeight: 500,
              },
            },
            defaultProps: {
              fullWidth: true,
            },
          },

          MuiInputAdornment: {
            styleOverrides: {
              root: {
                '& .MuiTypography-root': {
                  color: alpha('#000000', 0.87),
                },
              },
            },
          },

          MuiSelect: {
            defaultProps: {
              fullWidth: true,
              size: 'small',
            },
          },

          MuiButton: {
            styleOverrides: {
              root: {
                boxShadow: 'none',
                textTransform: 'none',
                ':hover': {
                  boxShadow: 'none',
                },
              },
            },
          },

          MuiListItemIcon: {
            styleOverrides: {
              root: {
                minWidth: '38px',
                color: 'rgba(0, 0, 0, 0.54)',
              },
            },
          },

          MuiListItem: {
            styleOverrides: {
              root: {
                borderRadius: borderRadius + 'px',
              },
            },
          },

          MuiListItemButton: {
            styleOverrides: {
              root: {
                borderRadius: borderRadius + 'px',

                ':hover': {
                  boxShadow: 'none',
                },

                '&.Mui-selected': {
                  backgroundColor: alpha(primary, 0.1),

                  '& .MuiButtonBase-root': {
                    color: primary,
                  },

                  '& .MuiTypography-root': {
                    color: primary,
                    fontWeight: 500,
                  },

                  '& .MuiSvgIcon-root': {
                    color: primary,
                  },
                },
              },
            },
          },

          MuiStepLabel: {
            styleOverrides: {
              root: {
                '& .MuiSvgIcon-root': {
                  width: '1.25em',
                  height: '1.25em',
                },
              },
              label: {
                fontSize: '0.85rem',
              },
            },
          },

          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: 'none',
                backgroundImage: 'none',
              },
            },
          },

          MuiTableCell: {
            styleOverrides: {
              head: {
                fontWeight: 600,
              },
            },
          },

          MuiTooltip: {
            defaultProps: {
              placement: 'top',
              sx: {
                fontSize: '0.8rem',
              },
            },
          },

          MuiButtonGroup: {
            styleOverrides: {
              root: {
                boxShadow: 'none',
              },
            },
          },

          MuiCardContent: {
            styleOverrides: {
              root: {
                ':last-child': {
                  paddingBottom: '16px',
                },
              },
            },
          },
        },
      }),

    [backgroundColor, fontColor, fontDark, primary]
  );

  return useTheme;
};
