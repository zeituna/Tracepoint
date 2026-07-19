import React, { useState, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/ui/Sidebar'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return ( 
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          }>
            <Outlet />
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </div>
  )
}

export default DashboardLayout
