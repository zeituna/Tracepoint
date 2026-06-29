import React from 'react'
import { Menu, Bell, Sun, Moon, User } from 'lucide-react'

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu size={22} className="text-gray-700 dark:text-gray-300" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white hidden sm:block">Dashboard</h2>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <Sun size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
        
        <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <Bell size={20} className="text-gray-600 dark:text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-800 dark:text-white">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
          </div>
          <div className="w-9 h-9 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
