import Play from "./pages/Play.tsx";
import Admin from "./pages/Admin.tsx";
import {Route, Routes} from "react-router-dom";
import PlayResult from "./pages/PlayResult.tsx";
import Navigation from "./components/Navigation.tsx";
import StartPage from "./pages/StartPage.tsx";


function App() {


  return (
      <>
          <h1>NerdDuell</h1>
          <br/>
          <br/>
          <Routes>
              <Route path="/start" element={<StartPage/>}/>
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
