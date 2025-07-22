import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <nav className="nav">
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/tables" className="nav-link">View All Tables</Link>
            <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: 0, margin: 0, fontFamily: 'inherit' }}>
                Logout
            </button>
        </nav>
    );
};

export default NavBar;