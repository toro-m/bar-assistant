import {Box, CircularProgress} from "@mui/material";
import React from "react";

const Loading= () => {
    return (
        <Box className="loading-container">
            <CircularProgress
                size={48}
                thickness={4}
                sx={{
                    color: '#3b82f6',
                    '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                    },
                }}
            />
        </Box>
    )
}

export default Loading;