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
  useTheme
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
  const theme = useTheme();

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
          PaperProps={{
            sx: {
              borderRadius: 0,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(93, 64, 55, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              '& .MuiStepIcon-root.Mui-active': {
                color: theme.palette.primary.main,
              },
              '& .MuiStepIcon-root.Mui-completed': {
                color: theme.palette.primary.light,
              },
            }
          }}
      >
        <DialogTitle sx={{
          textAlign: 'center',
          pb: 1,
          borderBottom: '1px solid rgba(93, 64, 55, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}>
          <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                '& .MuiStepLabel-label': {
                  color: theme.palette.text.secondary,
                  '&.Mui-active, &.Mui-completed': {
                    color: theme.palette.primary.dark,
                  }
                }
              }}
          >
            {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
            ))}
          </Stepper>
        </DialogTitle>

        <DialogContent sx={{
          py: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}>
          {activeStep === 0 ? (
              <ReservationCalendar
                  tableNumber={tableNumber}
                  onTimeSelect={handleTimeSelect}
                  onCancel={onCancel}
              />
          ) : (
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography
                    variant="h5"
                    sx={{
                      color: 'primary.dark',
                      fontFamily: '"Playfair Display", serif',
                      mb: 3,
                      position: 'relative',
                      '&:after': {
                        content: '""',
                        display: 'block',
                        width: '60px',
                        height: '2px',
                        background: theme.palette.primary.main,
                        margin: '12px auto 0',
                      }
                    }}
                >
                  Confirm Your Reservation
                </Typography>
                <Box sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  p: 3,
                  borderRadius: 1,
                  border: '1px solid rgba(93, 64, 55, 0.1)',
                  mb: 3
                }}>
                  <Typography variant="body1" sx={{
                    color: 'text.primary',
                    mb: 2,
                    fontSize: '1.1rem',
                    '& strong': {
                      color: 'primary.dark',
                      mr: 1
                    }
                  }}>
                    <strong>Table:</strong> {tableNumber}
                  </Typography>
                  <Typography variant="body1" sx={{
                    color: 'text.primary',
                    mb: 2,
                    fontSize: '1.1rem',
                    '& strong': {
                      color: 'primary.dark',
                      mr: 1
                    }
                  }}>
                    <strong>Date:</strong> {selectedDateTime?.toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" sx={{
                    color: 'text.primary',
                    fontSize: '1.1rem',
                    '& strong': {
                      color: 'primary.dark',
                      mr: 1
                    }
                  }}>
                    <strong>Time:</strong> {selectedDateTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Box>
              </Box>
          )}
        </DialogContent>

        <DialogActions sx={{
          p: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderTop: '1px solid rgba(93, 64, 55, 0.1)',
        }}>
          <Button
              variant="outlined"
              onClick={handleBack}
              disabled={isProcessing}
              sx={{
                color: 'primary.dark',
                borderColor: 'primary.dark',
                '&:hover': {
                  backgroundColor: 'rgba(93, 64, 55, 0.05)',
                  borderColor: 'primary.dark',
                }
              }}
          >
            {activeStep === 0 ? 'Cancel' : 'Back'}
          </Button>
          {activeStep === 1 && (
              <Button
                  variant="contained"
                  onClick={handleConfirm}
                  disabled={isProcessing || !selectedDateTime}
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '&.Mui-disabled': {
                      backgroundColor: 'rgba(93, 64, 55, 0.5)',
                      color: 'rgba(255, 255, 255, 0.7)'
                    }
                  }}
              >
                {isProcessing ? 'Processing...' : 'Confirm Reservation'}
              </Button>
          )}
        </DialogActions>
      </Dialog>
  );
};

export default ReservationConfirmation;