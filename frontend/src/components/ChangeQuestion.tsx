import {Question} from "../model/Question.ts";
import {ChangeEvent, useState} from "react";
import axios from "axios";
import {Alert, Box, IconButton, TextField, Typography} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Divider from "@mui/material/Divider";

export default function QuestionCard({question}: { question: Question }) {
    const [editing, setEditing] = useState(false);
    const [editedQuestion, setEditedQuestion] = useState(question);
    const [alert, setAlert] = useState({
        open: false,
        severity: 'success',
        message: ''
    });

    const setQuestion = (updatedQuestion: Question) => {
        setEditedQuestion(updatedQuestion);
    };

    const handleEdit = () => setEditing(true);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditedQuestion({...editedQuestion, [name]: value});
    };

    const handleSave = () => {
        axios.put(`/api/quiz/${question.id}`, editedQuestion)
            .then(response => {
                console.log("Question updated successfully:" + response.data);
                setEditing(false);
                setQuestion(editedQuestion);
                setAlert({
                    open: true,
                    severity: 'success',
                    message: 'Frage wurde geändert'
                });
            })
            .catch(error => {
                console.error("Error while updating question:", error);
                setAlert({
                    open: true,
                    severity: 'error',
                    message: 'Error: Frage konnte nicht geändert werden.'
                });
            });
    };

    const deleteQuestion = () => {
        axios.delete("/api/quiz/" + question.id)
            .then(response => {
                console.log(response);
                setAlert({
                    open: true,
                    severity: 'success',
                    message: 'Frage wird gelöscht.'
                });
            })
            .catch(error => {
                console.log(error.message);
                setAlert({
                    open: true,
                    severity: 'error',
                    message: 'Error: Frage konnte nicht gelöscht werden.'
                });
            });
    };

    const handleCloseAlert = () => {
        setAlert({...alert, open: false});
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: "white"
        }}>
            <Box mb={2}>
                <Box>
                {editing ? (
                    <Box>
                        <TextField
                            name="question"
                            value={editedQuestion.question}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="correctAnswer"
                            value={editedQuestion.correctAnswer}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="wrongAnswer1"
                            value={editedQuestion.wrongAnswer1}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="wrongAnswer2"
                            value={editedQuestion.wrongAnswer2}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="wrongAnswer3"
                            value={editedQuestion.wrongAnswer3}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                    </Box>
                ) : (
                    <Box>
                        <Typography>{editedQuestion.question}</Typography>
                        <Typography sx={{marginTop: 2}}>Richtige Antwort: {editedQuestion.correctAnswer}</Typography>
                        <Typography>Falsche Antwort: {editedQuestion.wrongAnswer1}</Typography>
                        <Typography>Falsche Antwort: {editedQuestion.wrongAnswer2}</Typography>
                        <Typography>Falsche Antwort: {editedQuestion.wrongAnswer3}</Typography>
                    </Box>
                )}
                </Box>
                <IconButton onClick={deleteQuestion} variant="contained" color="error">
                    <DeleteForeverIcon/>
                </IconButton>
                <IconButton onClick={editing ? handleSave : handleEdit} variant="contained" color="primary">
                    {editing ? 'Save' : <EditIcon/>}
                </IconButton>
                <Divider orientation="horizontal" variant="middle" flexItem/>
            </Box>
            <Alert severity={alert.severity} onClose={handleCloseAlert}
                   sx={{
                       position: 'absolute',
                       left: '50%',
                       transform: 'translate(-50%, -50%)',
                       zIndex: 9999,
                   }}
                   style={{visibility: alert.open ? 'visible' : 'hidden'}}>
                {alert.message}
            </Alert>
        </Box>
    )
}

