import React, { useState, useEffect } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, Button, Typography, Grid, CircularProgress } from '@mui/material';

const TIME_SLOTS = [
  '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00', '23:00'
];

const ReservationCalendar = ({ tableNumber, onTimeSelect}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tableNumber) {
      fetchReservations();
    }
  }, [tableNumber]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reservations/table/${tableNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
      const data = await response.json();
      setReservations(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching reservations:', err);
    } finally {
      setLoading(false);
    }
  };

  const isTimeAvailable = (timeSlot) => {
    if (!selectedDate) return false;

    const [hours, minutes] = timeSlot.split(':').map(Number);
    const slotDate = new Date(selectedDate);
    slotDate.setHours(hours, minutes, 0, 0);
    const slotStart = new Date(slotDate);
    const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000);

    if (slotEnd < new Date()) {
      return false;
    }

    return !reservations.some(reservation => {
      const resStart = new Date(reservation.reservationStartTime);
      const resEnd = new Date(reservation.reservationEndTime);

      return (
          (slotStart >= resStart && slotStart < resEnd) ||
          (slotEnd > resStart && slotEnd <= resEnd) ||
          (slotStart <= resStart && slotEnd >= resEnd)
      );
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    if (selectedDate) {
      const [hours, minutes] = time.split(':').map(Number);
      const localDate = new Date(selectedDate);
      localDate.setHours(hours, minutes, 0, 0);
      
      const year = localDate.getFullYear();
      const month = String(localDate.getMonth() + 1).padStart(2, '0');
      const day = String(localDate.getDate()).padStart(2, '0');
      const timeString = `${year}-${month}-${day}T${time}:00`;
      
      onTimeSelect(new Date(timeString));
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }


  return (
    <Box sx={{ p: 3, maxWidth: 500, margin: '0 auto' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          renderInput={(params) => (
            <Box sx={{ mb: 3 }} {...params} fullWidth />
          )}
        />
      </LocalizationProvider>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Available Time Slots
      </Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      
      <Grid container spacing={1} sx={{ mb: 3 }}>
        {TIME_SLOTS.map((time) => {
          const isAvailable = isTimeAvailable(time);
          const isSelected = selectedTime === time;
          
          return (
            <Grid item xs={4} key={time}>
              <Button
                fullWidth
                variant={isSelected ? 'contained' : 'outlined'}
                color={isSelected ? 'primary' : 'inherit'}
                disabled={!isAvailable}
                onClick={() => handleTimeSelect(time)}
                sx={{
                  py: 1.5,
                  borderRadius: 1,
                  textTransform: 'none',
                  '&.Mui-disabled': {
                    opacity: 0.5,
                  },
                }}
              >
                {time}
                {!isAvailable && <span style={{ position: 'absolute', right: 8 }}>✕</span>}
              </Button>
            </Grid>
          );
        })}
      </Grid>

    </Box>
  );
};

export default ReservationCalendar;
