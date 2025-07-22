import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const CreateTableForm = ({ initialData, onCancel }) => {
    const [formData, setFormData] = useState(initialData || {
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
            const url = initialData
                ? `/api/tables/${initialData.tableNumber}`
                : '/api/tables';

            const method = initialData ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
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
                throw new Error(errorText || 'Failed to save table');
            }

            if (!initialData) {
                setFormData({
                    tableNumber: '',
                    numOfSeats: ''
                });
            }

            window.location.reload();

        } catch (err) {
            setError(err.message || 'An error occurred while saving the table');
            console.error('Error saving table:', err);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                {initialData ? 'Edit Table' : 'Create New Table'}
            </Typography>
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
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                    {onCancel && (
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={onCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Create Table'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default CreateTableForm;