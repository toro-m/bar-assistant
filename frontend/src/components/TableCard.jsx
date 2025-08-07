import React from 'react';
import { Box, Button, Typography, Paper, useTheme } from '@mui/material';

const TableCard = ({ table, onReserve }) => {
    const theme = useTheme();

    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 0,
                border: '1px solid',
                borderColor: 'rgba(93, 64, 55, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(5px)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: theme.palette.primary.main,
                },
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
                }
            }}
        >
            <Box>
                <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                        color: 'primary.dark',
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 600,
                        mb: 1
                    }}
                >
                    Table {table.tableNumber}
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: 'text.secondary',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1
                    }}
                >
                    <span>Seats: {table.numOfSeats}</span>
                </Typography>
            </Box>
            <Button
                variant="contained"
                onClick={onReserve}
                fullWidth
                sx={{
                    mt: 2,
                    py: 1,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRadius: 0,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }
                }}
            >
                Reserve Now
            </Button>
        </Paper>
    );
};

export default TableCard;