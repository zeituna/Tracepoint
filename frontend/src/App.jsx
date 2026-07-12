import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Messages from './pages/Messages';
import Users from './pages/Users';
import Organizations from './pages/Organizations';
import MapTracking from './pages/MapTracking';
import FacialRecognition from './pages/FacialRecognition';
import Alerts from './pages/Alerts';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import CRUDDemo from './pages/CRUDDemo';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  if (!token) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Layout>
                <Reports />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <PrivateRoute>
              <Layout>
                <Messages />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Layout>
                <Users />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/organizations"
          element={
            <PrivateRoute>
              <Layout>
                <Organizations />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/map-tracking"
          element={
            <PrivateRoute>
              <Layout>
                <MapTracking />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/facial-recognition"
          element={
            <PrivateRoute>
              <Layout>
                <FacialRecognition />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <PrivateRoute>
              <Layout>
                <Alerts />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/statistics"
          element={
            <PrivateRoute>
              <Layout>
                <Statistics />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Layout>
                <Settings />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/crud-demo"
          element={
            <PrivateRoute>
              <Layout>
                <CRUDDemo />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
