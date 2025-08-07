import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#5D4037',
            light: '#8D6E63',
            dark: '#3E2723',
            contrastText: '#FFF8E1',
        },
        secondary: {
            main: '#BCAAA4',
            light: '#D7CCC8',
            dark: '#8D6E63',
            contrastText: '#3E2723',
        },
        error: {
            main: '#8B4513',
            light: '#A0522D',
            dark: '#6B2D00',
            contrastText: '#FFF8E1',
        },
        background: {
            default: '#EFEBE9',
            paper: '#D7CCC8',
        },
        text: {
            primary: '#3E2723',
            secondary: '#5D4037',
            disabled: '#8D6E63',
        },
    },
    typography: {
        fontFamily: '"Playfair Display", serif',
        h1: {
            fontWeight: 700,
            color: '#3E2723',
        },
        h2: {
            fontWeight: 600,
            color: '#3E2723',
        },
        h3: {
            fontWeight: 600,
            color: '#3E2723',
        },
        h4: {
            fontWeight: 600,
            color: '#3E2723',
        },
        h5: {
            fontWeight: 600,
            letterSpacing: '1px',
            color: '#3E2723',
        },
        h6: {
            fontWeight: 500,
            color: '#3E2723',
        },
        body1: {
            color: '#3E2723',
        },
        body2: {
            color: '#5D4037',
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
                    borderRadius: 0,
                    textTransform: 'none',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                    },
                },
                contained: {
                    '&:hover': {
                        backgroundColor: '#3E2723',
                    },
                },
                outlined: {
                    borderColor: '#5D4037',
                    color: '#5D4037',
                    '&:hover': {
                        backgroundColor: 'rgba(93, 64, 55, 0.05)',
                        borderColor: '#3E2723',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#8D6E63',
                        },
                        '&:hover fieldset': {
                            borderColor: '#5D4037',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#5D4037',
                        },
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    border: '1px solid',
                    borderColor: 'rgba(93, 64, 55, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(5px)',
                    '&:hover': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px)'
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#3E2723',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(93, 64, 55, 0.1)',
                        '&:hover': {
                            backgroundColor: 'rgba(93, 64, 55, 0.15)',
                        },
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(93, 64, 55, 0.05)',
                    },
                },
            },
        },
    },
    shape: {
        borderRadius: 0,
    },
});

export default theme;