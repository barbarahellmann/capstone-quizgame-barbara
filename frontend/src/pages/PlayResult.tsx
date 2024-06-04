import {useLocation, useNavigate} from 'react-router-dom';
import {Box, Button, Modal, Typography} from '@mui/material';
import React, {useState} from "react";

export default function PlayResult({user}: { user?: string }) {
    const location = useLocation();
    const {correctCount} = location.state || {correctCount: 0};
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleLogin = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        setModalMessage("Du wirst angemeldet.");
        setModalOpen(true);
        setTimeout(() => {
            window.open(host + '/oauth2/authorization/github', '_self');
        }, 1000);
    };

    // Nach dem ersten Durchlauf beim Quiz muss man sich einloggen, Button Text wird im Frontend angepasst
    const handlePlayAgain = () => {
        if (user !== "anonymousUser") {
            navigate('/play');
        } else {
            handleLogin();
        }
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
            <Button variant="contained" color="secondary" onClick={handlePlayAgain} sx={{marginBottom: 2}}>
                {user === "anonymousUser" ? 'Einloggen' : 'Quiz neu starten'}
            </Button>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Hinweis
                    </Typography>
                    <Typography id="modal-description" sx={{mt: 2}}>
                        {modalMessage}
                    </Typography>
        </Box>
    );
}