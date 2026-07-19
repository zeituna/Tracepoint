import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

// Authentication
import Login from '../pages/Login'
import Register from '../pages/UserRegister'

// Admin
import Dashboard from '../pages/Dashboard'
import DashboardLayout from '../layouts/DashboardLayout'

// User
import UserLayout from '../layouts/UserLayout'
import UserDashboard from '../pages/user/UserDashboard'
import ReportMissing from '../pages/user/ReportMissing'
import MyReports from '../pages/user/MyReports'
import Profile from '../pages/user/Profile'

// Other
import NotFound from '../pages/NotFound'

export const router = createBrowserRouter([
  // Authentication
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },

  // ==========================
  // ADMIN DASHBOARD
  // ==========================
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },

  // ==========================
  // USER DASHBOARD
  // ==========================
  {
    path: '/user',
    element: <UserLayout />,
    children: [
      {
        path: 'dashboard',
        element: <UserDashboard />,
      },
      {
        path: 'report-missing',
        element: <ReportMissing />,
      },
      {
        path: 'my-reports',
        element: <MyReports />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },

  // 404
  {
    path: '*',
    element: <NotFound />,
  },
])