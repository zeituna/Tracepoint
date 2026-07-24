import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import PublicLayout from './components/PublicLayout';

// ─── Auth pages ──────────────────────────────────────────────
import Login from './pages/Login';
import UserRegister from './pages/UserRegister';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// ─── Private pages ──────────────────────────────────────────
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Messages from './pages/Messages';
import Chat from './pages/Chat'; // ← Added Chat import
import AdminApproval from './pages/AdminApproval';
import Users from './pages/Users';
import Partners from './pages/Partners';
import MapTracking from './pages/MapTracking';
import FacialRecognition from './pages/FacialRecognition';
import Alerts from './pages/Alerts';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Organizations from './pages/Organizations';
import PoliceOfficers from './pages/PoliceOfficers';
import RolesPermissions from './pages/RolesPermissions';
import GpsTracking from './pages/GpsTracking';

// ─── New pages for sidebar sections ─────────────────────────
import AuditLogs from './pages/AuditLogs';
import SystemHealth from './pages/SystemHealth';
import BackupRestore from './pages/BackupRestore';

// ─── Public pages ───────────────────────────────────────────
import HomePage from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Services from './pages/public/Services';
import Features from './pages/public/Features';
import Faq from './pages/public/Faq';
import Privacy from './pages/public/Privacy';
import Terms from './pages/public/Terms';
import ReportMissing from './pages/public/ReportMissing';
import SearchMissing from './pages/public/SearchMissing';
import CaseDetails from './pages/public/CaseDetails';
import SuccessStories from './pages/public/SuccessStories';
import SafetyTips from './pages/public/SafetyTips';
import Resources from './pages/public/Resources';

// ─── Error pages ────────────────────────────────────────────
import NotFound from './pages/NotFound';
import Forbidden from './pages/Forbidden';

// ─── Private route guard ────────────────────────────────────
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  if (!token) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/features" element={<PublicLayout><Features /></PublicLayout>} />
        <Route path="/faq" element={<PublicLayout><Faq /></PublicLayout>} />
        <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
        <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
        <Route path="/report-missing" element={<PublicLayout><ReportMissing /></PublicLayout>} />
        <Route path="/search-missing" element={<PublicLayout><SearchMissing /></PublicLayout>} />
        <Route path="/case/:id" element={<PublicLayout><CaseDetails /></PublicLayout>} />
        <Route path="/success-stories" element={<PublicLayout><SuccessStories /></PublicLayout>} />
        <Route path="/safety-tips" element={<PublicLayout><SafetyTips /></PublicLayout>} />
        <Route path="/resources" element={<PublicLayout><Resources /></PublicLayout>} />
        <Route path="/partners" element={<PublicLayout><Partners /></PublicLayout>} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Private (with Layout) */}
        <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><Layout><Reports /></Layout></PrivateRoute>} />
        <Route path="/messages" element={<PrivateRoute><Layout><Messages /></Layout></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><Layout><Chat /></Layout></PrivateRoute>} /> {/* ← Added Chat route */}
<Route path="/admin-approval" element={<PrivateRoute><Layout><AdminApproval /></Layout></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><Layout><Users /></Layout></PrivateRoute>} />
        <Route path="/users?role=police" element={<PrivateRoute><Layout><PoliceOfficers /></Layout></PrivateRoute>} />
        <Route path="/organizations" element={<PrivateRoute><Layout><Organizations /></Layout></PrivateRoute>} />
        <Route path="/settings?tab=roles" element={<PrivateRoute><Layout><RolesPermissions /></Layout></PrivateRoute>} />
        <Route path="/map-tracking" element={<PrivateRoute><Layout><MapTracking /></Layout></PrivateRoute>} />
        <Route path="/gps-tracking" element={<PrivateRoute><Layout><GpsTracking /></Layout></PrivateRoute>} />
        <Route path="/facial-recognition" element={<PrivateRoute><Layout><FacialRecognition /></Layout></PrivateRoute>} />
        <Route path="/alerts" element={<PrivateRoute><Layout><Alerts /></Layout></PrivateRoute>} />
        <Route path="/statistics" element={<PrivateRoute><Layout><Statistics /></Layout></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Layout><Settings /></Layout></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Layout><Profile /></Layout></PrivateRoute>} />

        {/* ─── New routes for sidebar sections ──────────────── */}
        <Route path="/audit-logs" element={<PrivateRoute><Layout><AuditLogs /></Layout></PrivateRoute>} />
        <Route path="/system-health" element={<PrivateRoute><Layout><SystemHealth /></Layout></PrivateRoute>} />
        <Route path="/backup-restore" element={<PrivateRoute><Layout><BackupRestore /></Layout></PrivateRoute>} />

        {/* Error pages */}
        <Route path="/403" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;