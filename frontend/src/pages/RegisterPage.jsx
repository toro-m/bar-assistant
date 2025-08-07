import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Button, 
    TextField, 
    Container, 
    Typography, 
    Box, 
    Paper, 
    Link, 
    ThemeProvider,
    CssBaseline
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import theme from '../utils/theme';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regExp.test(String(email).toLowerCase());
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }
        
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if (!response.ok) {
                throw new Error('Registration failed');
            }

            navigate('/login');
            
        } catch (error) {
            console.error('Registration error:', error);
            setErrors({
                submit: 'Registration failed. Please try again.'
            });
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
                    onClick={() => navigate('/login')}
                    sx={{ 
                        alignSelf: 'flex-start', 
                        mb: 2,
                        color: 'primary.dark',
                        '&:hover': {
                            backgroundColor: 'rgba(93, 64, 55, 0.1)',
                        },
                    }}
                >
                    Back to Login
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
                        Create an Account
                    </Typography>
                    
                    {errors.submit && (
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
                            {errors.submit}
                        </Typography>
                    )}
                    
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fullName"
                            label="Full Name"
                            name="fullName"
                            autoComplete="name"
                            autoFocus
                            value={formData.fullName}
                            onChange={handleChange}
                            error={!!errors.fullName}
                            helperText={errors.fullName}
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
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
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
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
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
                            Register
                        </Button>
                        
                        <Box sx={{ 
                            textAlign: 'center', 
                            mt: 2,
                            color: 'text.secondary',
                            fontSize: '0.9rem',
                        }}>
                            Already have an account?{' '}
                            <Link 
                                href="/login" 
                                sx={{ 
                                    color: 'primary.dark',
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                Sign in
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default RegisterPage;