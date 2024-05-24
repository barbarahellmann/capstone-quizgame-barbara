import Play from "./pages/Play.tsx";
import Admin from "./pages/Admin.tsx";
import {Route, Routes} from "react-router-dom";
import PlayResult from "./pages/PlayResult.tsx";
import Navigation from "./components/Navigation.tsx";
import StartPage from "./pages/StartPage.tsx";
import axios from "axios";


function App() {
    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin // checkt wo wir uns gerade befinden

        window.open(host + '/oauth2/authorization/github', '_self')
    }

    const loadUser = () => {
        axios.get('/api/auth/me')
            .then(response => {
                console.log(response.data)
            })
    }


  return (
      <>
          <button onClick={login}>Login</button>
          <button onClick={loadUser}>Me</button>

          <h1>NerdDuell</h1>
          <p>Das ist ein Test</p>
          <br/>
          <br/>
          <Routes>
              <Route path="/" element={<StartPage/>}/>
              <Route path="/play" element={<Play/>}/>
              <Route path="/admin" element={<Admin/>}/>
              <Route path="/result/:questionnumber" element={<PlayResult/>}/>
          </Routes>
          <br/>
          <br/>
          <br/>
          <Navigation/>
      </>
  )
}

export default App
