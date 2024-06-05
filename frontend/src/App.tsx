import {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import axios from 'axios';
import {Box, CssBaseline} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Play from './pages/Play';
import Admin from './pages/Admin';
import PlayResult from './pages/PlayResult';
import Header from './components/Header';
import StartPage from './pages/StartPage';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import Logout from './pages/Logout';

const theme = createTheme({
    palette: {
        background: {
            default: '#353B57',
        },
        text: {
            primary: '#FFFFFF',
            secondary: "#9c27b0",
        },
    },
});

export default function App() {
    const [user, setUser] = useState<string | undefined>();

    const loadUser = () => {
        axios.get('/api/auth/me')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error loading user:', error);
            });
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box sx={{minHeight: '100vh'}}>
                <Header user={user} setUser={setUser}/>
                <Routes>
                    <Route path="/" element={<StartPage/>}/>
                    <Route path="/start" element={<StartPage/>}/>
                    <Route path="/play" element={<Play/>}/>
                    <Route path="/result" element={<PlayResult user={user}/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route element={<ProtectedAdminRoute user={user}/>}>
                        <Route path="/admin" element={<Admin/>}/>
                    </Route>
                </Routes>
            </Box>
        </ThemeProvider>
    );
}