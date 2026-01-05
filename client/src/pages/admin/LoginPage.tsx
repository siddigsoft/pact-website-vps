import { useState } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Use the login method from AuthContext
      login(data.token, data.user);
      
      toast({
        title: 'Login successful',
        description: 'Welcome to the PACT Consultancy admin panel.',
      });
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: err.message || 'Invalid username or password. Please try again.',
      });
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="mb-4">
            <img 
              src="/pact-logo.png" 
              alt="PACT Consultancy Logo" 
              className="h-16 mx-auto"
            />
          </div>
          <h1 className="text-3xl font-bold">PACT CMS</h1>
          <p className="text-gray-600 mt-2">Content Management System</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  placeholder="Enter your username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          {/* <p>For demo: Username: admin, Password: admin</p> */}
          <p className="mt-2">
            Don&apos;t have an account?{' '}
            <a href="/admin/register" className="text-primary underline hover:text-primary/80">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
}