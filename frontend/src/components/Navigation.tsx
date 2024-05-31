import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const Navigation: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const location = useLocation();

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
        // Additional logic for handling logout if needed
    };

    return (
        <>
            <AppBar position="static" sx={{bgcolor: '#4C5270'}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="h1" sx={{marginRight: 'auto', flexGrow: 1}}>
                        NerdDuel
                    </Typography>
                    {location.pathname === "/" ? (
                        <Button variant="contained" color="secondary" onClick={handleLogin}>Login</Button>
                    ) : (
                        <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    sx={{width: 250}}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <Typography variant="h5" component="h3" sx={{fontWeight: 'bold', marginBottom: 2}}>
                        Navigation
                    </Typography>
                    <List>
                        <ListItem button component={Link} to="/">
                            <ListItemText primary="Startseite"/>
                        </ListItem>
                        <ListItem button component={Link} to="/play">
                            <ListItemText primary="Zum Quiz"/>
                        </ListItem>
                        <ListItem button component={Link} to="/admin">
                            <ListItemText primary="Admin"/>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Navigation;
