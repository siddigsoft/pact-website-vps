import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'wouter';

interface AuthContextType {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
  isLoggingIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [, navigate] = useLocation();

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('cms-jwt');
    const storedUser = localStorage.getItem('cms-user');
    
    if (storedToken) {
      setToken(storedToken);
    }
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Handle navigation after login state updates
  useEffect(() => {
    if (isLoggingIn && token && user) {
      setIsLoggingIn(false);
      
      // Check if there's a redirect path stored
      const redirectPath = localStorage.getItem('auth-redirect');
      if (redirectPath) {
        localStorage.removeItem('auth-redirect');
        navigate(redirectPath);
      } else {
        navigate('/admin/dashboard');
      }
    }
  }, [isLoggingIn, token, user, navigate]);

  const login = (newToken: string, newUser: any) => {
    setIsLoggingIn(true);
    setToken(newToken);
    setUser(newUser);
    
    // Save to localStorage
    localStorage.setItem('cms-jwt', newToken);
    localStorage.setItem('cms-user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    
    // Remove from localStorage
    localStorage.removeItem('cms-jwt');
    localStorage.removeItem('cms-user');
    
    // Redirect to login
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
        isLoggingIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider; 