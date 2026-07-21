import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle,
  Phone, UserCheck, Shield, AlertCircle, Users, Loader2
} from 'lucide-react';

// ---- API base ----
const getApiBase = () => {
  let base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  base = base.replace(/\/+$/, '');
  if (!base.endsWith('/api')) base += '/api';
  return base;
};
const API_BASE = getApiBase();

const UserRegister = () => {
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
    role: 'volunteer',
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

  // ─── API calls ──────────────────────────────────────────────
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
      const res = await fetch(`${API_BASE}/auth/register/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, full_name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send code');
      setSuccess('Verification code sent to your email');
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
      const res = await fetch(`${API_BASE}/auth/register/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Verification failed');
      setSuccess('Email verified!');
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/register/resend-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to resend');
      setSuccess('New code sent');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const { username, password, confirmPassword, email, phone, full_name, role } = formData;
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
      const res = await fetch(`${API_BASE}/auth/register/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username, email, phone, password, full_name, role,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      setSuccess('Account created! Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── UI ──────────────────────────────────────────────────────
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-4 mb-6">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              s === step
                ? 'bg-emerald-500 text-white scale-105 shadow-lg shadow-emerald-200/50'
                : s < step
                ? 'bg-emerald-200 text-emerald-700'
                : 'bg-white/20 text-white/60'
            }`}
          >
            {s < step ? <CheckCircle size={16} /> : s}
          </div>
          {s < 3 && (
            <div className={`w-12 h-0.5 mx-1 transition-colors ${s < step ? 'bg-emerald-300' : 'bg-white/20'}`} />
          )}
        </div>
      ))}
    </div>
  );

  // ─── Reusable input component ──────────────────────────────
  const InputField = ({ icon: Icon, label, name, type, placeholder, value, onChange, maxLength, required }) => (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative group">
        <Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          required={required}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
        />
      </div>
    </div>
  );

  const renderStep1 = () => (
    <form onSubmit={handleSendCode} className="space-y-5 animate-fadeIn">
      <InputField
        icon={User}
        label="Full Name"
        name="full_name"
        type="text"
        placeholder="Enter your full name"
        value={formData.full_name}
        onChange={handleChange}
        required
      />
      <InputField
        icon={Mail}
        label="Email Address"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <InputField
        icon={Phone}
        label="Phone Number"
        name="phone"
        type="tel"
        placeholder="+254700000000"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-200 shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending code...
          </>
        ) : (
          <>
            Send Verification Code
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );

  const renderStep2 = () => (
    <form onSubmit={handleVerifyCode} className="space-y-5 animate-fadeIn">
      <InputField
        icon={Shield}
        label="Verification Code"
        name="code"
        type="text"
        placeholder="Enter 6‑digit code"
        value={formData.code}
        onChange={handleChange}
        maxLength="6"
        required
      />
      <p className="text-xs text-gray-500 -mt-3">Code sent to {formData.email}</p>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-3.5 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify Code'
          )}
        </button>
        <button
          type="button"
          onClick={handleResendCode}
          disabled={isLoading}
          className="px-5 py-3.5 bg-white/90 text-gray-700 rounded-xl font-medium hover:bg-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          Resend
        </button>
      </div>
    </form>
  );

  const renderStep3 = () => (
    <form onSubmit={handleComplete} className="space-y-5 animate-fadeIn">
      <InputField
        icon={UserCheck}
        label="Username"
        name="username"
        type="text"
        placeholder="Choose a username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <InputField
        icon={Lock}
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Create a strong password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <InputField
        icon={Lock}
        label="Confirm Password"
        name="confirmPassword"
        type={showConfirmPassword ? 'text' : 'password'}
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Account Type</label>
        <div className="relative">
          <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 appearance-none hover:border-gray-300"
          >
            <option value="volunteer">Volunteer</option>
            <option value="admin">Admin</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">Choose your account type – Volunteer or Admin.</p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-200 shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating account...
          </>
        ) : (
          <>
            Create Account
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );

  const Message = ({ type, message }) => {
    if (!message) return null;
    const bg = type === 'error'
      ? 'bg-red-50 border-red-200 text-red-600'
      : 'bg-emerald-50 border-emerald-200 text-emerald-700';
    const Icon = type === 'error' ? AlertCircle : CheckCircle;
    return (
      <div className={`flex items-center gap-2 p-3 rounded-xl border ${bg} text-sm animate-fadeIn`}>
        <Icon size={18} className="shrink-0" />
        <span>{message}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 p-4">
      <div className="w-full max-w-md">
        {/* Premium Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden animate-fadeIn">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold italic text-gray-800">TracePoint</h1>
            <p className="text-sm text-gray-500">Missing Person Reporting</p>
          </div>

          {/* Step Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {step === 1 && 'Create Account'}
              {step === 2 && 'Verify Email'}
              {step === 3 && 'Complete Profile'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {step === 1 && 'Start by providing your contact details'}
              {step === 2 && `Enter the 6-digit code sent to ${formData.email}`}
              {step === 3 && 'Almost there! Set your username, password, and account type'}
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

          {/* Sign In Link */}
          {step === 1 && (
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition"
              >
                Sign in
              </button>
            </p>
          )}
        </div>

        {/* Copyright */}
        <div className="text-center mt-6">
          <p className="text-sm font-bold text-white drop-shadow animate-fadeIn">
            © {new Date().getFullYear()} TracePoint. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;