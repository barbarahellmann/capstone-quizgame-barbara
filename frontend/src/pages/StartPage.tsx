import {Link} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";
import logo from '../assets/logo.png'; //

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
            <img src={logo} alt="Logo" style={{height: '100px', marginBottom: '20px'}}/>
            <Typography variant="h1" component="h1" sx={{color: '#FFFFFF', marginBottom: 4}}>NerdDuel</Typography>
            <Button variant="contained" color="secondary" component={Link} to="/play" sx={{marginBottom: 2}}>
                Quiz starten
            </Button>
        </Box>
    );
}