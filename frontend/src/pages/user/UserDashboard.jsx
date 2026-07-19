import React from "react";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to TracePoint
        </h1>

        <p className="text-gray-600 mt-2">
          Report and track missing persons easily.
        </p>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700">
              My Reports
            </h2>
            <p className="text-4xl font-bold text-indigo-600 mt-3">0</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700">
              Pending Cases
            </h2>
            <p className="text-4xl font-bold text-yellow-500 mt-3">0</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700">
              Resolved Cases
            </h2>
            <p className="text-4xl font-bold text-green-600 mt-3">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;