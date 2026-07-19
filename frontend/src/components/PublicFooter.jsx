import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Shield,
  Heart,
  Globe,
  Share2,
 
} from 'lucide-react';

const PublicFooter = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      {/* ─── Main Footer ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-200">
                TP
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">TracePoint</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Helping families reunite by providing a comprehensive missing person tracking system.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors">
                <Globe size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors">
                <Share2 size={18} />
              </a>
              {/* <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors">
                <Youtube size={18} />
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-gray-400 hover:text-emerald-400 transition text-sm">Home</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-emerald-400 transition text-sm">Services</Link></li>
              <li><Link to="/features" className="text-gray-400 hover:text-emerald-400 transition text-sm">Features</Link></li>
              <li><Link to="/partners" className="text-gray-400 hover:text-emerald-400 transition text-sm">Partners</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/safety-tips" className="text-gray-400 hover:text-emerald-400 transition text-sm">Safety Tips</Link></li>
              <li><Link to="/success-stories" className="text-gray-400 hover:text-emerald-400 transition text-sm">Success Stories</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-emerald-400 transition text-sm">FAQ</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-emerald-400 transition text-sm">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Mail size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>support@tracepoint.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Phone size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>+254 700 123 456</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Garissa, Kenya</span>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <Shield size={14} className="text-emerald-400" />
              <span>Secure Platform</span>
              <span className="w-px h-4 bg-gray-700" />
              <Heart size={14} className="text-emerald-400" />
              <span>Community Driven</span>
            </div>
          </div>
        </div>

        {/* ─── Bottom Bar ────────────────────────────────────────── */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TracePoint. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="text-gray-500 hover:text-emerald-400 transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-emerald-400 transition">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-gray-500 hover:text-emerald-400 transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;