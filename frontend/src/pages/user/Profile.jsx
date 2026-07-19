import React from "react";

const Profile = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>

      <p className="mt-2 text-gray-600">
        Manage your personal information and account settings.
      </p>

      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-gray-500">
          Profile information will appear here.
        </p>
      </div>
    </div>
  );
};

export default Profile;
