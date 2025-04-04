import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Companies from './pages/Companies/Companies';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import EmployeesPage from './pages/admin/EmployeesPage';
import AddJobPage from './pages/admin/AddJobPage';
import JobsPage from './pages/Jobs/Jobs';

const AppRoutes = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Routes>
      {/* Public routes - outside Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<ErrorPage />} />

      {/* Protected routes with layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <EmployeesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-job"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AddJobPage />
            </ProtectedRoute>
          }
        />

        {/* Employee routes */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <JobsPage />
            </ProtectedRoute>
          }
        />

        {/* Common routes for both admin and employee */}
        <Route
          path="/companies"
          element={
            <ProtectedRoute allowedRoles={['admin', 'employee']}>
              <Companies />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
    </Routes>
  );
};

export default AppRoutes;