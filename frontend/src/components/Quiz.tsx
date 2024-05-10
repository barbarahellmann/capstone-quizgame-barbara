import {useEffect, useState} from 'react';
import {Question} from "../model/Question.ts";
import axios from "axios";


export default function Quiz() {

    // Daten werden vom Server geladen
    const [questions, setQuestions] = useState<Question[]>()
    const [question, setQuestion] = useState<Question>()

    function fetchQuestion() {
        axios.get("/api/quiz")
            .then(response => {
                const apiQuestions: Question[] = response.data
                const randomQuestionIndex = Math.floor((apiQuestions.length - 1) * Math.random())
                const nextQuestion = apiQuestions[randomQuestionIndex]

                setQuestions(apiQuestions.filter(question => question.id !== nextQuestion.id))
                setQuestion(nextQuestion)
            })
    }

    useEffect(fetchQuestion, [])

    //Solange Daten nicht geladen sind, zeige lade
    if (!questions) {
        return "Lade..."
    }

    if (!question) {
        return null
    }

    console.log(questions)


    return (
        <>
            <h2>{question.question}</h2>
            <button>{question.correctAnswer}</button>
            <button>{question.wrongAnswer1}</button>
            <button>{question.wrongAnswer2}</button>
            <button>{question.wrongAnswer3}</button>

        </>
    )
}

