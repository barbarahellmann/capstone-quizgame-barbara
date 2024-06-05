import {ChangeEvent, FormEvent, useState} from 'react';
import axios from "axios";
import {Question} from "../model/Question.ts";
import {Box, Button, TextField, Typography} from '@mui/material';

export default function AddQuestion() {
    const [newQuestion, setNewQuestion] = useState<Question>({
        id: "",
        question: "",
        correctAnswer: "",
        wrongAnswer1: "",
        wrongAnswer2: "",
        wrongAnswer3: "",
        isCorrect: false,
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const key = event.target.name;
        setNewQuestion({...newQuestion, [key]: event.target.value});
    }

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
                });
                alert("Frage wurde hinzugefügt.");
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    return (
        <Box>
            <Typography variant="h3">Frage hinzufügen:</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="question"
                    label="Frage"
                    value={newQuestion.question}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="correctAnswer"
                    label="Richtige Antwort"
                    value={newQuestion.correctAnswer}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="wrongAnswer1"
                    label="Falsche Antwort 1"
                    value={newQuestion.wrongAnswer1}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="wrongAnswer2"
                    label="Falsche Antwort 2"
                    value={newQuestion.wrongAnswer2}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="wrongAnswer3"
                    label="Falsche Antwort 3"
                    value={newQuestion.wrongAnswer3}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        </Box>
    )
}