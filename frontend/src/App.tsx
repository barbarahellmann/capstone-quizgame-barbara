import {useEffect, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import Play from "./pages/Play";
import Admin from "./pages/Admin";
import PlayResult from "./pages/PlayResult";
import Navigation from "./components/Navigation";
import StartPage from "./pages/StartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import {AppBar, Box, Container, Toolbar} from "@mui/material";


function App() {
    const [user, setUser] = useState<string | undefined>();
    const navigate = useNavigate();
    const location = useLocation();

    const loadUser = () => {
        axios.get('/api/auth/me')
            .then(response => {
                console.log(response.data);
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error loading user:', error);
            });
    };

    useEffect(() => {
        loadUser();
    }, []);

    const logout = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        window.open(host + '/logout', '_self');
        alert("Du wirst abgemeldet.");
        setUser(undefined);
        navigate('/');
    };

    return (
        <Container maxWidth="sm">

            <Box sx={{bgcolor: '#353B57', color: '#FFFFFF', minHeight: '100vh'}}>
                <AppBar position="static" sx={{bgcolor: '#4C5270'}}>
                    <Toolbar>

                        <Navigation user={user} setUser={setUser}/>
                    </Toolbar>
                </AppBar>
            <Routes>
                <Route path="/" element={<StartPage/>}/>
                <Route element={<ProtectedRoute user={user}/>}>
                    <Route path="/play" element={<Play/>}/>
                    <Route path="/result" element={<PlayResult/>}/>
                </Route>
                <Route element={<ProtectedAdminRoute user={162185130}/>}>
                    <Route path="/admin" element={<Admin/>}/>
                </Route>
            </Routes>
            </Box>
        </Container>
    );
}

export default App;
