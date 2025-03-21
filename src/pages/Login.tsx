
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, Mail, Phone, ArrowLeft, Shield, CheckCircle2 } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { toast } from '@/hooks/use-toast';

type FormType = 'login' | 'signup';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formType, setFormType] = useState<FormType>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeTos, setAgreeTos] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const passwordStrengthText = [
    'Very Weak',
    'Weak',
    'Medium',
    'Strong',
    'Very Strong'
  ];

  const passwordStrengthColor = [
    'bg-irctc-error',
    'bg-irctc-error',
    'bg-irctc-warning',
    'bg-irctc-success',
    'bg-irctc-success'
  ];

  // Check if the URL has a signup parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('signup') === 'true') {
      setFormType('signup');
    }
  }, [location]);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const toggleFormType = () => {
    setFormType(formType === 'login' ? 'signup' : 'login');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    calculatePasswordStrength(newPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formType === 'login') {
      // Simulate login success - store a mock token
      localStorage.setItem('userToken', 'user-mock-token-123');
      
      toast({
        title: "Success!",
        description: "You've been logged in successfully.",
        variant: "default",
      });
      setTimeout(() => navigate('/dashboard'), 1500);
    } else {
      if (passwordStrength < 2) {
        toast({
          title: "Weak Password",
          description: "Please use a stronger password for better security.",
          variant: "destructive",
        });
        return;
      }
      
      if (!agreeTos) {
        toast({
          title: "Terms Required",
          description: "Please agree to the Terms of Service to continue.",
          variant: "destructive",
        });
        return;
      }

      // Simulate signup success - store a mock token
      localStorage.setItem('userToken', 'user-mock-token-123');
      
      toast({
        title: "Account Created!",
        description: "Your account has been created successfully.",
        variant: "default",
      });
      setTimeout(() => navigate('/dashboard'), 1500);
    }
  };

  return (
    <MainLayout hideFooter>
      <div className="min-h-screen bg-irctc-light-gray flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-irctc-medium-gray hover:text-irctc-dark-gray transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
          
          <Card className="overflow-hidden">
            <Card.Content className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">
                  {formType === 'login' ? 'Welcome Back' : 'Create Your Account'}
                </h1>
                <p className="text-irctc-medium-gray mt-2">
                  {formType === 'login' 
                    ? 'Sign in to access your IRCTC Express account' 
                    : 'Join millions of travelers using IRCTC Express'}
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {formType === 'signup' && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-irctc-dark-gray mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-irctc-royal-blue/20 focus:border-irctc-royal-blue transition-all"
                        placeholder="John Doe"
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-irctc-medium-gray" />
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-irctc-dark-gray mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-irctc-royal-blue/20 focus:border-irctc-royal-blue transition-all"
                      placeholder="you@example.com"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-irctc-medium-gray" />
                  </div>
                </div>
                
                {formType === 'signup' && (
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-irctc-dark-gray mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-irctc-royal-blue/20 focus:border-irctc-royal-blue transition-all"
                        placeholder="+91 9876543210"
                      />
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-irctc-medium-gray" />
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-irctc-dark-gray mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-irctc-royal-blue/20 focus:border-irctc-royal-blue transition-all"
                      placeholder={formType === 'login' ? "••••••••" : "Min. 8 characters"}
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-irctc-medium-gray" />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-irctc-medium-gray hover:text-irctc-dark-gray"
                    >
                      {showPassword ? 
                        <EyeOff className="w-5 h-5" /> : 
                        <Eye className="w-5 h-5" />
                      }
                    </button>
                  </div>
                  
                  {formType === 'signup' && password.length > 0 && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium">{passwordStrengthText[passwordStrength]}</span>
                        <span className="text-xs text-irctc-medium-gray">{password.length}/8+ chars</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${passwordStrengthColor[passwordStrength]} transition-all duration-300`}
                          style={{ width: `${(passwordStrength + 1) * 20}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {formType === 'login' && (
                  <div className="flex justify-end">
                    <Link 
                      to="/forgot-password"
                      className="text-sm font-medium text-irctc-royal-blue hover:text-irctc-royal-blue/80 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}
                
                {formType === 'signup' && (
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={agreeTos}
                        onChange={() => setAgreeTos(!agreeTos)}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-irctc-royal-blue"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-irctc-medium-gray">
                        I agree to the <Link to="/terms" className="text-irctc-royal-blue hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-irctc-royal-blue hover:underline">Privacy Policy</Link>
                      </label>
                    </div>
                  </div>
                )}
                
                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="mt-6"
                  >
                    {formType === 'login' ? 'Sign In' : 'Create Account'}
                  </Button>
                </div>
              </form>
              
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-irctc-medium-gray">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="py-2.5"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="py-2.5"
                  >
                    <svg className="w-5 h-5 mr-2 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-irctc-medium-gray">
                  {formType === 'login' ? "Don't have an account?" : "Already have an account?"}
                  <button
                    type="button"
                    onClick={toggleFormType}
                    className="ml-1 font-medium text-irctc-royal-blue hover:text-irctc-royal-blue/80 transition-colors"
                  >
                    {formType === 'login' ? 'Sign up now' : 'Sign in'}
                  </button>
                </p>
              </div>
            </Card.Content>
          </Card>
          
          <div className="mt-8 flex items-center justify-center space-x-4 p-4 bg-white rounded-lg border border-gray-100">
            <Shield className="w-5 h-5 text-irctc-royal-blue" />
            <span className="text-sm text-irctc-medium-gray">
              Secured by industry-leading encryption technology
            </span>
          </div>
          
          <div className="mt-4 text-center">
            <div className="flex justify-center space-x-4">
              <Link to="/privacy" className="text-xs text-irctc-medium-gray hover:text-irctc-dark-gray">Privacy Policy</Link>
              <Link to="/terms" className="text-xs text-irctc-medium-gray hover:text-irctc-dark-gray">Terms of Service</Link>
              <Link to="/help" className="text-xs text-irctc-medium-gray hover:text-irctc-dark-gray">Help Center</Link>
            </div>
            <p className="mt-4 text-xs text-irctc-medium-gray">
              © {new Date().getFullYear()} IRCTC Express. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
