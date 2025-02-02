import { Navigate, useLocation } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token') || false;
  
  // If user is authenticated and tries to access login/register, redirect to chat
  if (isAuthenticated && ['/login', '/register'].includes(location.pathname)) {
    return <Navigate to="/chat" replace />;
  }
  
  return children;
};

export default AuthLayout;