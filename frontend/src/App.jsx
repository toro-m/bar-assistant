import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import AllTablesPage from './pages/AllTablesPage.jsx';
import './App.css';
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NoPathErrorPage from "./pages/NoPathErrorPage.jsx";
import NavBar from "./components/NavBar.jsx";
import {Component} from "react";
import RegisterPage from "./pages/RegisterPage.jsx";




function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <div className="app">
      {!isLoginPage && !isRegisterPage && <NavBar />}
      
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={< HomePage />} />
          <Route path="/tables" element={<AllTablesPage />} />
          <Route path="*" element={<NoPathErrorPage />} />
            <Route path="/register" element={<RegisterPage />} />
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
