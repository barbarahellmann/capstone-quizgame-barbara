import {useLocation, useNavigate} from 'react-router-dom';
import {Box, Button, Typography} from '@mui/material';


export default function PlayResult({user}: { user?: string }) {
    const location = useLocation();
    const {correctCount} = location.state || {correctCount: 0};
    const navigate = useNavigate();

    const handleLogin = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        setTimeout(() => {
            window.open(host + '/oauth2/authorization/github', '_self');
        }, 1000);
    };

    const handleStartNewQuiz = () => {
        navigate('/play');
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>
            <Typography variant="h2" component="h2" sx={{color: '#FFFFFF', marginBottom: 4}}>Ergebnis</Typography>
            <Typography variant="body1" sx={{textAlign: 'center'}}>
                Du hast {correctCount} von 5 Fragen richtig beantwortet.
            </Typography>
            {user === "anonymousUser" ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 6,
                }}>
                    <Typography variant="body1" sx={{textAlign: 'center'}}>Logge dich ein, wenn du noch einmal spielen
                        möchtest.</Typography>
                    <Button variant="contained" color="secondary" sx={{marginTop: 2}} onClick={handleLogin}>
                        Login
                    </Button>
                </Box>
            ) : (
                user && <Button variant="contained" color="secondary" sx={{marginTop: 4}} onClick={handleStartNewQuiz}>
                    Neues Quiz starten
                </Button>
            )}
        </Box>
    );
}