import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ffcc', // Cyan for a modern tech feel
      contrastText: '#000000', // Black text for contrast on primary buttons
    },
    secondary: {
      main: '#ff4081', // Vivid pink for emphasis
    },
    background: {
      default: '#121212', // Deep dark gray for main background
      paper: '#1e1e1e', // Slightly lighter for card backgrounds
    },
    text: {
      primary: '#e0e0e0', // Soft white for primary text
      secondary: '#b3b3b3', // Light gray for secondary text
      link: '#00ffcc', // Links match primary color for cohesion
    },
  },
  typography: {
    fontFamily: `'Fira Code', monospace`,
    h1: {
      fontSize: '2.2rem',
      fontWeight: 700,
      color: '#00ffcc', // Primary color for h1 headings
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#ff4081', // Secondary color for h2 headings
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#e0e0e0', // Neutral color for h3 and below
    },
    body1: {
      fontSize: '1rem',
      color: '#e0e0e0', // Standard body text
    },
    button: {
      textTransform: 'none', // Keep button text lowercase for cleaner look
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          padding: '8px 16px',
          boxShadow: 'none', // Keep buttons clean
          '&:hover': {
            boxShadow: '', // Subtle glow on hover
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a', // Dark AppBar for consistency with theme
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e', // Consistent card background
          color: '#e0e0e0',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Subtle shadow to lift cards
          borderRadius: '8px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            color: '#b3b3b3', // Muted label color
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#00ffcc', // Cyan border for text fields
            },
            '&:hover fieldset': {
              borderColor: '#ff4081', // Pink on hover for focus effect
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ff4081', // Pink border when focused
            },
          },
        },
      },
    },
  },
});

export default theme;
