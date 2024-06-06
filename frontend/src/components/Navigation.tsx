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
                }} // Set the background color here and to the entire height
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <Typography variant="h5" component="h3" sx={{fontWeight: 'bold', marginBottom: 2, color: "#353B57"}}>
                    Navigation
                </Typography>
                <List>
                    <ListItem
                        component={Link}
                        to="/"
                        sx={{
                            '&:hover': {
                                backgroundColor: '#E0E0E0',
                                color: '#000000',
                            }
                        }}
                    >
                        <ListItemText primary="Startseite"/>
                    </ListItem>
                    <ListItem
                        component={Link}
                        to="/play"
                        sx={{
                            '&:hover': {
                                backgroundColor: '#E0E0E0',
                                color: '#000000',
                            }
                        }}
                    >
                        <ListItemText primary="Zum Quiz"/>
                    </ListItem>
                    {/* Divider */}
                    <Box sx={{borderTop: '1px solid #000000', marginTop: 2, marginBottom: 2}}></Box>
                    <ListItem
                        component={Link}
                        to="/admin"
                        sx={{
                            '&:hover': {
                                backgroundColor: '#E0E0E0', // Adjust the background color on hover
                                color: '#000000', // Adjust the text color on hover
                            }
                        }}
                    >
                        <ListItemIcon sx={{minWidth: '30px'}}><LockIcon/></ListItemIcon>
                        <ListItemText primary="Admin"/>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}