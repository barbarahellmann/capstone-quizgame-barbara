import {Link} from "react-router-dom";

export default function Navigation() {


    return (
        <>
            <h3>Navigation</h3>
            <div className={"Navigation"}>
                <Link to="/start">Startseite</Link>
                <br/>
                <Link to="/play">Zum Quiz</Link>
                <br/>
                <Link to="/admin">Admin</Link>
            </div>
        </>
    )
}