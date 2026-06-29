import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    }>
      <Outlet />
    </Suspense>
  )
}

export default RootLayout
