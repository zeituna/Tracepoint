import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-amber-200/15 bg-[linear-gradient(90deg,rgba(4,27,20,0.98),rgba(7,43,30,0.96))] px-6 py-3 text-white">
      <div className="flex flex-col gap-2 text-sm text-emerald-100/75 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-medium text-amber-100">TracePoint v2.0</span>
          <span>© 2026 TracePoint. All rights reserved.</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#" className="transition hover:text-amber-100">Privacy Policy</a>
          <a href="#" className="transition hover:text-amber-100">Terms of Service</a>
          <a href="#" className="transition hover:text-amber-100">Help & Support</a>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-300"></span>
            <span className="text-xs text-amber-100/80">System Online</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
