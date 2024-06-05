import AddQuestion from "../components/AddQuestion.tsx";
import QuestionCard from "../components/ChangeQuestion.tsx";
import {useEffect, useState} from "react";
import {Question} from "../model/Question.ts";
import axios from "axios";
import {Box, Typography} from "@mui/material";

export default function Admin() {
    const [questionList, setQuestionList] = useState<Question[]>([]);

    // Load questions
    function fetchQuestion() {
        axios.get("/api/quiz")
            .then((response) => {
                setQuestionList(response.data)
            })
    }

    // Run useEffect only once to fetch data
    useEffect(() => {
        fetchQuestion()
    }, [])

    console.log(questionList);

    return (
        <>
            <Typography variant="h2" gutterBottom>Admin Bereich</Typography>
            <AddQuestion/>
            <Typography variant="h3">Fragen ändern</Typography>
            <Box mt={4}>
                {questionList.map((question: Question) => (
                    <QuestionCard key={question.id} question={question}/>
                ))}
            </Box>
        </>
    )
}