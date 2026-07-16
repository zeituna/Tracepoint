import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, ArrowRight } from 'lucide-react';

// Works with Vite (import.meta.env) and CRA (process.env)
const API_BASE = import.meta.env?.VITE_API_URL || process?.env?.REACT_APP_API_URL || 'http://localhost:5000/api';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid username or password');
      }

      const { token, user } = data;
      if (!token || !user) {
        throw new Error('Invalid response from server');
      }

      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Network error – please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              TracePoint
            </h1>
            <p className="text-emerald-200/90 text-sm mt-1 font-light" style={{ fontFamily: "'Inter', sans-serif", fontStyle: 'italic' }}>
              Missing Person Reporting & Tracking System
            </p>
            <div className="w-20 h-1 bg-emerald-400/50 mx-auto rounded-full mt-3"></div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Welcome Back
            </h2>
            <p className="text-emerald-200/80 text-sm mt-1 font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-emerald-100/90 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                Username or Email
              </label>
              <div className="relative group">
                <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300/70 group-focus-within:text-emerald-300 transition-colors" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username or email"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent transition-all duration-300"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-100/90 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                Password
              </label>
              <div className="relative group">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300/70 group-focus-within:text-emerald-300 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent transition-all duration-300"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-300/70 hover:text-emerald-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-emerald-200/80 cursor-pointer" style={{ fontFamily: "'Inter', sans-serif" }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/30 bg-white/10 text-emerald-500 focus:ring-emerald-400 focus:ring-offset-0"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-sm text-emerald-200/80 hover:text-white transition-colors font-medium" style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-emerald-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <p className="text-center text-sm text-emerald-200/80 mt-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-white font-semibold hover:underline transition-colors"
              >
                Sign up
              </button>
            </p>
          </form>
        </div>

        <div className="text-center mt-8">
          <p className="text-emerald-200/40 text-xs tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
            © {new Date().getFullYear()} TracePoint. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;