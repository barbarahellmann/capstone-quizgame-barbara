import {useEffect, useState} from 'react';
import {Question} from "../model/Question.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export default function Play() {

    const [questions, setQuestions] = useState<Question[]>();
    const [index, setIndex] = useState<number>(0);
    const nav = useNavigate();


    function fetchQuestion() {
        axios.get("/api/quiz/play")
            .then(response => {
                setQuestions(response.data)
            })
    }

    useEffect(fetchQuestion, [])

    function onClickCorrectAnswer() {

    }

    function onClickWrongAnswer() {
        if (index <= 3) {
            setIndex(index + 1)
        } else {
            nav("/result")
        }
    }



    //Solange Daten nicht geladen sind, zeige lade
    if (!questions) {
        return "Lade..."
    }

    console.log(questions)

    return (
        <>
            <div>
                <h2>{questions[index].question}</h2>
                <br/>
                <button className={"correctButton"}
                        onClick={onClickCorrectAnswer}>{questions[index].correctAnswer}</button>
                <button onClick={onClickWrongAnswer}>{questions[index].wrongAnswer1}</button>
                <br/>
                <button onClick={onClickWrongAnswer}>{questions[index].wrongAnswer2}</button>
                <button onClick={onClickWrongAnswer}>{questions[index].wrongAnswer3}</button>
            </div>
        </>
    )
}