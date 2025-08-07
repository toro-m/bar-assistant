import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    TextField,
    Container,
    Typography,
    Box,
    Paper,
    ThemeProvider,
    CssBaseline, Link
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import theme from '../utils/theme';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email, password: formData.password })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Login failed. Please check your credentials and try again.");
            }

            const token = await response.text();
            localStorage.setItem("token", token);
            navigate('/tables');

        } catch (error) {
            console.error("Login error:", error);
            setError(error.message || "An error occurred during login. Please try again.");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    py: 4,
                    background: 'linear-gradient(135deg, #EFEBE9 0%, #D7CCC8 100%)',
                }}
            >
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => navigate('/tables')}
                    sx={{
                        alignSelf: 'flex-start',
                        mb: 2,
                        color: 'primary.dark',
                        '&:hover': {
                            backgroundColor: 'rgba(93, 64, 55, 0.1)',
                        },
                    }}
                >
                    Back to tables page
                </Button>

                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(93, 64, 55, 0.2)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            background: 'linear-gradient(90deg, #5D4037, #8D6E63, #5D4037)',
                        },
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h5"
                        align="center"
                        sx={{
                            mb: 3,
                            color: 'primary.dark',
                            position: 'relative',
                            '&:after': {
                                content: '""',
                                display: 'block',
                                width: '60px',
                                height: '2px',
                                background: '#8D6E63',
                                margin: '12px auto 0',
                            },
                        }}
                    >
                        Welcome Back
                    </Typography>

                    {error && (
                        <Typography
                            color="error"
                            align="center"
                            sx={{
                                mb: 2,
                                p: 1,
                                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                                borderRadius: 1,
                            }}
                        >
                            {error}
                        </Typography>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={handleChange}
                            error={!!error}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                },
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!error}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 4,
                                mb: 2,
                                py: 1.5,
                                fontSize: '1.1rem',
                                backgroundColor: 'primary.main',
                                '&:hover': {
                                    backgroundColor: 'primary.dark',
                                },
                            }}
                        >
                            Sign In
                        </Button>
                        <Box sx={{
                            textAlign: 'center',
                            mt: 2,
                            color: 'text.secondary',
                            fontSize: '0.9rem',
                        }}>
                            Don't have an account?{' '}
                            <Link
                                href="/register"
                                sx={{
                                    color: 'primary.dark',
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                Register
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default LoginPage;