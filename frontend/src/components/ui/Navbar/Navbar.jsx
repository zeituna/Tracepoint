import React from 'react'
import { Menu, Bell, Sun, Moon, User } from 'lucide-react'

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="relative h-16 flex items-center justify-between px-4 md:px-6 flex-shrink-0 border-b border-amber-200/10 bg-[linear-gradient(90deg,rgba(6,45,32,0.98),rgba(8,57,39,0.96))] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(251,191,36,0.16),transparent_25%)] pointer-events-none"></div>

      <div className="relative z-10 flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg border border-amber-200/10 bg-white/[0.03] text-amber-100 transition-colors"
        >
          <Menu size={22} />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-lg font-semibold text-white tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
            Dashboard
          </h2>
          <p className="text-[10px] uppercase tracking-[0.18em] text-amber-100/65">Executive Control</p>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-3 md:gap-4">
        <button className="p-2 rounded-lg border border-amber-200/10 bg-white/[0.03] text-amber-100/80 hover:text-amber-50 transition-colors">
          <Sun size={18} />
        </button>

        <button className="relative p-2 rounded-lg border border-amber-200/10 bg-white/[0.03] text-amber-100/80 hover:text-amber-50 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-300 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-amber-200/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-amber-100/65">Administrator</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[linear-gradient(135deg,rgba(252,211,77,0.85),rgba(245,158,11,0.9))] flex items-center justify-center text-emerald-950 shadow-[0_0_16px_rgba(245,158,11,0.35)] font-semibold">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
