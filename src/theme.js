import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00ffcc',
            contrastText: '#000000',
        },
        secondary: {
            main: '#ff4081',
        },
        background: {
            default: '#121212',
            paper: '#1b1b1b',
        },
        text: {
            primary: '#e0e0e0',
            secondary: '#b3b3b3',
            link: '#00ffcc',
        },
    },
    typography: {
        fontFamily: `'Fira Code', monospace`,
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#00ffcc',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#ff4081',
        },
        h3: {
            fontSize: '1.6rem',
            fontWeight: 500,
            color: '#e0e0e0',
        },
        body1: {
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: '#e0e0e0',
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '6px',
                    padding: '8px 16px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1a1a1a',
                    color: '#e0e0e0',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1e1e1e',
                    color: '#e0e0e0',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                    borderRadius: '10px',
                    padding: '0px',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label': {
                        color: '#b3b3b3',
                    },
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: '#262626',
                        color: '#e0e0e0',
                        '& fieldset': {
                            borderColor: '#00ffcc',
                        },
                        '&:hover fieldset': {
                            borderColor: '#ff4081',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#ff4081',
                            boxShadow: '0 0 5px rgba(255, 64, 129, 0.4)',
                        },
                    },
                    '& .MuiInputBase-input': {
                        padding: '12px',
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(to right, #ffcc00  , #ff4081)',
                    height: '2px',
                    marginTop: 1,
                    marginBottom: 1,
                    borderRadius: '1px',
                    margin: '16px 0',
                },
            },
        },
    },
     MuiTable: {
        styleOverrides: {
            root: {
                backgroundColor: '#1b1b1b',
                color: '#e0e0e0',
                borderCollapse: 'separate',
                borderSpacing: '0 10px',
            },
        },
    },

    MuiTableHead: {
        styleOverrides: {
            root: {
                backgroundColor: '#2b2b2b',
            },
        },
    },

    MuiTableRow: {
        styleOverrides: {
            root: {
                '&:nth-of-type(even)': {
                    backgroundColor: '#1d1d1d',
                },
                '&:hover': {
                    backgroundColor: '#333333',
                },
            },
        },
    },

    MuiTableCell: {
        styleOverrides: {
            root: {
                color: '#e0e0e0',
                padding: '12px 16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            },
            head: {
                color: '#00ffcc',
                fontWeight: 600,
                fontSize: '1.1rem',
            },
            body: {
                fontSize: '1rem',
                color: '#b3b3b3',
            },
        },
    },
});

export default theme;
