import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
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
import Settings from './pages/Settings'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/reports" element={<Layout><Reports /></Layout>} />
        <Route path="/map-tracking" element={<Layout><MapTracking /></Layout>} />
        <Route path="/facial-recognition" element={<Layout><FacialRecognition /></Layout>} />
        <Route path="/messages" element={<Layout><Messages /></Layout>} />
        <Route path="/alerts" element={<Layout><Alerts /></Layout>} />
        <Route path="/statistics" element={<Layout><Statistics /></Layout>} />
        <Route path="/users" element={<Layout><Users /></Layout>} />
        <Route path="/organizations" element={<Layout><Organizations /></Layout>} />
        <Route path="/case-management" element={<Layout><CaseManagement /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
