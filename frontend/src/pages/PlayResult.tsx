import {useLocation} from "react-router-dom";

export default function PlayResult() {

    const location = useLocation();
    const {correctCount} = location.state || {correctCount: 0};

    return (
        <div>
            <h1>Ergebnisse</h1>
            <p>Du hast {correctCount} von 5 Fragen richtig beantwortet.</p>
            <button onClick={() => window.location.reload()}>Quiz neu starten</button>
        </div>
    )
}