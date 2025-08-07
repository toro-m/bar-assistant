import React, { useEffect, useState } from "react";
import { fetchTables } from "../utils/utils.js";
import AdminTableCard from "../components/AdminTableCard.jsx";
import CreateTableForm from "../components/CreateTableForm.jsx";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";
import { Box, Typography, Container, useMediaQuery, ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../utils/theme';

const AdminPage = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useMediaQuery(theme.breakpoints.up('md'));
    useMediaQuery(theme.breakpoints.up('lg'));

    useEffect(() => {
        const loadTables = async () => {
            try {
                setLoading(true);
                const data = await fetchTables();
                setTables(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadTables();
    }, []);

    const handleDeleteTable = async (tableNumber) => {
        try {
            await fetch(`/api/tables/${tableNumber}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                }
            });
            setTables(prevTables => prevTables.filter(table => table.tableNumber !== tableNumber));
        } catch (err) {
            console.error("Error deleting table:", err);
            setError("Failed to delete table. Please try again.");
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error message={error} />;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(5px)',
                    p: 4,
                    mb: 4,
                    borderRadius: 1,
                    border: '1px solid rgba(93, 64, 55, 0.2)'
                }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            color: 'primary.dark',
                            fontFamily: 'inherit',
                            mb: 2,
                            fontWeight: 600,
                            position: 'relative',
                            '&:after': {
                                content: '""',
                                display: 'block',
                                width: '80px',
                                height: '3px',
                                background: theme.palette.primary.main,
                                mt: 2
                            }
                        }}
                    >
                        Admin Dashboard
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Manage your restaurant tables and reservations
                    </Typography>

                    <CreateTableForm />
                </Box>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)'
                    },
                    gap: 3
                }}>
                    {tables.map((table) => (
                        <AdminTableCard
                            key={table.tableNumber}
                            table={table}
                            onDelete={handleDeleteTable}
                        />
                    ))}
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default AdminPage;