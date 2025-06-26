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
  styled,
  keyframes
} from '@mui/material';
import ReservationCalendar from './ReservationCalendar';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const StyledDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    width: '100%',
    maxWidth: '28rem',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(10px)',
    transition: 'transform 0.3s ease',
    '&.MuiDialog-paperActive': {
      transform: 'translateY(0)',
    },
  },
}));

const StyledDialogTitle = styled(DialogTitle)({
  paddingBottom: '0.5rem',
});

const StyledDialogContent = styled(DialogContent)({
  padding: '1.5rem',
  '&.MuiDialogContent-root': {
    padding: '1.5rem',
  },
});

const StyledDialogActions = styled(DialogActions)({
  padding: '0 1.5rem 1.5rem',
  justifyContent: 'flex-end',
  gap: '0.75rem',
});

const StyledButton = styled(Button)({
  padding: '0.5rem 1rem',
  borderRadius: '0.375rem',
  fontWeight: 500,
  textTransform: 'none',
  '&.MuiButton-contained': {
    backgroundColor: '#3b82f6',
    '&:hover': {
      backgroundColor: '#2563eb',
    },
  },
  '&.MuiButton-outlined': {
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
    borderColor: '#e5e7eb',
    '&:hover': {
      backgroundColor: '#e5e7eb',
    },
  },
});

const LoadingSpinner = styled('span')({
  display: 'inline-block',
  width: '1rem',
  height: '1rem',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '50%',
  borderTopColor: 'white',
  animation: `${spin} 1s ease-in-out infinite`,
  marginRight: '0.5rem',
});

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
    <StyledDialog
      open={isOpen}
      onClose={!isProcessing ? onCancel : undefined}
      maxWidth="md"
      fullWidth
      disableEscapeKeyDown={isProcessing}
      PaperProps={{
        className: isOpen ? 'MuiDialog-paperActive' : '',
      }}
    >
      <StyledDialogTitle>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </StyledDialogTitle>
      
      <StyledDialogContent>
        {activeStep === 0 ? (
          <ReservationCalendar
            tableNumber={tableNumber}
            onTimeSelect={handleTimeSelect}
            onCancel={onCancel}
          />
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom sx={{ 
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#1f2937',
              mb: 2
            }}>
              Confirm Your Reservation
            </Typography>
            <Typography variant="body1" sx={{ color: '#4b5563', mb: 2 }}>
              Table: {tableNumber}
            </Typography>
            <Typography variant="body1" sx={{ color: '#4b5563', mb: 2 }}>
              Date: {selectedDateTime?.toLocaleDateString()}
            </Typography>
            <Typography variant="body1" sx={{ color: '#4b5563', mb: 2 }}>
              Time: {selectedDateTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Typography>
          </Box>
        )}
      </StyledDialogContent>

      <StyledDialogActions>
        <StyledButton
          variant="outlined"
          onClick={handleBack}
          disabled={isProcessing}
        >
          {activeStep === 0 ? 'Cancel' : 'Back'}
        </StyledButton>
        {activeStep === 1 && (
          <StyledButton
            variant="contained"
            onClick={handleConfirm}
            disabled={isProcessing || !selectedDateTime}
          >
            {isProcessing ? (
              <>
                <LoadingSpinner />
                Processing...
              </>
            ) : (
              'Confirm Reservation'
            )}
          </StyledButton>
        )}
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default ReservationConfirmation;