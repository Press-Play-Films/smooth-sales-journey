
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { user, signIn, signUp, isLoading } = useAuth();
  
  useEffect(() => {
    // Redirect if user is already authenticated
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    
    if (!password) {
      toast.error('Please enter your password');
      return;
    }
    
    if (isSignUp && !fullName) {
      toast.error('Please enter your full name');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      if (isSignUp) {
        await signUp(email, password, fullName);
      } else {
        await signIn(email, password);
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading && user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-brio-navy">BRIO Sales Management</h1>
          <p className="text-gray-600 mt-2">
            {isSignUp ? 'Create an account to get started' : 'Sign in to your account'}
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{isSignUp ? 'Sign Up' : 'Sign In'}</CardTitle>
            <CardDescription>
              {isSignUp 
                ? 'Enter your information to create an account' 
                : 'Enter your email and password to sign in'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    type="text" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Smith"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? 'Processing...' 
                  : isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
              
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-sm text-brio-navy hover:underline"
                >
                  {isSignUp 
                    ? 'Already have an account? Sign In' 
                    : "Don't have an account? Sign Up"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
