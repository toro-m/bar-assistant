import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import CreateTableForm from "./CreateTableForm.jsx";

const AdminTableCard = ({ table, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const handleEditClick = () => setIsEditing(true);
    const handleCancelEdit = () => setIsEditing(false);

    if (isEditing) {
        return (
            <CreateTableForm
                initialData={{
                    tableNumber: table.tableNumber,
                    numOfSeats: table.numOfSeats
                }}
                onCancel={handleCancelEdit}
            />
        );
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(255, 248, 240, 0.9)',
                backdropFilter: 'blur(5px)',
                borderRadius: 1,
                border: '1px solid rgba(93, 64, 55, 0.3)',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.15)'
                }
            }}
        >
            <Box sx={{ flexGrow: 1 }}>
                <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                        color: 'primary.dark',
                        fontFamily: 'inherit',
                        fontWeight: 600,
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    Table {table.tableNumber}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 3
                    }}
                >
                    Seats: {table.numOfSeats}
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                gap: 2,
                '& > *': {
                    flex: 1
                }
            }}>
                <Button
                    variant="outlined"
                    onClick={handleEditClick}
                    sx={{
                        color: 'primary.dark',
                        borderColor: 'primary.dark',
                        '&:hover': {
                            backgroundColor: 'rgba(93, 64, 55, 0.05)',
                            borderColor: 'primary.dark',
                        }
                    }}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    onClick={() => onDelete(table.tableNumber)}
                    sx={{
                        backgroundColor: '#8B4513',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#6B2D00',
                        }
                    }}
                >
                    Delete
                </Button>
            </Box>
        </Paper>
    );
};

export default AdminTableCard;