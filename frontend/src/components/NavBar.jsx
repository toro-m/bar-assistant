import {Link} from "react-router-dom";

const NavBar=()=> {
    return (
        <nav className="nav">
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/tables" className="nav-link">View All Tables</Link>
            <Link to="/login" className="nav-link">Logout</Link>
        </nav>
    );
}

export default NavBar;