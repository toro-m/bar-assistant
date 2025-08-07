import {createTheme} from "@mui/material/styles";


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
            contrastText: '#3E2723',
        },
        background: {
            default: '#EFEBE9',
            paper: '#D7CCC8',
        },
        text: {
            primary: '#3E2723',
            secondary: '#5D4037',
        },
    },
    typography: {
        fontFamily: '"Playfair Display", serif',
        h5: {
            fontWeight: 600,
            letterSpacing: '1px',
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
                    },
                },
            },
        },
    },
});

export default theme;