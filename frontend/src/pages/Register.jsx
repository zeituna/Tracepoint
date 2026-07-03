import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';
import Logo from '../components/Logo';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-3">
            <Logo size="lg" />
            <div className="text-left">
              <h1 className="text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                TracePoint
              </h1>
              <p className="text-emerald-200/90 text-sm font-light tracking-wide" style={{ fontFamily: "'Inter', sans-serif", fontStyle: 'italic' }}>
                Missing Person Reporting & Tracking System
              </p>
            </div>
          </div>
          <div className="w-20 h-1 bg-emerald-400/50 mx-auto rounded-full mt-2"></div>
        </div>

        {/* Register Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Create Account
            </h2>
            <p className="text-emerald-200/80 text-sm mt-1 font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
              Join us in helping bring loved ones home
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-emerald-100/90 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                Full Name
              </label>
              <div className="relative group">
                <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300/70 group-focus-within:text-emerald-300 transition-colors" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent transition-all duration-300"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-emerald-100/90 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                Email Address
              </label>
              <div className="relative group">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300/70 group-focus-within:text-emerald-300 transition-colors" />
                <input
                  type="email"
                  placeholder="leila@gmail.com"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent transition-all duration-300"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-emerald-100/90 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                Password
              </label>
              <div className="relative group">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300/70 group-focus-within:text-emerald-300 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-emerald-100/90 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                Confirm Password
              </label>
              <div className="relative group">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300/70 group-focus-within:text-emerald-300 transition-colors" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent transition-all duration-300"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-300/70 hover:text-emerald-200 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-white/30 bg-white/10 text-emerald-500 focus:ring-emerald-400 focus:ring-offset-0"
                required
              />
              <label className="text-sm text-emerald-200/80" style={{ fontFamily: "'Inter', sans-serif" }}>
                I agree to the{' '}
                <button type="button" className="text-white hover:underline transition-colors">
                  Terms of Service
                </button>
                {' '}and{' '}
                <button type="button" className="text-white hover:underline transition-colors">
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Register Button */}
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
                  Creating account...
                </span>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-emerald-200/80 mt-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-white font-semibold hover:underline transition-colors"
              >
                Sign in
              </button>
            </p>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-emerald-200/40 text-xs tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
            © {new Date().getFullYear()} TracePoint. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
