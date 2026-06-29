import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'
import MapTracking from './pages/MapTracking'
import FacialRecognition from './pages/FacialRecognition'
import Messages from './pages/Messages'
import Alerts from './pages/Alerts'
import Statistics from './pages/Statistics'
import Users from './pages/Users'
import Organizations from './pages/Organizations'
import CaseManagement from './pages/CaseManagement'
import ReportsAnalytics from './pages/ReportsAnalytics'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/map-tracking" element={<MapTracking />} />
        <Route path="/facial-recognition" element={<FacialRecognition />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/users" element={<Users />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/case-management" element={<CaseManagement />} />
        <Route path="/reports-analytics" element={<ReportsAnalytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
