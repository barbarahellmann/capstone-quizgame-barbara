import {useEffect, useState} from 'react';
import {Question} from "../model/Question";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Box, Button, Typography} from '@mui/material';

export default function Play() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [index, setIndex] = useState<number>(0);
    const [answered, setAnswered] = useState<boolean>(false);
    const [shuffledAnswers, setShuffledAnswers] = useState<{ text: string, isCorrect: boolean }[]>([]);
    const nav = useNavigate();
    const [correctCount, setCorrectCount] = useState<number>(0);

    useEffect(() => {
        fetchQuestion();
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            shuffleAnswers();
        }
    }, [questions, index]);

    const fetchQuestion = () => {
        axios.get("/api/quiz/play")
            .then(response => {
                setQuestions(response.data);
            });
    };

    const shuffleAnswers = () => {
        const currentQuestion = questions[index];
        const answers = [
            {text: currentQuestion.correctAnswer, isCorrect: true},
            {text: currentQuestion.wrongAnswer1, isCorrect: false},
            {text: currentQuestion.wrongAnswer2, isCorrect: false},
            {text: currentQuestion.wrongAnswer3, isCorrect: false},
        ];
        setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
    };

    const handleAnswerClick = (isCorrect: boolean) => {
        if (!answered) {
            setAnswered(true);
            if (isCorrect) {
                setCorrectCount(prevCount => prevCount + 1);
            }
        }
    };

    const handleNextQuestion = () => {
        const nextIndex = index + 1;
        if (nextIndex < questions.length) {
            setIndex(nextIndex);
            setAnswered(false);
        } else {
            nav("/result", {state: {correctCount}});
        }
    };

    if (questions.length === 0) {
        return "Lade...";
    }

    return (
        <Box sx={{padding: 2, bgcolor: '#353B57', color: '#FFFFFF', minHeight: '100vh'}}>
            <Typography variant="h4" component="h2" sx={{marginBottom: 2}}>{questions[index]?.question}</Typography>
            <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2}}>
                {shuffledAnswers.map((answer, idx) => (
                    <Button
                        key={idx}
                        onClick={() => handleAnswerClick(answer.isCorrect)}
                        sx={{
                            bgcolor: answered ? (answer.isCorrect ? '#7ED957' : '#FF5757') : 'primary.main',
                            color: '#FFFFFF',
                            '&:hover': {
                                bgcolor: answered ? (answer.isCorrect ? '#7ED957' : '#FF5757') : 'primary.main',
                                color: '#FFFFFF',
                            }
                        }}
                        disabled={answered}
                    >
                        {answer.text}
                    </Button>
                ))}
            </Box>
            {answered && (
                <Button onClick={handleNextQuestion} variant="contained"
                        sx={{marginTop: 2, bgcolor: '#36EEE0', color: '#FFFFFF'}}>
                    {index + 1 < questions.length ? 'Nächste Frage' : 'Ergebnisse anzeigen'}
                </Button>
            )}
        </Box>
    );
}

