import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  CircularProgress
} from '@mui/material';
import ReservationCalendar from './ReservationCalendar';

const ReservationConfirmation = ({
  isOpen,
  tableNumber,
  onConfirm,
  onCancel,
  isProcessing = false,
}) => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const handleTimeSelect = (dateTime) => {
    setSelectedDateTime(dateTime);
    setActiveStep(1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      onCancel();
    } else {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleConfirm = () => {
    if (selectedDateTime) {
      onConfirm(selectedDateTime);
    } else {
      console.error('No date/time selected');
    }
  };

  const steps = ['Select Date & Time', 'Confirm Reservation'];

  return (
    <Dialog
      open={isOpen}
      onClose={!isProcessing ? onCancel : undefined}
      maxWidth="md"
      fullWidth
      disableEscapeKeyDown={isProcessing}
    >
      <DialogTitle>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>
      
      <DialogContent>
        {activeStep === 0 ? (
          <ReservationCalendar
            tableNumber={tableNumber}
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
              Date: {selectedDateTime?.toLocaleDateString()}
            </Typography>
            <Typography variant="body1" paragraph>
              Time: {selectedDateTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={handleBack}
          disabled={isProcessing}
          color="inherit"
        >
          {activeStep === 0 ? 'Cancel' : 'Back'}
        </Button>
        
        {activeStep === 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            disabled={isProcessing || !selectedDateTime}
            startIcon={isProcessing ? <CircularProgress size={20} /> : null}
          >
            {isProcessing ? 'Processing...' : 'Confirm Reservation'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ReservationConfirmation;