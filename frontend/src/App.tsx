import Quiz from "./components/Quiz.tsx";
import AddQuestion from "./components/AddQuestion.tsx";


function App() {


  return (
      <>
          <h1>NerdDuell</h1>
          <Quiz/>
          <br/>
          <br/>
          <h2>Frage hinzufügen:</h2>
          <AddQuestion/>
      </>
  )
}

export default App
