import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b px-8 py-5 flex justify-between items-center shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              User Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Welcome to TracePoint Missing Person Reporting System
            </p>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-slate-800">
                Welcome Back
              </p>
              <p className="text-sm text-gray-500">
                Registered User
              </p>
            </div>

            <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
              U
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;