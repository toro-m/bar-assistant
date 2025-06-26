import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Paper } from '@mui/material';

const StyledTableCard = styled(Paper)(({ theme }) => ({
  borderRadius: 8,
  padding: theme.spacing(3),
  textAlign: 'center',
  boxShadow: theme.shadows[1],
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  border: '2px solid',
  borderColor: theme.palette.primary.main,
  backgroundColor: theme.palette.common.white,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[3],
  },
  '&.available': {
    borderColor: theme.palette.primary.main,
  },
  '&.reserved': {
    borderColor: theme.palette.error.main,
    opacity: 0.9,
  },
}));

const TableCard = ({ table, onReserve }) => {
    return (
        <StyledTableCard className="available" elevation={3}>
            <Box>
                <Typography variant="h6" component="h3" gutterBottom>
                    Table {table.tableNumber}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    Seats: {table.numOfSeats}
                </Typography>
            </Box>
            <Button
                variant="contained"
                color="primary"
                onClick={() => onReserve()}
                sx={{
                    mt: 2,
                    textTransform: 'none',
                    fontWeight: 500,
                }}
            >
                Reserve
            </Button>
        </StyledTableCard>
    );
};

export default TableCard;