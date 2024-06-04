import React, {useState} from 'react';
import {AppBar, Avatar, Box, Button, IconButton, Modal, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from 'react-router-dom';
import Navigation from './Navigation';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import logo1WOName from "../assets/logo1WOName.png";


export default function Header({user, setUser}: {
    user?: string,
    setUser: React.Dispatch<React.SetStateAction<string | undefined>>
}) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };

    const handleLogin = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        setModalMessage("Du wirst angemeldet.");
        setModalOpen(true);
        setTimeout(() => {
            window.open(host + '/oauth2/authorization/github', '_self');
        }, 1000);
    };

    const handleLogout = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        setModalMessage("Du wirst abgemeldet.");
        setModalOpen(true);
        setTimeout(() => {
            window.open(host + '/logout', '_self');
            setUser(undefined);
            navigate('/logout');
        }, 1000);
    };

    return (
        <>
            <AppBar position="static" sx={{bgcolor: '#4C5270'}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon/>
                    </IconButton>
                    <Avatar src={logo1WOName} alt="Logo" sx={{marginRight: 2}}/>
                    <Typography variant="h6" component="h1" sx={{marginRight: 'auto', flexGrow: 1}}>
                        NerdQuiz
                    </Typography>
                    {user === "anonymousUser" ? (
                        <Button variant="contained" color="secondary" onClick={handleLogin}
                                endIcon={<LoginIcon/>}>Login</Button>
                    ) : (
                        user && <Button variant="contained" color="secondary" onClick={handleLogout}
                                        startIcon={<LogoutIcon/>}>Logout</Button>
                    )}
                </Toolbar>
            </AppBar>
            <Navigation isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}/>
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
            </Modal>
        </>
    );
}