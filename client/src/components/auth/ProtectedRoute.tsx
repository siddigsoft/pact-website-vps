import { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [location, navigate] = useLocation();
  const { isAuthenticated, token, isLoggingIn } = useAuth();
  
  useEffect(() => {
    // Don't redirect if user is currently logging in
    if (isLoggingIn) {
      return;
    }
    
    if (!isAuthenticated || !token) {
      // Store current path for redirect after login
      localStorage.setItem('auth-redirect', location);
      // Redirect to login
      navigate('/admin/login');
    }
  }, [location, navigate, isAuthenticated, token, isLoggingIn]);
  
  // Render children only if authenticated or currently logging in
  return (isAuthenticated && token) || isLoggingIn ? <>{children}</> : null;
} 