import {Box, Button, Typography} from '@mui/material';
import LogoWOTitel_Content from "../assets/LogoWOTitel_Content.png";

export default function Logout() {
    const handleLogin = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        window.open(host + '/oauth2/authorization/github', '_self');
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: "background",
            color: "white"
        }}>
            <img src={LogoWOTitel_Content} alt="Logo" style={{height: '300px', marginBottom: '20px'}}/>
            <Typography variant="h4" component="h4" sx={{marginBottom: 4, textAlign: 'center'}}>Du hast dich erfolgreich
                abgemeldet.</Typography>
            <Button variant="contained" color="secondary" onClick={handleLogin} sx={{marginBottom: 2}}>
                Login
            </Button>
        </Box>
    );
}