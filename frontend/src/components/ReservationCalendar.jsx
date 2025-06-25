import React, { useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {  setHours, setMinutes } from 'date-fns';
import { Box, Button, Typography, Grid } from '@mui/material';

const TIME_SLOTS = [
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];

const ReservationCalendar = ({ onTimeSelect, onCancel }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedTime) {
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const selectedDateTime = setMinutes(setHours(selectedDate, hours), minutes);
      onTimeSelect(selectedDateTime);
    }
  };

  const isTimeAvailable = () => {
    // Add your availability logic here
    // For now, all times are available
    return true;
  };

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

      <Grid container spacing={1} sx={{ mb: 3 }}>
        {TIME_SLOTS.map((time) => {
          const isSelected = selectedTime === time;
          const isAvailable = isTimeAvailable(time);

          return (
            <Grid item xs={4} key={time}>
              <Button
                fullWidth
                variant={isSelected ? 'contained' : 'outlined'}
                color="primary"
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
              </Button>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          disabled={!selectedTime}
        >
          Select Time
        </Button>
      </Box>
    </Box>
  );
};

export default ReservationCalendar;
