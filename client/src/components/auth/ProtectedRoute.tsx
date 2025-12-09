import { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [location, navigate] = useLocation();
  const { isAuthenticated, token } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated || !token) {
      // Store current path for redirect after login
      localStorage.setItem('auth-redirect', location);
      // Redirect to login
      navigate('/admin/login');
    }
  }, [location, navigate, isAuthenticated, token]);
  
  // Render children only if authenticated
  return isAuthenticated ? <>{children}</> : null;
} 