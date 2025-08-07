import { Box, Button, Container, Typography, keyframes } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import theme from '../utils/theme';

const shake = keyframes`
    0% { transform: translateX(0); }
    20% { transform: translateX(-10px); }
    40% { transform: translateX(10px); }
    60% { transform: translateX(-10px); }
    80% { transform: translateX(10px); }
    100% { transform: translateX(0); }
`;

const NoPathErrorPage = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            py: 8,
            background: theme.palette.background.default,
            borderRadius: 1,
            my: 4,
            border: `1px solid ${theme.palette.secondary.dark}33`
        }}>
            <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '6rem', sm: '8rem', md: '10rem' },
                        fontWeight: 700,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: `${shake} 2s infinite`,
                        fontFamily: theme.typography.fontFamily,
                    }}
                >
                    404
                </Typography>
            </motion.div>

            <Typography
                variant="h4"
                component="h2"
                sx={{
                    mt: 2,
                    mb: 2,
                    color: 'text.primary',
                    fontFamily: theme.typography.fontFamily
                }}
            >
                Oops! Page Not Found
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    mb: 4,
                    maxWidth: '600px',
                    px: 2,
                    color: 'text.secondary',
                    fontFamily: theme.typography.fontFamily
                }}
            >
                The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Typography>

            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/home')}
                    sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 0,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        fontFamily: theme.typography.fontFamily,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                            boxShadow: 'none',
                        },
                        '&.MuiButton-contained': {
                            backgroundColor: theme.palette.primary.main,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                            }
                        }
                    }}
                >
                    Back to Home
                </Button>
            </motion.div>

            <Box sx={{ mt: 6, opacity: 0.7 }}>
                <Typography
                    variant="caption"
                    sx={{
                        color: 'text.secondary',
                        fontFamily: theme.typography.fontFamily
                    }}
                >
                    Still lost? Try navigating from the menu or contact support
                </Typography>
            </Box>
        </Container>
    );
};

export default NoPathErrorPage;