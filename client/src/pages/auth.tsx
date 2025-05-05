import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure } from '@/lib/slices/authSlice';

// Login Form Schema
const loginFormSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

// Register Form Schema
const registerFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
})
.refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

// Reset Password Form Schema
const resetPasswordFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

const AuthPage = () => {
  const [, setLocation] = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, error } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();
  
  // State for handling different UI states
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [otp, setOtp] = useState<string>('');
  const [otpIsLoading, setOtpIsLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resetIsLoading, setResetIsLoading] = useState(false);
  
  // Form setup
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });
  
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  
  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });
  
  // Effect for redirecting if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setLocation('/');
    }
  }, [isAuthenticated, setLocation]);
  
  // When showing the reset password dialog, populate with email if available
  useEffect(() => {
    if (showResetDialog && email) {
      resetPasswordForm.setValue('email', email);
    }
  }, [showResetDialog, email, resetPasswordForm]);
  
  // Handle switching between login and register modes
  const handleModeSwitch = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };
  
  // Handle forgot password
  const handleForgotPassword = (userEmail: string) => {
    setEmail(userEmail);
    setShowResetDialog(true);
  };
  
  // Handle register success, show OTP dialog
  const handleRegisterSuccess = (userEmail: string) => {
    setEmail(userEmail);
    setShowOTPDialog(true);
  };
  
  // Login form submission
  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      dispatch(loginStart());
      
      const response = await apiRequest('POST', '/api/auth/login', {
        username: data.username,
        password: data.password,
      });
      
      const result = await response.json();
      
      if (result.user && result.token) {
        dispatch(loginSuccess({
          user: result.user,
          token: result.token,
        }));
        
        toast({
          title: 'Login successful',
          description: `Welcome back, ${result.user.name}!`,
        });
        
        setLocation('/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.';
      dispatch(loginFailure(errorMessage));
      
      toast({
        title: 'Login failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };
  
  // Register form submission
  const onRegisterSubmit = async (data: RegisterFormValues) => {
    try {
      dispatch(registerStart());
      
      const response = await apiRequest('POST', '/api/auth/register', {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      });
      
      if (response.ok) {
        dispatch(registerSuccess());
        
        toast({
          title: 'Registration successful',
          description: 'Please check your email for verification.',
        });
        
        handleRegisterSuccess(data.email);
      } else {
        throw new Error('Registration failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      dispatch(registerFailure(errorMessage));
      
      toast({
        title: 'Registration failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };
  
  // Reset password form submission
  const onResetSubmit = async (data: ResetPasswordFormValues) => {
    try {
      setResetIsLoading(true);
      
      const response = await apiRequest('POST', '/api/auth/reset-password', {
        email: data.email,
      });
      
      if (response.ok) {
        setEmailSent(true);
        
        toast({
          title: 'Reset email sent',
          description: 'Please check your email for password reset instructions.',
        });
      } else {
        throw new Error('Failed to send reset email');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send reset email. Please try again.';
      
      toast({
        title: 'Reset failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setResetIsLoading(false);
    }
  };
  
  // OTP verification handler
  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setOtpError('Please enter the complete verification code');
      return;
    }
    
    try {
      setOtpIsLoading(true);
      setOtpError(null);
      
      const response = await apiRequest('POST', '/api/auth/verify-otp', {
        email,
        otp
      });
      
      if (response.ok) {
        toast({
          title: 'Verification successful',
          description: 'Your account has been verified successfully.',
        });
        
        setShowOTPDialog(false);
        setAuthMode('login');
      } else {
        throw new Error('Invalid verification code');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed. Please try again.';
      setOtpError(errorMessage);
      
      toast({
        title: 'Verification failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setOtpIsLoading(false);
    }
  };
  
  // Resend OTP handler
  const handleResendOTP = async () => {
    try {
      setOtpIsLoading(true);
      
      const response = await apiRequest('POST', '/api/auth/resend-otp', {
        email
      });
      
      if (response.ok) {
        toast({
          title: 'OTP Resent',
          description: 'A new verification code has been sent to your email.',
        });
      } else {
        throw new Error('Failed to resend verification code');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend verification code. Please try again.';
      
      toast({
        title: 'Resend failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setOtpIsLoading(false);
    }
  };
  
  // Handle OTP input change
  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setOtp(value);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left Side (Logo & Info) */}
      <div className="bg-primary text-white w-full lg:w-2/5 flex flex-col justify-center p-8 lg:p-12">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-white text-primary rounded-md h-10 w-10 flex items-center justify-center font-semibold text-lg mr-3">
              M
            </div>
            <h1 className="text-2xl font-bold">MrAix Expo</h1>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">
            {authMode === 'login' 
              ? 'Welcome back to MrAix Expo' 
              : 'Join the MrAix Expo Platform'}
          </h2>
          <p className="text-primary-foreground opacity-90 mb-6">
            {authMode === 'login'
              ? 'Log in to access your business management dashboard and tools.'
              : 'Create an account to unlock the full potential of our B2B business management tools.'}
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary-dark rounded-full p-1 mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">30-day Free Trial</h3>
                <p className="text-sm text-primary-foreground opacity-75">
                  Test all features with no commitment
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary-dark rounded-full p-1 mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">No Credit Card Required</h3>
                <p className="text-sm text-primary-foreground opacity-75">
                  Sign up with just your email address
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary-dark rounded-full p-1 mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">24/7 Support</h3>
                <p className="text-sm text-primary-foreground opacity-75">
                  Get help whenever you need it
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side (Auth Form) */}
      <div className="flex-1 flex flex-col justify-center p-6 lg:p-12">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-primarytext">
              {authMode === 'login' ? 'Sign in to your account' : 'Create your account'}
            </h2>
            <p className="text-secondarytext mt-2">
              {authMode === 'login' 
                ? 'Enter your credentials to access your dashboard' 
                : 'Enter your details to start your free trial'}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {/* Login Form */}
            {authMode === 'login' && (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                  <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center justify-between">
                    <FormField
                      control={loginForm.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm cursor-pointer">Remember me</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      variant="link" 
                      className="text-sm text-primary p-0" 
                      type="button"
                      onClick={() => handleForgotPassword(loginForm.getValues('username'))}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  
                  {error && (
                    <div className="text-sm text-red-500 py-1">{error}</div>
                  )}
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                </form>
              </Form>
            )}
            
            {/* Register Form */}
            {authMode === 'register' && (
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Choose a username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Create a password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {error && (
                    <div className="text-sm text-red-500 py-1">{error}</div>
                  )}
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>
              </Form>
            )}
            
            <div className="mt-4 text-center">
              <p className="text-sm text-secondarytext">
                {authMode === 'login' 
                  ? "Don't have an account? " 
                  : "Already have an account? "}
                <button 
                  onClick={handleModeSwitch}
                  className="text-primary font-medium hover:underline focus:outline-none"
                >
                  {authMode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* OTP Verification Dialog */}
      <Dialog open={showOTPDialog} onOpenChange={setShowOTPDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify Your Account</DialogTitle>
            <DialogDescription>
              We've sent a verification code to {email}. Please enter the code below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="w-full max-w-xs mx-auto">
              <label htmlFor="otp-input" className="block text-sm text-gray-700 mb-2">Enter 6-digit verification code:</label>
              <Input
                id="otp-input"
                type="text"
                value={otp}
                onChange={handleOTPChange}
                className="text-center text-xl tracking-widest h-12"
                placeholder="123456"
                maxLength={6}
                autoComplete="one-time-code"
              />
            </div>
            
            {otpError && (
              <div className="text-sm text-red-500 text-center">{otpError}</div>
            )}
            
            <Button 
              onClick={handleVerifyOTP} 
              className="w-full" 
              disabled={otpIsLoading}
            >
              {otpIsLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify'
              )}
            </Button>
            
            <div className="text-center text-sm">
              Didn't receive the code?{' '}
              <Button 
                variant="link" 
                className="text-primary p-0" 
                onClick={handleResendOTP}
                disabled={otpIsLoading}
              >
                Resend
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Reset Password Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Your Password</DialogTitle>
            <DialogDescription>
              Enter your email to receive password reset instructions.
            </DialogDescription>
          </DialogHeader>
          
          {emailSent ? (
            <div className="space-y-4">
              <div className="bg-green-50 text-green-700 p-4 rounded-md text-sm">
                We've sent a password reset link to your email. Please check your inbox and follow the instructions.
              </div>
              
              <Button 
                className="w-full"
                onClick={() => {
                  setShowResetDialog(false);
                  setEmailSent(false);
                }}
              >
                Back to Login
              </Button>
              
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => setEmailSent(false)}
              >
                Try another email
              </Button>
            </div>
          ) : (
            <Form {...resetPasswordForm}>
              <form onSubmit={resetPasswordForm.handleSubmit(onResetSubmit)} className="space-y-4">
                <FormField
                  control={resetPasswordForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={resetIsLoading}
                >
                  {resetIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthPage;