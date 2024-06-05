import {Box, Button, Fade, Typography} from '@mui/material';
import {useLocation, useNavigate} from 'react-router-dom';

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
            <Fade in={true} timeout={1000}>
                <Typography variant="h2" component="h2" sx={{
                    color: '#FFFFFF',
                    marginBottom: 4
                }}>Ergebnis</Typography>
            </Fade>
            <Fade in={true} timeout={1500}>
                <Typography variant="body1" sx={{
                    textAlign: 'center',
                }}>
                    Du hast {correctCount} von 5 Fragen richtig beantwortet.
                </Typography>
            </Fade>
            {user === "anonymousUser" ? (
                <Fade in={true} timeout={2000}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 6
                    }}>
                        <Typography variant="body1" sx={{textAlign: 'center'}}>
                            Logge dich ein, wenn du noch einmal spielen möchtest.
                        </Typography>
                        <Button variant="contained" color="secondary" sx={{marginTop: 2}} onClick={handleLogin}>
                            Login
                        </Button>
                    </Box>
                </Fade>
            ) : (
                user &&
                <Fade in={true} timeout={2000}>
                    <Button variant="contained" color="secondary" sx={{
                        marginTop: 4
                    }} onClick={handleStartNewQuiz}>
                        Neues Quiz starten
                    </Button>
                </Fade>
            )}
        </Box>
    );
}
