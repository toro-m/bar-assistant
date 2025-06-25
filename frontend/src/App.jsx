import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import AllTablesPage from './pages/AllTablesPage.jsx';
import './App.css';
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";

function NavBar() {
  return (
    <nav className="nav">
      <Link to="/home" className="nav-link">Home</Link>
      <Link to="/tables" className="nav-link">View All Tables</Link>
    </nav>
  );
}

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app">
      {!isLoginPage && <NavBar />}
      
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={< HomePage />} />
          <Route path="/tables" element={<AllTablesPage />} />
        </Routes>
      </main>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
