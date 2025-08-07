import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getEmailFromToken } from "../utils/utils.js";
import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    Box,
    Container
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const NavBar = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const theme = useTheme();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const checkAdminStatus = async () => {
            const email = getEmailFromToken();
            if (!email) return;

            try {
                const response = await fetch(`/api/users/${email}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user by email');
                }
                const data = await response.json();
                setIsAdmin(data.role === "ROLE_ADMIN");
            } catch (err) {
                console.error('Error fetching user by email:', err);
            }
        };

        checkAdminStatus();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                background: 'linear-gradient(90deg, #5D4037 0%, #8D6E63 100%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                py: 1
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography
                            variant="h6"
                            component={RouterLink}
                            to="/home"
                            sx={{
                                color: 'white',
                                textDecoration: 'none',
                                fontFamily: '"Playfair Display", serif',
                                fontWeight: 600,
                                '&:hover': {
                                    opacity: 0.9,
                                },
                            }}
                        >
                            Bar Assistant
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            component={RouterLink}
                            to="/tables"
                            sx={{
                                color: 'white',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            View Tables
                        </Button>

                        {isAdmin && (
                            <Button
                                component={RouterLink}
                                to="/admin"
                                sx={{
                                    color: 'white',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                Admin Panel
                            </Button>
                        )}

                        {token ? (
                            <Button
                                onClick={handleLogout}
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    },
                                }}
                            >
                                Logout
                            </Button>
                        ) : (
                            <Button
                                component={RouterLink}
                                to="/login"
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    },
                                }}
                            >
                                Sign In
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;