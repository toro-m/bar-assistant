import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <div className="home">
            <h1>Welcome to Bar Assistant</h1>
            <p>Manage your bar's table reservations with ease.</p>
            <Link to="/tables" className="cta-button">View Tables</Link>
        </div>
    );
};

export default HomePage;