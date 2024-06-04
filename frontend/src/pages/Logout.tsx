import {Box, Button, Typography} from '@mui/material';
import logo_light from "../assets/logo_light.png";

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
            <img src={logo_light} alt="Logo" style={{height: '300px', marginBottom: '20px'}}/>
            <Typography variant="h3" component="h3" sx={{marginBottom: 4}}>Du hast dich erfolgreich
                abgemeldet.</Typography>
            <Button variant="contained" color="secondary" onClick={handleLogin} sx={{marginBottom: 2}}>
                Login
            </Button>
        </Box>
    );
}