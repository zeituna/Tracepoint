import React from 'react'
import { 
  Heart, 
  Github, 
  Twitter, 
  Mail, 
  MapPin, 
  Phone, 
  Clock,
  ChevronRight,
  Shield,
  Globe,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Reports', href: '/reports' },
    { name: 'Map Tracking', href: '/map-tracking' },
    { name: 'Facial Recognition', href: '/facial-recognition' },
    { name: 'Messages', href: '/messages' },
    { name: 'Alerts', href: '/alerts' },
  ]

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ]

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ]

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                TP
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                TracePoint
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              A comprehensive Missing Person Reporting & Tracking System designed to help bring loved ones home safely.
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={16} className="text-primary-500 flex-shrink-0" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Phone size={16} className="text-primary-500 flex-shrink-0" />
                <span>+254 700 123 456</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Mail size={16} className="text-primary-500 flex-shrink-0" />
                <span>support@tracepoint.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Clock size={16} className="text-primary-500 flex-shrink-0" />
                <span>24/7 Emergency Support</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Follow Us</h4>
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:scale-110 transition-all duration-300 group"
                  >
                    <social.icon size={18} className="text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 flex items-center gap-1.5 group"
                  >
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-primary-500" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></span>
              Support
            </h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 flex items-center gap-1.5 group"
                  >
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-primary-500" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Security */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></span>
              Trust & Security
            </h4>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Secure System</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">256-bit SSL encryption</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Trusted Platform</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Verified by security experts</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                All Systems Operational
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © {currentYear} TracePoint. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-xs">
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Cookies
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Sitemap
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Heart size={14} className="text-red-500" />
              <span>Made with love for a safer community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
