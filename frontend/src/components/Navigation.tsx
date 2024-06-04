import {Link} from 'react-router-dom';
import {Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography} from '@mui/material';
import React from "react";
import LockIcon from '@mui/icons-material/Lock';

interface NavigationProps {
    isDrawerOpen: boolean;
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export default function Navigation({isDrawerOpen, toggleDrawer}: NavigationProps) {
    return (
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
            <Box
                sx={{
                    width: 250,
                    height: '100%',
                    padding: 2,
                    bgcolor: '#FFFFFF'
                }} // Setze die Hintergrundfarbe hier und auf die gesamte Höhe
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <Typography variant="h5" component="h3" sx={{fontWeight: 'bold', marginBottom: 2, color: "#353B57"}}>
                    Navigation
                </Typography>
                <List>
                    <ListItem component={Link} to="/">
                        <ListItemText primary="Startseite"/>
                    </ListItem>
                    <ListItem component={Link} to="/play">
                        <ListItemText primary="Zum Quiz"/>
                    </ListItem>
                    <ListItem component={Link} to="/admin">
                        <ListItemIcon sx={{minWidth: '30px'}}><LockIcon/></ListItemIcon>
                        <ListItemText primary="Admin"/>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}