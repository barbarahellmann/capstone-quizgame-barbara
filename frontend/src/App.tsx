import {Question} from "./model/Question.ts";
import QuestionCard from "./components/QuestionCard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";


function App() {

    // Daten werden vom Server geladen
    const [question, setQuestion] = useState<Question[]>()


    // Daten werden aktualisiert
    function fetchQuestions() {
        axios.get("/api/quiz")
            .then(response => {
                setQuestion(response.data)
            })
    }

    useEffect(fetchQuestions, [])

    //Solange Daten nicht geladen sind, zeige lade
    if (!question) {
        return "Lade..."
    }

  return (
      <>
          <h1>NerdDuell</h1>
          {
              question.map(question => <QuestionCard question={question} key={question.id}/>)
          }
      </>
  )
}

export default App
