import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ffcc', // Modern tech cyan
      contrastText: '#000000', // Black text for buttons and primary elements
    },
    secondary: {
      main: '#ff4081', // Vivid pink for accent elements
    },
    background: {
      default: '#121212', // Deep dark background for main content
      paper: '#1b1b1b', // Slightly lighter dark for card and component backgrounds
    },
    text: {
      primary: '#e0e0e0', // Off-white for main text
      secondary: '#b3b3b3', // Muted light gray for secondary text
      link: '#00ffcc', // Link color matches primary for cohesion
    },
  },
  typography: {
    fontFamily: `'Fira Code', monospace`, // Monospaced font for a clean, tech feel
    h1: {
      fontSize: '2.5rem', // Larger for a stronger display impact
      fontWeight: 700,
      color: '#00ffcc', // Cyan color to draw attention to main headings
    },
    h2: {
      fontSize: '2rem', // Slightly larger and bolder for subheadings
      fontWeight: 600,
      color: '#ff4081', // Secondary color adds contrast for h2
    },
    h3: {
      fontSize: '1.6rem',
      fontWeight: 500,
      color: '#e0e0e0', // Neutral for consistency with text color
    },
    body1: {
      fontSize: '1.1rem', // Slightly larger body text for readability
      lineHeight: 1.6, // Spacing for better readability
      color: '#e0e0e0',
    },
    button: {
      textTransform: 'none', // Keep button text lowercase for elegance
      fontWeight: 500, // Slightly bolder for button text clarity
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px', // Slightly more rounded for a modern feel
          padding: '8px 16px',
          boxShadow: 'none', // Remove default shadow
          '&:hover': {
            boxShadow: '', // Subtle glow on hover
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a', // Dark app bar for consistency
          color: '#e0e0e0', // Light text for accessibility
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', // Minimal shadow for depth
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e', // Dark card background to match theme
          color: '#e0e0e0', // Light text on dark for contrast
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', // Slightly stronger shadow for lift effect
          borderRadius: '10px', // Rounded corners for a softer look
          padding: '0px', // Extra padding inside cards for a balanced layout
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            color: '#b3b3b3', // Muted label color to reduce visual clutter
          },
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#262626', // Subtle background for input to add depth
            color: '#e0e0e0', // Light text color for readability
            '& fieldset': {
              borderColor: '#00ffcc', // Default cyan border for input fields
            },
            '&:hover fieldset': {
              borderColor: '#ff4081', // Pink border on hover for feedback
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ff4081', // Pink border when input is focused
              boxShadow: '0 0 5px rgba(255, 64, 129, 0.4)', // Soft glow on focus
            },
          },
          '& .MuiInputBase-input': {
            padding: '12px', // More padding for comfort and design
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #00ffcc, #ff4081)', // Gradient divider for color emphasis
          height: '2px', // Slightly thicker divider
          borderRadius: '1px', // Rounded edges for a polished look
          margin: '16px 0', // Extra spacing around dividers for clarity
        },
      },
    },
  },
});

export default theme;
