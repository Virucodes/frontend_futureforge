import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import RegisterPage from "./pages/RegisterPage";
import MenuPage from "./pages/MenuPage";
import ChatMenu from "./components/main/ChatMenu";
import Dashboard from "./components/main/Dashboard";
import Editprofile from "./components/main/EditProfile";
import CareerAdvisor from "./components/CareerAdvisor";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Auth Route Component (for login/register)
const AuthRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<WelcomePage />} />
        
        {/* Auth Routes - Redirect to dashboard if already logged in */}
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute>
              <RegisterPage />
            </AuthRoute>
          }
        />
        
        {/* Protected Routes - Require authentication */}
        <Route
          path="/career-advisor"
          element={
            <ProtectedRoute>
              <CareerAdvisor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <MenuPage page={<ChatMenu />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MenuPage page={<Dashboard />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editprofile"
          element={
            <ProtectedRoute>
              <MenuPage page={<Editprofile />} />
            </ProtectedRoute>
          }
        />
        
        {/* Catch all route - Redirect to dashboard if authenticated, otherwise to login */}
        <Route
          path="*"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;