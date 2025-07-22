import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {getEmailFromToken} from "../utils/utils.js";

const NavBar = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const checkAdminStatus = async () => {
            const email = getEmailFromToken();

            if (!email) return;

            try {
                const response = await fetch(`/api/users/${email}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user by email');
                }
                const data = await response.json();
                setIsAdmin(data.role === "ROLE_ADMIN");
            } catch (err) {
                console.error('Error fetching user by email:', err);
            }
        };

        checkAdminStatus();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <nav className="nav">
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/tables" className="nav-link">View All Tables</Link>
            {isAdmin && <Link to="/admin" className="nav-link">Admin panel</Link>}
            <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: 0, margin: 0, fontFamily: 'inherit' }}>
                Logout
            </button>
        </nav>
    );
};

export default NavBar;