import {useLocation} from "react-router-dom";
import {Box, Button, Typography} from '@mui/material';

export default function PlayResult() {
    const location = useLocation();
    const {correctCount} = location.state || {correctCount: 0};

    return (
        <Box sx={{
            padding: 2,
            bgcolor: '#353B57',
            color: '#FFFFFF',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography variant="h1" component="h1">Ergebnisse</Typography>
            <Typography variant="body1" sx={{marginBottom: 4}}>Du hast {correctCount} von 5 Fragen richtig
                beantwortet.</Typography>
            <Button onClick={() => window.location.reload()} variant="contained"
                    sx={{bgcolor: '#36EEE0', color: '#FFFFFF'}}>
                Quiz neu starten
            </Button>
        </Box>
    );
}