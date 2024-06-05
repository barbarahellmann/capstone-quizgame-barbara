import {Link} from "react-router-dom";
import {Box, Button, keyframes, Typography} from "@mui/material";
import LogoTitel_Content from "../assets/LogoTitel_Content.png";

export default function StartPage() {
    const blink = keyframes`
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    `;

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>
            <img src={LogoTitel_Content} alt="Logo" style={{height: '300px', marginTop: 4}}/>
            <Typography variant="body1" sx={{textAlign: 'center'}}>
                Tauche ein in die Welt des NerdQuiz!
            </Typography>
            <Typography variant="body1" sx={{textAlign: 'center'}}>
                Teste dein Wissen in einem spannenden Quiz voller nerdiger Fragen
                und zeige, dass du der ultimative Nerd bist! Bereit für die Herausforderung?
            </Typography>
            <Button variant="contained" color="secondary"
                    component={Link} to="/play" sx={{
                marginTop: 6,
                marginBottom: 2,
                animation: `${blink} 5s infinite`
            }}>
                Quiz starten
            </Button>
        </Box>
    );
}