import {Alert, AlertTitle, Container} from "@mui/material";

const Error = ({message}) => {
    return (
        <Container maxWidth="sm" sx={{mt: 4}}>
            <Alert
                severity="error"
                sx={{
                    '& .MuiAlert-icon': {
                        color: 'error.main',
                        '& svg': {
                            width: '1.5rem',
                            height: '1.5rem',
                        },
                    },
                    '& .MuiAlert-message': {
                        color: '#b91c1c',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem',
                    },
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    '& svg': {
                        color: '#ef4444',
                    },
                }}
            >
                <AlertTitle>Error</AlertTitle>
                {message}
            </Alert>
        </Container>
    );
};

export default Error;