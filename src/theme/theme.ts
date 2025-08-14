import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6B2D14',
      light: '#8B4513',
      dark: '#4A1F0E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFF1D6',
      light: '#FFFAE6',
      dark: '#F5E6B8',
      contrastText: '#6B2D14',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#6B2D14',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#6B2D14',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#6B2D14',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#6B2D14',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#6B2D14',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#6B2D14',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#6B2D14',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: '0 2px 8px rgba(107, 45, 20, 0.15)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(107, 45, 20, 0.25)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});