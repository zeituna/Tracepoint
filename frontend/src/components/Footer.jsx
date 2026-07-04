import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Send, Shield, Lock, CheckCircle } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className="bg-[#0a1628] border-t border-blue-900/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h2 className="text-emerald-400 text-lg font-light tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                Advancing Missing Person Recovery Through Technology & Community
              </h2>
            </div>
            <p className="text-blue-200/60 text-sm leading-relaxed mb-6">
              Empowering communities, law enforcement, and families with intelligent tracking, real-time alerts, and collaborative search capabilities to accelerate the safe return of missing loved ones.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-blue-200/60 hover:text-emerald-400 transition-colors duration-300">
                <MapPin size={16} className="text-emerald-400" />
                <span>Garissa, Kenya</span>
              </div>
              <div className="flex items-center gap-3 text-blue-200/60 hover:text-emerald-400 transition-colors duration-300">
                <Phone size={16} className="text-emerald-400" />
                <span>+254 700 123 456</span>
              </div>
              <div className="flex items-center gap-3 text-blue-200/60 hover:text-emerald-400 transition-colors duration-300">
                <Mail size={16} className="text-emerald-400" />
                <span>support@tracepoint.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li><button onClick={() => handleNavigation('/dashboard')} className="text-blue-200/60 hover:text-emerald-400 transition-colors duration-300 text-sm">Dashboard</button></li>
              <li><button onClick={() => handleNavigation('/reports')} className="text-blue-200/60 hover:text-emerald-400 transition-colors duration-300 text-sm">Reports</button></li>
              <li><button onClick={() => handleNavigation('/map-tracking')} className="text-blue-200/60 hover:text-emerald-400 transition-colors duration-300 text-sm">Map Tracking</button></li>
              <li><button onClick={() => handleNavigation('/facial-recognition')} className="text-blue-200/60 hover:text-emerald-400 transition-colors duration-300 text-sm">Facial Recognition</button></li>
              <li><button onClick={() => handleNavigation('/messages')} className="text-blue-200/60 hover:text-emerald-400 transition-colors duration-300 text-sm">Messages</button></li>
              <li><button onClick={() => handleNavigation('/alerts')} className="text-blue-200/60 hover:text-emerald-400 transition-colors duration-300 text-sm">Alerts</button></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2.5">
              <li><button onClick={() => handleNavigation('/help')} className="text-blue-200/60 hover:text-emerald-400 transition-colors duration-300 text-sm">Help Center</button></li>
              <li><button onClick={() => handleNavigation('/faq')} className="text-blue-200/60 hover:text-emerald-400 transition-colors duration-300 text-sm">FAQ</button></li>
              <li><button onClick={() => handleNavigation('/contact')} className="text-blue-200/60 hover:text-emerald-400 transition-colors duration-300 text-sm">Contact Us</button></li>
            </ul>
            <h3 className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mt-6 mb-4">Legal</h3>
            <ul className="space-y-2.5">
              <li><button onClick={() => handleNavigation('/privacy')} className="text-blue-200/60 hover:text-emerald-400 transition-colors duration-300 text-sm">Privacy Policy</button></li>
              <li><button onClick={() => handleNavigation('/terms')} className="text-blue-200/60 hover:text-emerald-400 transition-colors duration-300 text-sm">Terms of Service</button></li>
              <li><button onClick={() => handleNavigation('/cookies')} className="text-blue-200/60 hover:text-emerald-400 transition-colors duration-300 text-sm">Cookie Policy</button></li>
            </ul>
          </div>

          {/* Trust & Security */}
          <div>
            <h3 className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-4">Trust & Security</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-900/20 border border-blue-800/20 hover:border-emerald-500/30 transition-all duration-300 group">
                <Lock size={18} className="text-emerald-400 mt-0.5 group-hover:text-emerald-400 transition-colors" />
                <div>
                  <p className="text-blue-200/80 text-sm font-medium">Secure System</p>
                  <p className="text-blue-300/50 text-xs">256-bit SSL encryption</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-900/20 border border-blue-800/20 hover:border-emerald-500/30 transition-all duration-300 group">
                <Shield size={18} className="text-emerald-400 mt-0.5 group-hover:text-emerald-400 transition-colors" />
                <div>
                  <p className="text-blue-200/80 text-sm font-medium">Data Protection</p>
                  <p className="text-blue-300/50 text-xs">GDPR compliant</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-900/20 border border-blue-800/20 hover:border-emerald-500/30 transition-all duration-300 group">
                <CheckCircle size={18} className="text-emerald-400 mt-0.5 group-hover:text-emerald-400 transition-colors" />
                <div>
                  <p className="text-blue-200/80 text-sm font-medium">Verified Platform</p>
                  <p className="text-blue-300/50 text-xs">Trusted by experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-blue-800/30 mt-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">Stay Updated</h3>
              <p className="text-blue-200/60 text-sm mt-1">Get the latest updates and alerts</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2.5 bg-blue-900/30 border border-blue-700/30 rounded-lg text-blue-200 placeholder-blue-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent w-full sm:w-72 transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-500 text-[#0a1628] rounded-lg font-semibold hover:bg-emerald-400 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send size={16} />
                Subscribe
              </button>
            </form>
            {subscribed && <div className="text-emerald-400 text-sm animate-pulse">✓ Subscribed successfully!</div>}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800/30 mt-6 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-blue-200/50 text-xs tracking-wide">
              © {new Date().getFullYear()} Advanced Missing Person Recovery & Tracking System. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-blue-200/50 text-xs">
              <button onClick={() => handleNavigation('/privacy')} className="hover:text-emerald-400 transition-colors duration-300">Privacy</button>
              <button onClick={() => handleNavigation('/terms')} className="hover:text-emerald-400 transition-colors duration-300">Terms</button>
              <button onClick={() => handleNavigation('/cookies')} className="hover:text-emerald-400 transition-colors duration-300">Cookies</button>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-blue-200/50">Operational</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
