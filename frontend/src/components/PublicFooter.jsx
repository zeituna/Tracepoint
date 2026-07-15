import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart, Shield } from 'lucide-react';

const PublicFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TP</span>
              </span>
              TracePoint
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Helping families reunite by providing a comprehensive missing person tracking system.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
              <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              <li><Link to="/partners" className="hover:text-white transition">Partners</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/safety-tips" className="hover:text-white transition">Safety Tips</Link></li>
              <li><Link to="/success-stories" className="hover:text-white transition">Success Stories</Link></li>
              <li><Link to="/resources" className="hover:text-white transition">Resources</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={16} className="text-emerald-400" />
                <span>support@tracepoint.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={16} className="text-emerald-400" />
                <span>+254 700 123 456</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} className="text-emerald-400" />
                <span>Garissa, Kenya</span>
              </li>
            </ul>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <Shield size={14} className="text-emerald-400" />
              <span>Secure Platform</span>
              <span className="mx-1">•</span>
              <Heart size={14} className="text-emerald-400" />
              <span>Community Driven</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; 2026 TracePoint. All rights reserved. Built with ❤️ for the people of Kenya 🇰🇪</p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
