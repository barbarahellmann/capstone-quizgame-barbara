import {Link} from "react-router-dom";

const Navigation: React.FC = () => {
    return (
        <>
            <h3>Navigation</h3>
            <div className="Navigation">
                <Link to="/">Startseite</Link>
                <br/>
                <Link to="/play">Zum Quiz</Link>
                <br/>
                <Link to="/admin">Admin</Link>
            </div>
        </>
    );
};

export default Navigation;