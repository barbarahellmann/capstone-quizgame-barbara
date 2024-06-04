import React, {useState} from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useLocation, useNavigate} from 'react-router-dom';
import Navigation from './Navigation';

export default function Header({user, setUser}: {
    user?: string,
    setUser: React.Dispatch<React.SetStateAction<string | undefined>>
}) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };

    const handleLogin = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        window.open(host + '/oauth2/authorization/github', '_self');
        alert("Du wirst angemeldet.");
    };

    const handleLogout = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        window.open(host + '/logout', '_self');
        alert("Du wirst abgemeldet.");
        setUser(undefined);
        navigate('/logout');
    };

    return (
        <>
            <AppBar position="static" sx={{bgcolor: '#4C5270'}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="h1" sx={{marginRight: 'auto', flexGrow: 1}}>
                        NerdQuiz
                    </Typography>
                    {location.pathname === "/" ? (
                        <Button variant="contained" color="secondary" onClick={handleLogin}>Login</Button>
                    ) : (
                        user && <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
                    )}
                </Toolbar>
            </AppBar>
            <Navigation isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}/>
        </>
    );
}