import React from 'react';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const LoginError = ({ error, onClose }) => {
    if (!error) return null;

    return (
        <Collapse in={!!error} sx={{ width: '100%', mb: 2 }}>
            <Alert
                severity="error"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={onClose}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                {error}
            </Alert>
        </Collapse>
    );
};

export default LoginError;