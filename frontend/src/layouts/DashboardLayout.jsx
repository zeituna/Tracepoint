import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/ui/Sidebar/Sidebar'
import Navbar from '../components/ui/Navbar/Navbar'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-950">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
