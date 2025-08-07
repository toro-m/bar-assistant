import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Typography,
    ThemeProvider,
    CssBaseline
} from '@mui/material';
import theme from '../utils/theme';

const HomePage = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #EFEBE9 0%, #D7CCC8 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    p: 3,
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            color: 'primary.dark',
                            mb: 3,
                            fontFamily: '"Playfair Display", serif',
                            fontWeight: 700,
                            fontSize: { xs: '2.5rem', sm: '3.5rem' },
                            position: 'relative',
                            '&:after': {
                                content: '""',
                                display: 'block',
                                width: '120px',
                                height: '4px',
                                background: 'linear-gradient(90deg, #5D4037, #8D6E63, #5D4037)',
                                margin: '24px auto',
                            },
                        }}
                    >
                        Welcome to Bar Assistant
                    </Typography>

                    <Typography
                        variant="h5"
                        component="p"
                        sx={{
                            color: 'text.secondary',
                            mb: 6,
                            maxWidth: '700px',
                            mx: 'auto',
                            lineHeight: 1.6,
                        }}
                    >
                        Manage your bar's table reservations with ease. Our intuitive platform helps you
                        keep track of reservations, manage tables, and provide excellent service to your customers.
                    </Typography>

                    <Button
                        component={Link}
                        to="/tables"
                        variant="contained"
                        size="large"
                        sx={{
                            px: 6,
                            py: 1.5,
                            fontSize: '1.1rem',
                            textTransform: 'none',
                            borderRadius: 0,
                            backgroundColor: 'primary.main',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        View Tables
                    </Button>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default HomePage;