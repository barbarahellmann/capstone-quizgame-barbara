import AddQuestion from "../components/AddQuestion.tsx";
import QuestionCard from "../components/ChangeQuestion.tsx";
import {useEffect, useState} from "react";
import {Question} from "../model/Question.ts";
import axios from "axios";

export default function Admin() {

    const [questionList, setQuestionList] = useState<Question[]>([]);


    function fetchQuestion() {
        axios.get("/api/quiz")
            .then((response) => {
                setQuestionList(response.data)
            })
    }

    useEffect(() => {
        fetchQuestion()
    }, [])

    console.log(questionList);

    return (
        <>
            <h2>Admin</h2>
            <AddQuestion/>
            <br/> <br/>
            <div>
                {questionList.map((question: Question) => (
                    <QuestionCard question={question}/>
                ))}
            </div>
        </>
    )
}
