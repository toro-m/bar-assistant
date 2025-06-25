import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AllTables from './pages/AllTablesPage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/tables" className="nav-link">View All Tables</Link>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={
              <div className="home">
                <h1>Welcome to Bar Assistant</h1>
                <p>Manage your bar's table reservations with ease.</p>
                <Link to="/tables" className="cta-button">View Tables</Link>
              </div>
            } />
            <Route path="/tables" element={<AllTables />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
