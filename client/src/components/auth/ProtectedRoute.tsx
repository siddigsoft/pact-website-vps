import { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [location, navigate] = useLocation();
  const { isAuthenticated, token, isLoading } = useAuth();
  
  useEffect(() => {
    // Don't redirect while still loading auth state
    if (isLoading) return;
    
    if (!isAuthenticated || !token) {
      // Store current path for redirect after login
      localStorage.setItem('auth-redirect', location);
      // Redirect to login
      navigate('/admin/login');
    }
  }, [location, navigate, isAuthenticated, token, isLoading]);
  
  // Show loading state or nothing while initializing
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>;
  }
  
  // Render children only if authenticated
  return isAuthenticated && token ? <>{children}</> : null;
} 