import {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Play from './pages/Play';
import Admin from './pages/Admin';
import PlayResult from './pages/PlayResult';
import Header from './components/Header';
import StartPage from './pages/StartPage';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import Logout from './pages/Logout';
import {Box} from '@mui/material';

export default function App() {
    const [user, setUser] = useState<string | undefined>();
    const navigate = useNavigate();

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
        <Box sx={{bgcolor: '#353B57', color: '#FFFFFF', minHeight: '100vh'}}>
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
    );
}
