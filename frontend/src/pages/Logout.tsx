import {Link} from "react-router-dom";

export default function Lougout() {


    return (
        <>
            <h3> Du hast dich erfolgreich abgemeldet.</h3>
            <Link to="/start">Zurück zur Startseite</Link>
        </>
    )
}