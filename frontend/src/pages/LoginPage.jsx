import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    CssBaseline
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginError from "../components/LoginError.jsx";

const theme = createTheme();

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
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                        <Typography component="h1" variant="h5" align="center" mb={3}>
                            Sign in
                        </Typography>

                        <LoginError
                            error={error}
                            onClose={() => setError('')}
                        />

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
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Button
                                type="button"
                                fullWidth
                                variant="outlined"
                                onClick={() => navigate('/register')}
                                sx={{ mt: 1, mb: 2 }}
                            >
                                Don't have an account? Register
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default LoginPage;