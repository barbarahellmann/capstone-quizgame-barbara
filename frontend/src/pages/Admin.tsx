import AddQuestion from "../components/AddQuestion.tsx";
import QuestionCard from "../components/ChangeQuestion.tsx";
import {useEffect, useState} from "react";
import {Question} from "../model/Question.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Admin() {

    const [questionList, setQuestionList] = useState<Question[]>([]);


    const navigate = useNavigate();

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await axios.get('/api/auth/me');
                const user = response.data;

                if (user.id !== 'your-github-user-id') { // Ersetzen Sie "your-github-user-id" durch die tatsächliche Benutzer-ID
                    alert('Sie können die Seite nicht öffnen');
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
                alert('Sie können die Seite nicht öffnen');
                navigate('/');
            }
        };

        checkAdmin();
    }, [navigate]);


//Fragen laden
    function fetchQuestion() {
        axios.get("/api/quiz")
            .then((response) => {
                setQuestionList(response.data)
            })
    }

    // Durch [{}] wird gesagt, dass es der useEffect nur einmalig durchgeführt wird. Das fixt das Problem mit dem Reload beim speicher der Daten
    useEffect(() => {
        fetchQuestion()
    }, [{}])

    console.log(questionList);

    return (
        <>
            <h2>Admin Bereich</h2>
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
