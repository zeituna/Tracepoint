import React from "react";
import { Link } from "react-router-dom";
import { Bell, UserCircle } from "lucide-react";
import UserSidebar from "../UserSidebar";
import Footer from "./Footer";

// Layout for the /user/* routes. Kept separate from the admin Layout+Sidebar
// on purpose — they used to share one Layout, which put the admin sidebar
// in front of regular users.
const UserLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserSidebar />

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
          <div className="text-sm text-gray-500">TracePoint / My Account</div>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-indigo-600">
              <Bell size={20} />
            </button>
            <Link
              to="/user/profile"
              className="flex items-center gap-2 text-gray-700 hover:text-indigo-600"
            >
              <UserCircle size={22} />
              <span className="hidden sm:inline text-sm font-medium">Profile</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
