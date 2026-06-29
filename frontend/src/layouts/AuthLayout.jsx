import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-3xl font-bold text-primary-600 dark:text-primary-400">
            <span className="bg-primary-600 text-white px-2 py-1 rounded-lg text-2xl">TP</span>
            TracePoint
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Missing Person Reporting & Tracking System
          </p>
        </div>
        <Suspense fallback={
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        }>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}

export default AuthLayout
