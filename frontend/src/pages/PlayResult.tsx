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
            <Typography variant="h1" component="h1" sx={{color: '#FFFFFF', marginBottom: 4}}>Ergebnisse</Typography>
            <Typography variant="body1" sx={{color: '#FFFFFF', marginBottom: 4}}>
                Du hast {correctCount} von 5 Fragen richtig beantwortet.
            </Typography>
            {user === "anonymousUser" ? (
                <div>
                    <p>Logge dich ein, wenn du noch einmal Spielen möchtest.</p>
                    <Button variant="contained" color="secondary" onClick={handleLogin}
                    >Login</Button>
                </div>
            ) : (
                user && <Button variant="contained" color="secondary" onClick={handleStartNewQuiz}
                >Neues Quiz starten</Button>

            )}
        </Box>
    );
}