import {ChangeEvent, FormEvent, useState} from 'react';
import axios from "axios";
import {Question} from "../model/Question.ts";

export default function AddQuestion() {

    // Definition welche Informationen in newQuestion gespeichert werden
    const [newQuestion, setNewQuestion] = useState<Question>({
        id: "",
        question: "",
        correctAnswer: "",
        wrongAnswer1: "",
        wrongAnswer2: "",
        wrongAnswer3: "",
        isCorrect: false,
    });

    // Speichert bei jeder Zeicheneingabe die Information in setNewQuestion
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const key = event.target.name
        setNewQuestion({...newQuestion, [key]: event.target.value})
    }

    // Sendet die Daten mit post an das Backend
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post("/api/quiz", {...newQuestion, id: "null"})
            .then(() => {
                setNewQuestion({
                    id: "",
                    question: "",
                    correctAnswer: "",
                    wrongAnswer1: "",
                    wrongAnswer2: "",
                    wrongAnswer3: "",
                    isCorrect: false,
                })
                alert("Frage wurde hinzugefügt.")
            })
            .catch((error) => {
                console.log(error.message);
            })
    }


    return (
        <>
            <h3>Frage hinzufügen:</h3>
            <br/>
            <br/>
            <form onSubmit={handleSubmit}>
                <label> Frage: <input type="text" name="question" id="question" value={newQuestion.question}
                                      onChange={handleChange}/>
                </label>
                <br/>
                <label> Richtige Antwort: <input type="text" name="correctAnswer" id="correctAnswer"
                                                 value={newQuestion.correctAnswer}
                                                 onChange={handleChange}/>
                </label>
                <br/>
                <label> Falsche Antwort 1: <input type="text" name="wrongAnswer1" id="wrongAnswer1"
                                                  value={newQuestion.wrongAnswer1}
                                                  onChange={handleChange}/>
                </label>
                <br/>
                <label> Falsche Antwort 2: <input type="text" name="wrongAnswer2" id="wrongAnswer2"
                                                  value={newQuestion.wrongAnswer2}
                                                  onChange={handleChange}/>
                </label>
                <br/>
                <label> Falsche Antwort 3: <input type="text" name="wrongAnswer3" id="wrongAnswer3"
                                                  value={newQuestion.wrongAnswer3}
                                                  onChange={handleChange}/>
                </label>
                <br/>
                <button>Submit</button>
            </form>

        </>
    )
}
