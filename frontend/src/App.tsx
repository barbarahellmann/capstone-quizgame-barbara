import Play from "./pages/Play.tsx";
import Admin from "./pages/Admin.tsx";
import {Route, Routes} from "react-router-dom";
import PlayResult from "./pages/PlayResult.tsx";
import Navigation from "./components/Navigation.tsx";
import StartPage from "./pages/StartPage.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import ProtectedRoute from "./components/ProtectedRoute.tsx";


function App() {

    // Login
    const [user, setUser] = useState<string>()

    const loadUser = () => {
        axios.get('/api/auth/me')
            .then(response => {
                console.log(response.data)
                setUser(response.data)
            })
    }

    // User bleibt eingeloggt
    useEffect(() => {
        loadUser()
    }, [])



    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin // checkt, wo wir uns gerade befinden

        window.open(host + '/oauth2/authorization/github', '_self')
    }

    //Ausloggen
    function logout() {
        axios.post("/api/users/logout")
            .then(() => loadUser())
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
                  <Route path="/admin" element={<Admin/>}/>
                  <Route path="/play" element={<Play/>}/>
                  <Route path="/result/:questionnumber" element={<PlayResult/>}/>
              </Route>
          </Routes>
          <br/>
          <br/>
          <br/>
          <Navigation/>
      </>
  )
}

export default App
