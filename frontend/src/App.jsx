import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import UserLayout from "./components/layout/UserLayout";
import PublicLayout from "./components/PublicLayout";

// Authentication
import Login from "./pages/Login";
import UserRegister from "./pages/UserRegister";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Public Pages
import HomePage from "./pages/public/Home";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Services from "./pages/public/Services";
import Features from "./pages/public/Features";
import Faq from "./pages/public/Faq";
import Privacy from "./pages/public/Privacy";
import Terms from "./pages/public/Terms";
import ReportMissing from "./pages/public/ReportMissing";
import SearchMissing from "./pages/public/SearchMissing";
import CaseDetails from "./pages/public/CaseDetails";
import SuccessStories from "./pages/public/SuccessStories";
import SafetyTips from "./pages/public/SafetyTips";
import Resources from "./pages/public/Resources";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Reports from "./pages/admin/Reports";
import Messages from "./pages/admin/Messages";
import Users from "./pages/admin/Users";
import Organizations from "./pages/admin/Organizations";
import MapTracking from "./pages/admin/MapTracking";
import GpsTracking from "./pages/admin/GpsTracking";
import FacialRecognition from "./pages/admin/FacialRecognition";
import Alerts from "./pages/admin/Alerts";
import Statistics from "./pages/admin/Statistics";
import Settings from "./pages/admin/Settings";
import CaseManagement from "./pages/admin/CaseManagement";
import ReportsAnalytics from "./pages/admin/ReportsAnalytics";

// User Pages
import UserDashboard from "./pages/user/UserDashboard";
import UserProfile from "./pages/user/Profile";
import MyReports from "./pages/user/MyReports";
import UserReportMissing from "./pages/user/ReportMissing";

// Shared
import Partners from "./pages/Partners";
import Profile from "./pages/Profile";

// Error Pages
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";
import ServerError from "./pages/ServerError";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ========================= */}
        {/* PUBLIC ROUTES */}
        {/* ========================= */}

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

        {/* ========================= */}
        {/* AUTH */}
        {/* ========================= */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ========================= */}
        {/* ADMIN DASHBOARD */}
        {/* ========================= */}

        <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><Layout><Reports /></Layout></PrivateRoute>} />
        <Route path="/messages" element={<PrivateRoute><Layout><Messages /></Layout></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><Layout><Users /></Layout></PrivateRoute>} />
        <Route path="/organizations" element={<PrivateRoute><Layout><Organizations /></Layout></PrivateRoute>} />
        <Route path="/map-tracking" element={<PrivateRoute><Layout><MapTracking /></Layout></PrivateRoute>} />
        <Route path="/gps-tracking" element={<PrivateRoute><Layout><GpsTracking /></Layout></PrivateRoute>} />
        <Route path="/facial-recognition" element={<PrivateRoute><Layout><FacialRecognition /></Layout></PrivateRoute>} />
        <Route path="/alerts" element={<PrivateRoute><Layout><Alerts /></Layout></PrivateRoute>} />
        <Route path="/statistics" element={<PrivateRoute><Layout><Statistics /></Layout></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Layout><Settings /></Layout></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Layout><Profile /></Layout></PrivateRoute>} />
        <Route path="/case-management" element={<PrivateRoute><Layout><CaseManagement /></Layout></PrivateRoute>} />
        <Route path="/reports-analytics" element={<PrivateRoute><Layout><ReportsAnalytics /></Layout></PrivateRoute>} />

        {/* ========================= */}
        {/* USER DASHBOARD */}
        {/* ========================= */}

        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute>
              <UserLayout>
                <UserDashboard />
              </UserLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/user/my-reports"
          element={
            <PrivateRoute>
              <UserLayout>
                <MyReports />
              </UserLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/user/profile"
          element={
            <PrivateRoute>
              <UserLayout>
                <UserProfile />
              </UserLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/user/report-missing"
          element={
            <PrivateRoute>
              <UserLayout>
                <UserReportMissing />
              </UserLayout>
            </PrivateRoute>
          }
        />

        {/* ========================= */}
        {/* ERROR PAGES */}
        {/* ========================= */}

        <Route path="/403" element={<Forbidden />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/500" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;