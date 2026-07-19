import React from "react";

const MyReports = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800">My Reports</h1>

      <p className="mt-2 text-gray-600">
        View all missing person reports you have submitted.
      </p>

      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-gray-500">
          You haven't submitted any reports yet.
        </p>
      </div>
    </div>
  );
};

export default MyReports;
