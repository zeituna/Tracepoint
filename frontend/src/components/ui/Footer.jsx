import React from 'react'
import { Heart, Mail, MapPin, Phone, Clock, Shield, Globe, Send, Sparkles } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-green-600 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-green-500/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold flex items-center gap-2 justify-center md:justify-start">
                <Sparkles size={20} />
                Stay Updated
              </h3>
              <p className="text-green-100 text-sm mt-1">
                Subscribe to get the latest updates and alerts
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
              />
              <button className="px-6 py-2.5 bg-white text-green-600 font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 whitespace-nowrap hover:bg-green-50">
                <Send size={16} />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm">
                TP
              </div>
              <span className="text-xl font-bold">TracePoint</span>
            </div>
            <p className="text-green-100 text-sm leading-relaxed">
              A comprehensive Missing Person Reporting & Tracking System designed to help bring loved ones home safely.
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-green-100">
                <MapPin size={16} className="flex-shrink-0" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-green-100">
                <Phone size={16} className="flex-shrink-0" />
                <span>+254 700 123 456</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-green-100">
                <Mail size={16} className="flex-shrink-0" />
                <span>support@tracepoint.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-green-100">
                <Clock size={16} className="flex-shrink-0" />
                <span>24/7 Emergency Support</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
              <div className="flex gap-2">
                  <a
                    key={index}
                    href="#"
                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl hover:scale-110 transition-all duration-300"
                  >
                    <span className="text-white/80 text-sm">{social.charAt(0)}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-white/50 rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {['Dashboard', 'Reports', 'Map Tracking', 'Facial Recognition', 'Messages', 'Alerts'].map((link, index) => (
                <li key={index}>
                  <a
                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-green-100 hover:text-white transition-all duration-200 flex items-center gap-1.5 group hover:translate-x-1"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-all">›</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-white/50 rounded-full"></span>
              Support
            </h4>
            <ul className="space-y-2.5">
              {['Help Center', 'FAQ', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, index) => (
                <li key={index}>
                  <a
                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-green-100 hover:text-white transition-all duration-200 flex items-center gap-1.5 group hover:translate-x-1"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-all">›</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Security */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-white/50 rounded-full"></span>
              Trust & Security
            </h4>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-white" />
                  <div>
                    <p className="text-sm font-medium text-white">Secure System</p>
                    <p className="text-xs text-green-200">256-bit SSL encryption</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-white" />
                  <div>
                    <p className="text-sm font-medium text-white">Trusted Platform</p>
                    <p className="text-xs text-green-200">Verified by security experts</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-200">
                <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                All Systems Operational
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-500/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-green-200">
              © {currentYear} TracePoint. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-green-200 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">Cookies</a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">Sitemap</a>
            </div>

            <div className="flex items-center gap-2 text-sm text-green-200">
              <Heart size={14} className="text-white" />
              <span>Made with love for a safer community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
