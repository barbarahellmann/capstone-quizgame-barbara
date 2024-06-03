import {Link} from 'react-router-dom';
import {Box, Drawer, List, ListItem, ListItemText, Typography} from '@mui/material';

interface NavigationProps {
    isDrawerOpen: boolean;
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export default function Navigation({isDrawerOpen, toggleDrawer}: NavigationProps) {
    return (
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
                    <ListItem component={Link} to="/">
                        <ListItemText primary="Startseite"/>
                    </ListItem>
                    <ListItem component={Link} to="/play">
                        <ListItemText primary="Zum Quiz"/>
                    </ListItem>
                    <ListItem component={Link} to="/admin">
                        <ListItemText primary="Admin"/>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}