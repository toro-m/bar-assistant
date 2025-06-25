import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AllTables from './pages/AllTablesPage.jsx';
import './App.css';
import LoginPage from "./pages/LoginPage.jsx";

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/all-tables" className="nav-link">View All Tables</Link>
        </nav>
        
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
              <div className="home">
                <h1>Welcome to Bar Assistant</h1>
                <p>Manage your bar's table reservations with ease.</p>
                <Link to="/all-tables" className="cta-button">View Tables</Link>
              </div>
            } />
            <Route path="/all-tables" element={<AllTables />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
