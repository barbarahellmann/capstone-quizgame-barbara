import {Question} from "../model/Question.ts";
import {ChangeEvent, useState} from "react";
import axios from "axios";

export default function QuestionCard({question}: { question: Question }) {

    const [editing, setEditing] = useState(false);
    const [editedQuestion, setEditedQuestion] = useState(question);

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
                setQuestion(editedQuestion); // Update question prop with edited movie data
            })
            .catch(error => console.error("Error while updating question:", error));
    };

    function deleteQuestion() {
        axios.delete("/api/quiz/" + question.id)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <div>
            <h3>Fragen ändern</h3>
            <div>
                {editing ? (
                    <div>
                        <input type="text" name="question" value={editedQuestion.question}
                               onChange={handleInputChange}/>
                        <br/>
                        <input type="text" name="correctAnswer" value={editedQuestion.correctAnswer}
                               onChange={handleInputChange}/>
                        <br/>
                        <input type="text" name="wrongAnswer1" value={editedQuestion.wrongAnswer1}
                               onChange={handleInputChange}/>
                        <br/>
                        <input type="text" name="wrongAnswer2" value={editedQuestion.wrongAnswer2}
                               onChange={handleInputChange}/>
                        <br/>
                        <input type="text" name="wrongAnswer3" value={editedQuestion.wrongAnswer3}
                               onChange={handleInputChange}/>
                        <br/>
                        <input type="number" name="points" value={editedQuestion.points} onChange={handleInputChange}/>
                    </div>
                ) : (
                    <div>
                        {question.question} <br/>
                        {question.correctAnswer} <br/>
                        {question.wrongAnswer1} <br/>
                        {question.wrongAnswer2} <br/>
                        {question.wrongAnswer3} <br/>
                        {question.points} <br/>
                    </div>
                )}
            </div>
            <button onClick={deleteQuestion}>❌</button>
            <button onClick={editing ? handleSave : handleEdit}>{editing ? 'Save' : 'Edit'}</button>
            <br/> <br/>
        </div>
    )
}