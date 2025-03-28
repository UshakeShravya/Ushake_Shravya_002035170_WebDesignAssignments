import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import JobListings from './pages/jobListings';
import Contact from './pages/Contact';
import CompanyShowcase from './pages/CompanyShowcase';
import NavBar from './components/Navbar';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><JobListings /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/companies" element={<ProtectedRoute><CompanyShowcase /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

