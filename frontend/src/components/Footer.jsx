import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-emerald-900 border-t border-emerald-800 px-6 py-4">
      <div className="max-w-7xl mx-auto text-center text-sm">
        <span className="text-emerald-300">
          © {new Date().getFullYear()} 
        </span>
        <span className="font-semibold text-emerald-400"> TRACEPOINT</span>
        <span className="text-emerald-300">. Missing Person Tracking and Reporting System. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
