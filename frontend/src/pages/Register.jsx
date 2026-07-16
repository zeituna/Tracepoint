import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle, Phone, UserCheck, Shield, AlertCircle } from 'lucide-react';
import Logo from '../../components/Logo';

const API_BASE = import.meta.env?.VITE_API_URL || process?.env?.REACT_APP_API_URL || 'http://localhost:5000/api';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    code: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  // Step 1: send code
  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const { email, phone, full_name } = formData;
    if (!email || !phone || !full_name) {
      setError('All fields are required');
      return;
    }
    setIsLoading(true);
    try {
      console.log('🔥 NEW Register: calling /start');
      const response = await fetch(`${API_BASE}/auth/register/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, full_name }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to send code');
      setSuccess('Verification code sent to your email');
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: verify code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const { email, code } = formData;
    if (!code) {
      setError('Verification code is required');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/register/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Verification failed');
      setSuccess('Email verified!');
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Resend
  const handleResendCode = async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/register/resend-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to resend');
      setSuccess('New code sent');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: complete
  const handleComplete = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const { username, password, confirmPassword, email, phone, full_name } = formData;
    if (!username || !password || !confirmPassword) {
      setError('Username and password are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/register/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          phone,
          password,
          full_name,
          role: 'volunteer',
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');
      setSuccess('Account created! Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── UI helpers ─────────────────────────────────────────────
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-4 mb-6">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
            s === step
              ? 'bg-emerald-400 text-emerald-900'
              : s < step
              ? 'bg-emerald-600/60 text-white'
              : 'bg-white/10 text-white/50'
          }`}>
            {s < step ? <CheckCircle size={16} /> : s}
          </div>
          {s < 3 && (
            <div className={`w-12 h-0.5 mx-1 ${
              s < step ? 'bg-emerald-500/50' : 'bg-white/10'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <form onSubmit={handleSendCode} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-emerald-100/90 mb-1.5">Full Name</label>
        <div className="relative group">
          <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300/70" />
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-emerald-100/90 mb-1.5">Email Address</label>
        <div className="relative group">
          <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300/70" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-emerald-100/90 mb-1.5">Phone Number</label>
        <div className="relative group">
          <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300/70" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+254700000000"
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? 'Sending code...' : 'Send Verification Code'}
        <ArrowRight size={18} />
      </button>
    </form>
  );

  const renderStep2 = () => (
    <form onSubmit={handleVerifyCode} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-emerald-100/90 mb-1.5">Verification Code</label>
        <div className="relative group">
          <Shield size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300/70" />
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Enter 6‑digit code"
            maxLength="6"
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            required
          />
        </div>
        <p className="text-xs text-emerald-200/60 mt-1">Code sent to {formData.email}</p>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-3.5 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-all disabled:opacity-70"
        >
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </button>
        <button
          type="button"
          onClick={handleResendCode}
          disabled={isLoading}
          className="px-4 py-3.5 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all disabled:opacity-50"
        >
          Resend
        </button>
      </div>
    </form>
  );

  const renderStep3 = () => (
    <form onSubmit={handleComplete} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-emerald-100/90 mb-1.5">Username</label>
        <div className="relative group">
          <UserCheck size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300/70" />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username"
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-emerald-100/90 mb-1.5">Password</label>
        <div className="relative group">
          <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300/70" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-300/70"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-emerald-100/90 mb-1.5">Confirm Password</label>
        <div className="relative group">
          <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300/70" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-300/70"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
        <ArrowRight size={18} />
      </button>
    </form>
  );

  const Message = ({ type, message }) => {
    if (!message) return null;
    const bgColor = type === 'error' ? 'bg-red-500/20 border-red-500/30' : 'bg-emerald-500/20 border-emerald-500/30';
    const textColor = type === 'error' ? 'text-red-200' : 'text-emerald-200';
    const Icon = type === 'error' ? AlertCircle : CheckCircle;
    return (
      <div className={`flex items-center gap-2 p-3 rounded-xl border ${bgColor} ${textColor} text-sm`}>
        <Icon size={18} className="flex-shrink-0" />
        <span>{message}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl"></div>
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-3">
            <Logo size="lg" />
            <div className="text-left">
              <h1 className="text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                TracePoint
              </h1>
              <p className="text-emerald-200/90 text-sm font-light tracking-wide italic">
                Missing Person Reporting & Tracking System
              </p>
            </div>
          </div>
          <div className="w-20 h-1 bg-emerald-400/50 mx-auto rounded-full mt-2"></div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              {step === 1 && 'Create Account'}
              {step === 2 && 'Verify Email'}
              {step === 3 && 'Complete Profile'}
            </h2>
            <p className="text-emerald-200/80 text-sm mt-1 font-light">
              {step === 1 && 'Start by providing your contact details'}
              {step === 2 && `Enter the 6-digit code sent to ${formData.email}`}
              {step === 3 && 'Almost there! Set your username and password'}
            </p>
          </div>

          <StepIndicator />

          <div className="space-y-2 mb-4">
            <Message type="error" message={error} />
            <Message type="success" message={success} />
          </div>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          {step === 1 && (
            <p className="text-center text-sm text-emerald-200/80 mt-4">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-white font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
        <div className="text-center mt-8">
          <p className="text-emerald-200/40 text-xs tracking-wider">
            © {new Date().getFullYear()} TracePoint. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;