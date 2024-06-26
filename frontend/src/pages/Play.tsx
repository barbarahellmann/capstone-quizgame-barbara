import {useEffect, useState} from 'react';
import {Question} from "../model/Question.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Box, Button, Grid, LinearProgress, Stack, Typography} from "@mui/material";

export default function Play() {
    // Speichert die Fragen und verfolgt die Fragen
    const [questions, setQuestions] = useState<Question[]>([]);
    const [index, setIndex] = useState<number>(0);
    // Hält fest, ob die Frage beantwortet wurde
    const [answered, setAnswered] = useState<boolean>(false);

    const [shuffledAnswers, setShuffledAnswers] = useState<{ text: string, isCorrect: boolean }[]>([]);
    const nav = useNavigate();
    // Punkte zählen
    const [correctCount, setCorrectCount] = useState<number>(0);

    useEffect(() => {
        fetchQuestion();
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            shuffleAnswers();
        }
    }, [questions, index]);

    function fetchQuestion() {
        axios.get("/api/quiz/play")
            .then(response => {
                setQuestions(response.data);
            });
    }

    function shuffleAnswers() {
        const currentQuestion = questions[index];
        const answers = [
            {text: currentQuestion.correctAnswer, isCorrect: true},
            {text: currentQuestion.wrongAnswer1, isCorrect: false},
            {text: currentQuestion.wrongAnswer2, isCorrect: false},
            {text: currentQuestion.wrongAnswer3, isCorrect: false},
        ];
        setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
    }

    // Wenn die Frage richtig beantwortet wurde, wird currentCount erhöht
    function handleAnswerClick(isCorrect: boolean) {
        if (!answered) {
            setAnswered(true);
            if (isCorrect) {
                setCorrectCount(prevCount => prevCount + 1);
            }
        }
    }

    // nach der letzten Frage wird correctCount an /result weitergegeben
    function handleNextQuestion() {
        const nextIndex = index + 1;
        if (nextIndex < questions.length) {
            setIndex(nextIndex);
            setAnswered(false);
        } else {
            nav("/result", {state: {correctCount}});
        }
    }

    if (questions.length === 0) {
        return "Lade...";
    }

    const progress = ((index) / questions.length) * 100;

    return (
        <Box className="flex flex-col items-center p-4 mx-4">
            <Typography variant="h5" component="h2" align="center" marginBottom={2} marginTop={2}>
                Frage {index + 1} von {questions.length}
            </Typography>
            <LinearProgress variant="determinate" value={progress} sx={{width: '100%', marginBottom: 2}}/>
            <Typography variant="h5" component="h2" align="center" marginBottom={2} marginTop={2}>
                {questions[index].question}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {shuffledAnswers.map((answer, idx) => (
                    <Grid item xs={10} sm={5} key={idx}>
                        <Button
                            onClick={() => handleAnswerClick(answer.isCorrect)}
                            style={{
                                backgroundColor: answered
                                    ? answer.isCorrect
                                        ? 'mediumseagreen'
                                        : 'palevioletred'
                                    : '#1976d2',
                                fontWeight: answered
                                    ? answer.isCorrect
                                        ? 'bold'
                                        : 'initial'
                                    : 'initial',
                                color: answered
                                    ? answer.isCorrect
                                        ? 'white'
                                        : 'darkred'
                                    : "white",
                                margin: '0.5rem',
                            }}
                            disabled={answered}
                            fullWidth
                            variant="contained"
                        >
                            {answer.text}
                        </Button>
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={1} justifyContent="center">
            {answered && (
                <Stack display="block" marginTop={6}>
                    <Button
                        onClick={handleNextQuestion}
                        sx={{
                            marginTop: '1rem',
                            alignSelf: 'center',
                            justifyContent: "center",
                            transition: 'transform 0.3s, background-color 0.3s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                backgroundColor: '#1976d2',
                            },
                        }}
                        variant="contained"
                        color="primary"
                    >
                        {index + 1 < questions.length ? 'Nächste Frage' : 'Ergebnisse anzeigen'}
                    </Button>
                </Stack>
            )}
            </Grid>
        </Box>
    );
}