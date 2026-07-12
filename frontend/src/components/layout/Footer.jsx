import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-3 px-6">
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>© 2026 TracePoint. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-emerald-600 transition">Privacy</a>
          <a href="#" className="hover:text-emerald-600 transition">Terms</a>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs">Online</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
