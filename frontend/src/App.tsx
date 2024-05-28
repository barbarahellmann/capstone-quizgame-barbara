import Play from "./pages/Play.tsx";
import Admin from "./pages/Admin.tsx";
import {Route, Routes} from "react-router-dom";
import PlayResult from "./pages/PlayResult.tsx";
import Navigation from "./components/Navigation.tsx";
import StartPage from "./pages/StartPage.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute.tsx";

function App() {

    // Login
    const [user, setUser] = useState<string | undefined>();

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

    // User bleibt eingeloggt
    useEffect(() => {
        loadUser()
    }, [])



    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin // checkt, wo wir uns gerade befinden

        window.open(host + '/oauth2/authorization/github', '_self')
        alert("Du wirst angemeldet.")
    }

    //Ausloggen
    function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin

        window.open(host + '/logout', '_self')
        alert("Du wirst abgemeldet.")
    }


    return (
        <>
            <button onClick={login}>Login</button>
            <button onClick={loadUser}>Me</button>
            <button onClick={logout}>Logout</button>
            <p>{user}</p>

            <h1>NerdDuell</h1>
            <br/>
            <br/>
            <Routes>
                <Route path="/" element={<StartPage/>}/>
                <Route element={<ProtectedRoute user={user}/>}>
                    <Route path="/play" element={<Play/>}/>
                    <Route path="/result" element={<PlayResult/>}/>
                </Route>
                <Route element={<ProtectedAdminRoute user={user}/>}>
                    <Route path="/admin" element={<Admin/>}/>
                </Route>
            </Routes>
            <br/>
            <br/>
            <br/>
            <Navigation/>
        </>
    );
}

export default App
