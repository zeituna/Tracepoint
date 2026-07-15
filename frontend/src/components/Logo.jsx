import React from 'react';

const Logo = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-lg',
    lg: 'w-12 h-12 text-xl'
  };

  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/35 flex-shrink-0`}>
      <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 13c0 3-7 9-7 9s-7-6-7-9c0-3.87 3.13-7 7-7s7 3.13 7 7z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6"/>
      </svg>
    </div>
  );
};

export default Logo;
