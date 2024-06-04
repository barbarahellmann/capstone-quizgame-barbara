import {Link} from "react-router-dom";
import {Box, Button} from "@mui/material";
import logo_dark from "../assets/logo_dark.png";

export default function StartPage() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            bgcolor: '#353B57'
        }}>
            <img src={logo_dark} alt="Logo" style={{height: '300px', marginBottom: '20px'}}/>
            <p>Tauche ein in die Welt des NerdQuiz! Teste dein Wissen in einem spannenden Quiz voller nerdiger Fragen
                und zeige, dass du der ultimative Nerd bist! Bereit für die Herausforderung?</p>
            <Button variant="contained" color="secondary"
                    component={Link} to="/play" sx={{marginBottom: 2}}>
                Quiz starten
            </Button>
        </Box>
    );
}