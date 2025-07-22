import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress, 
  Alert, 
  AlertTitle,
  useMediaQuery,
  useTheme
} from '@mui/material';
import TableCard from "../components/TableCard.jsx";
import ReservationConfirmation from "../components/ReservationConfirmation.jsx";
import ReservationCalendar from "../components/ReservationCalendar.jsx";
import {fetchTables, getEmailFromToken} from "../utils/utils.js";


const AllTablesPage = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reservationDateTime, setReservationDateTime] = useState(null);
  
  const theme = useTheme();
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
    return (
      <Box className="loading-container">
        <CircularProgress 
          size={48} 
          thickness={4}
          sx={{
            color: '#3b82f6',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
    );
  }


  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert 
          severity="error"
          sx={{
            '& .MuiAlert-icon': {
              color: 'error.main',
              '& svg': {
                width: '1.5rem',
                height: '1.5rem',
              },
            },
            '& .MuiAlert-message': {
              color: '#b91c1c',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
            },
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            '& svg': {
              color: '#ef4444',
            },
          }}
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h3" 
        component="h1" 
        sx={{
          fontSize: '1.875rem',
          fontWeight: 700,
          color: '#1f2937',
          mb: 3,
          textAlign: 'center',
        }}
      >
        All Tables
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
          gap: 2,
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
  );
};

export default AllTablesPage;