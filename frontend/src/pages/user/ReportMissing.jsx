import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, MapPin, Calendar, User, AlertCircle, CheckCircle } from "lucide-react";

const getApiBase = () => {
  let base = import.meta.env?.VITE_API_URL || "http://localhost:5000/api";
  base = base.replace(/\/+$/, "");
  return base.endsWith("/api") ? base : `${base}/api`;
};
const API_BASE = getApiBase();

const ReportMissing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    gender: "",
    county: "",
    last_seen_location: "",
    last_seen_date: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.full_name || !formData.last_seen_location || !formData.last_seen_date) {
      setError("Full name, last seen location, and last seen date are required.");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_BASE}/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          ...formData,
          age: formData.age ? Number(formData.age) : undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit report");
      }

      setSuccess("Report submitted successfully.");
      setTimeout(() => navigate("/user/my-reports"), 1200);
    } catch (err) {
      setError(err.message || "Network error – please try again");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="text-indigo-600" size={22} />
        <h1 className="text-xl font-bold text-gray-800">Report a Missing Person</h1>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      {success && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle size={16} /> {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <User size={14} className="inline mr-1" /> Full name *
          </label>
          <input
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-indigo-400 focus:outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              name="age"
              type="number"
              min="0"
              value={formData.age}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-indigo-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-indigo-400 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
          <input
            name="county"
            value={formData.county}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-indigo-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin size={14} className="inline mr-1" /> Last seen location *
          </label>
          <input
            name="last_seen_location"
            value={formData.last_seen_location}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-indigo-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar size={14} className="inline mr-1" /> Last seen date *
          </label>
          <input
            name="last_seen_date"
            type="date"
            value={formData.last_seen_date}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-indigo-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-indigo-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium py-3 transition"
        >
          {submitting ? "Submitting..." : "Submit report"}
        </button>
      </form>
    </div>
  );
};

export default ReportMissing;
