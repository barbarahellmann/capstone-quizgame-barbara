import AddQuestion from "../components/AddQuestion.tsx";
import QuestionCard from "../components/ChangeQuestion.tsx";
import {useEffect, useState} from "react";
import {Question} from "../model/Question.ts";
import axios from "axios";
import {Box, Typography} from "@mui/material";
import Divider from '@mui/material/Divider';


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
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingRight: 6,
            paddingLeft: 6,
            color: 'white'
        }}>
            <Typography variant="h5" paddingTop={2} align={"center"}>Admin Bereich</Typography>
            <Divider sx={{
                paddingTop: 4,
                color: 'white'
            }}>Frage hinzufügen</Divider>
            <AddQuestion/>
            <Divider sx={{
                paddingTop: 6,
                color: 'white'
            }}>Fragen ändern</Divider>
            <Box mt={4}>
                {questionList.map((question: Question) => (
                    <QuestionCard key={question.id} question={question}/>
                ))}
            </Box>
        </Box>
    )
}