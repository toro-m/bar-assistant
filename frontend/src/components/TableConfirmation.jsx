import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
import ReservationCalendar from './ReservationCalendar';

const TableConfirmation = ({
  isOpen,
  tableNumber,
  onConfirm,
  onCancel,
  isProcessing = false
}) => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [showCalendar, setShowCalendar] = useState(true);

  const handleTimeSelect = (dateTime) => {
    setSelectedDateTime(dateTime);
    setShowCalendar(false);
  };

  const handleBackToCalendar = () => {
    setShowCalendar(true);
  };

  const handleConfirmReservation = () => {
    onConfirm(selectedDateTime);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Reserve Table {tableNumber}</DialogTitle>
      <DialogContent>
        {showCalendar ? (
          <ReservationCalendar
            onTimeSelect={handleTimeSelect}
            onCancel={onCancel}
          />
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Confirm Your Reservation
            </Typography>
            <Typography variant="body1" paragraph>
              Table: {tableNumber}
            </Typography>
            <Typography variant="body1" paragraph>
              Date & Time: {selectedDateTime?.toLocaleString()}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
              <Button
                variant="outlined"
                onClick={handleBackToCalendar}
                disabled={isProcessing}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmReservation}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Confirm Reservation'}
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
      {!showCalendar && (
        <DialogActions>
          <Button onClick={onCancel} disabled={isProcessing}>
            Cancel
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default TableConfirmation;