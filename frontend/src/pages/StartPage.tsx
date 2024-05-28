import {Link, useNavigate} from "react-router-dom";

export default function StartPage() {
    const nav = useNavigate();


    return (
            <h2>
                <Link to="/play">Quiz starten</Link>
                <button onClick={() => nav("/admin")}>Klick Mich</button>
            </h2>
    )
}