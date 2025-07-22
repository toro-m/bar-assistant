import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const CreateTableForm = () => {
    const [formData, setFormData] = useState({
        tableNumber: '',
        numOfSeats: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/tables', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    tableNumber: Number(formData.tableNumber),
                    numOfSeats: Number(formData.numOfSeats)
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to create table');
            }

            setFormData({
                tableNumber: '',
                numOfSeats: ''
            });

            window.location.reload();

        } catch (err) {
            setError(err.message || 'An error occurred while creating the table');
            console.error('Error creating table:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>Create New Table</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="tableNumber"
                    label="Table Number"
                    name="tableNumber"
                    type="number"
                    value={formData.tableNumber}
                    onChange={handleChange}
                    inputProps={{ min: 1 }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="numOfSeats"
                    label="Number of Seats"
                    name="numOfSeats"
                    type="number"
                    value={formData.numOfSeats}
                    onChange={handleChange}
                    inputProps={{ min: 1 }}
                />
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Creating...' : 'Create Table'}
                </Button>
            </Box>
        </Paper>
    );
};

export default CreateTableForm;