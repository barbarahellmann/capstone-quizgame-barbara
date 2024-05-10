import {ChangeEvent, FormEvent, useState} from 'react';
import axios from "axios";
import {Question} from "../model/Question.ts";

export default function AddQuestion() {

    const [newQuestion, setNewQuestion] = useState<Question>({
        id: "",
        question: "",
        correctAnswer: "",
        wrongAnswer1: "",
        wrongAnswer2: "",
        wrongAnswer3: "",
        points: 0,
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const key = event.target.name
        setNewQuestion({...newQuestion, [key]: event.target.value})
    }


    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        axios.post("/api/quiz", {...newQuestion, id: "null"})
            .then(() => {
                setNewQuestion({
                    id: "",
                    question: "",
                    correctAnswer: "",
                    wrongAnswer1: "",
                    wrongAnswer2: "",
                    wrongAnswer3: "",
                    points: 0
                })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Question:
                <input
                    type="text"
                    name="question"
                    id="question"
                    value={newQuestion.question}
                    onChange={handleChange}
                />
            </label>

            <button>Submit</button>
        </form>
    )
}
