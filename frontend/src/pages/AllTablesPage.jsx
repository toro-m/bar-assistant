import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    useMediaQuery,
    ThemeProvider,
    CssBaseline
} from '@mui/material';
import TableCard from "../components/TableCard.jsx";
import ReservationConfirmation from "../components/ReservationConfirmation.jsx";
import ReservationCalendar from "../components/ReservationCalendar.jsx";
import { fetchTables, getEmailFromToken } from "../utils/utils.js";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";
import theme from '../utils/theme';

const AllTablesPage = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [_reservationDateTime, setReservationDateTime] = useState(null);

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

        loadTables().catch(console.error);
    }, []);

    const handleReserveClick = (tableNumber) => {
        setSelectedTable(tableNumber);
        setReservationDateTime(null);
        setIsModalOpen(true);
    };

    const formatToLocalISO = (date) => {
        const pad = (n) => n.toString().padStart(2, '0');
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        return `${year}-${month}-${day}T${hours}:${minutes}:00`;
    };

    const handleConfirmReservation = async (reservationDateTime) => {
        if (!reservationDateTime) return;

        setIsProcessing(true);
        try {
            const startTime = new Date(reservationDateTime);
            const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
            const token = localStorage.getItem('token');

            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userEmail: getEmailFromToken(),
                    tableNumber: selectedTable,
                    reservationStartTime: formatToLocalISO(startTime),
                    reservationEndTime: formatToLocalISO(endTime)
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create reservation');
            }

            await fetchTables();
        } catch (err) {
            console.error('Error creating reservation:', err);
            setError(err.message || 'Failed to create reservation');
        } finally {
            setIsProcessing(false);
            setIsModalOpen(false);
            setSelectedTable(null);
            setReservationDateTime(null);
        }
    };

    const handleCancelReservation = () => {
        setIsModalOpen(false);
        setReservationDateTime(null);
        setTimeout(() => {
            setSelectedTable(null);
        }, 300);
    };

    const handleDateTimeChange = (dateTime) => {
        setReservationDateTime(dateTime);
    };

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Error message={error}/>;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container
                maxWidth="lg"
                sx={{
                    py: 4,
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #EFEBE9 0%, #D7CCC8 100%)',
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontSize: '2rem',
                        fontWeight: 600,
                        color: 'primary.dark',
                        mb: 4,
                        textAlign: 'center',
                        fontFamily: '"Playfair Display", serif',
                        position: 'relative',
                        '&:after': {
                            content: '""',
                            display: 'block',
                            width: '100px',
                            height: '3px',
                            background: 'linear-gradient(90deg, #5D4037, #8D6E63, #5D4037)',
                            margin: '16px auto 0',
                        },
                    }}
                >
                    Available Tables
                </Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: '1fr',
                            md: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)',
                        },
                        gap: 3,
                        width: '100%',
                    }}
                >
                    {tables.map((table) => (
                        <TableCard
                            key={table.tableNumber}
                            table={table}
                            onReserve={() => handleReserveClick(table.tableNumber)}
                        />
                    ))}
                </Box>

                <ReservationConfirmation
                    key={`${isModalOpen}-${selectedTable}`}
                    isOpen={isModalOpen}
                    tableNumber={selectedTable}
                    onConfirm={handleConfirmReservation}
                    onCancel={handleCancelReservation}
                    isProcessing={isProcessing}
                >
                    <ReservationCalendar
                        tableNumber={selectedTable}
                        onTimeSelect={handleDateTimeChange}
                        key={`calendar-${isModalOpen}-${selectedTable}`}
                    />
                </ReservationConfirmation>
            </Container>
        </ThemeProvider>
    );
};

export default AllTablesPage;