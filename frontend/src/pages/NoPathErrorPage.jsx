import { Box, Button, Container, Typography, keyframes } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            py: 4,
        }}>
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
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
                        fontSize: '10rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: `${shake} 2s infinite`,
                    }}
                >
                    404
                </Typography>
            </motion.div>
            
            <Typography variant="h4" component="h2" sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>
                Oops! Page Not Found
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '600px' }}>
                The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Typography>
            
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => navigate('/home')}
                    sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 8,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        '&:hover': {
                            boxShadow: '0 6px 20px rgba(33, 150, 243, 0.4)',
                        },
                    }}
                >
                    Back to Home
                </Button>
            </motion.div>
            
            <Box sx={{ mt: 6, opacity: 0.7 }}>
                <Typography variant="caption" color="text.secondary">
                    Still lost? Try navigating from the menu or contact support
                </Typography>
            </Box>
        </Container>
    );
};

export default NoPathErrorPage;