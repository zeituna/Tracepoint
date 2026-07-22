// src/pages/Reports.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Search, Eye, AlertCircle, X, CheckCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Reports = () => {
  const [reports] = useState([
    { id: 1, title: 'Missing child in Kibera', location: 'Nairobi', status: 'active', date: '2026-07-18' },
    { id: 2, title: 'Elderly woman missing', location: 'Garissa', status: 'resolved', date: '2026-07-17' },
    { id: 3, title: 'Teenager last seen in Mombasa', location: 'Mombasa', status: 'pending', date: '2026-07-16' },
  ]);

  // ─── New Report Modal State ──────────────────────────────────
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    date: '',
    contact: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  // ─── Validation Functions ─────────────────────────────────────
  const validateField = (name, value) => {
    switch(name) {
      case 'title':
        if (!value || value.trim().length === 0) {
          return 'Title is required';
        }
        if (value.trim().length < 3) {
          return 'Title must be at least 3 characters';
        }
        if (value.trim().length > 100) {
          return 'Title cannot exceed 100 characters';
        }
        return '';
      
      case 'location':
        if (!value || value.trim().length === 0) {
          return 'Location is required';
        }
        if (value.trim().length < 2) {
          return 'Location must be at least 2 characters';
        }
        return '';
      
      case 'description':
        if (!value || value.trim().length === 0) {
          return 'Description is required';
        }
        if (value.trim().length < 10) {
          return 'Description must be at least 10 characters';
        }
        if (value.trim().length > 500) {
          return 'Description cannot exceed 500 characters';
        }
        return '';
      
      case 'date':
        if (!value) {
          return 'Date is required';
        }
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate > today) {
          return 'Date cannot be in the future';
        }
        return '';
      
      case 'contact':
        if (!value || value.trim().length === 0) {
          return 'Contact number is required';
        }
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(value)) {
          return 'Please enter a valid phone number (e.g., +254700000000)';
        }
        return '';
      
      default:
        return '';
    }
  };

  // ─── Check if entire form is valid ────────────────────────────
  const isFormValid = () => {
    const { title, location, description, date, contact } = formData;
    return title && title.trim().length >= 3 &&
           location && location.trim().length >= 2 &&
           description && description.trim().length >= 10 &&
           date &&
           contact && contact.trim().length >= 10;
  };

  // ─── Handle Input Change ──────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSubmitError('');
    setSubmitSuccess('');
    
    // Clear field error when user types
    if (fieldErrors[name]) {
      const error = validateField(name, value);
      setFieldErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // ─── Handle Field Blur ────────────────────────────────────────
  const handleFieldBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setFieldErrors(prev => ({ ...prev, [name]: error }));
  };

  // ─── Validate All Fields on Submit ────────────────────────────
  const validateAllFields = () => {
    const errors = {};
    const fields = ['title', 'location', 'description', 'date', 'contact'];
    
    fields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        errors[field] = error;
      }
    });
    
    setFieldErrors(errors);
    setTouchedFields({
      title: true,
      location: true,
      description: true,
      date: true,
      contact: true
    });
    
    return Object.keys(errors).length === 0;
  };

  // ─── Handle Form Submit ──────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    // Validate all fields
    if (!validateAllFields()) {
      // Focus the first field with error
      const firstErrorField = document.querySelector('.input-error');
      if (firstErrorField) {
        firstErrorField.focus();
      }
      setSubmitError('Please fix all errors before submitting');
      return;
    }

    // Check if form is completely filled
    if (!isFormValid()) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Success
      setSubmitSuccess('Report submitted successfully!');
      
      // Reset form after delay
      setTimeout(() => {
        setFormData({
          title: '',
          location: '',
          description: '',
          date: '',
          contact: '',
        });
        setFieldErrors({});
        setTouchedFields({});
        setSubmitSuccess('');
        setIsSubmitting(false);
        setShowModal(false);
      }, 1500);
    }, 1500);
  };

  // ─── Reset Modal ─────────────────────────────────────────────
  const handleCloseModal = () => {
    if (!isSubmitting) {
      setShowModal(false);
      setFormData({
        title: '',
        location: '',
        description: '',
        date: '',
        contact: '',
      });
      setFieldErrors({});
      setTouchedFields({});
      setSubmitError('');
      setSubmitSuccess('');
    }
  };

  // ─── Input Field Component ────────────────────────────────────
  const InputField = ({ 
    label, 
    name, 
    type = 'text', 
    placeholder, 
    value, 
    onChange, 
    onBlur,
    required = true,
    error,
    touched,
    rows,
    maxLength
  }) => {
    const showError = touched && error;
    const isValid = touched && value && !error;

    return (
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          {type === 'textarea' ? (
            <textarea
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              rows={rows || 4}
              maxLength={maxLength}
              className={`w-full px-4 py-2.5 bg-white border ${
                showError ? 'border-red-300 focus:ring-red-500 input-error' : 
                isValid ? 'border-emerald-400' : 
                'border-gray-200 focus:ring-emerald-500'
              } rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition resize-none`}
            />
          ) : (
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              maxLength={maxLength}
              className={`w-full px-4 py-2.5 bg-white border ${
                showError ? 'border-red-300 focus:ring-red-500 input-error' : 
                isValid ? 'border-emerald-400' : 
                'border-gray-200 focus:ring-emerald-500'
              } rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition`}
            />
          )}
          {isValid && (
            <CheckCircle size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" />
          )}
          {maxLength && (
            <div className="text-xs text-gray-400 mt-1 text-right">
              {value ? value.length : 0}/{maxLength}
            </div>
          )}
        </div>
        {showError && (
          <p className="flex items-center gap-1.5 text-sm text-red-500 mt-1">
            <AlertCircle size={14} />
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-slate-50/80 to-gray-100/80 min-h-screen">
      <PageHeader 
        icon={FileText}
        title="Reports"
        subtitle="Track all missing person reports"
        actions={
          <>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition shadow-sm">
              <Search size={16} />
              Search
            </button>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition shadow-sm"
            >
              <Plus size={16} />
              New Report
            </button>
          </>
        }
      />

      {/* ─── Reports Table ────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50/80 border-b border-gray-100">
            <tr className="text-left text-xs text-gray-400 uppercase tracking-wider">
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Location</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {reports.map((report, i) => (
              <motion.tr 
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-gray-50 transition group"
              >
                <td className="p-4 text-sm text-gray-500 font-mono">{report.id}</td>
                <td className="p-4 text-sm font-medium text-gray-800">{report.title}</td>
                <td className="p-4 text-sm text-gray-500">{report.location}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    report.status === 'active' ? 'bg-red-100 text-red-700' : 
                    report.status === 'resolved' ? 'bg-green-100 text-green-700' : 
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-400">{report.date}</td>
                <td className="p-4">
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                    <Eye size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ─── New Report Modal ────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-100 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">New Missing Person Report</h2>
                  <p className="text-sm text-gray-500 mt-1">Fill in all required fields to create a report</p>
                </div>
                <button
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* ─── Title ────────────────────────────────────── */}
              <InputField
                label="Title"
                name="title"
                type="text"
                placeholder="e.g., Missing child in Kibera"
                value={formData.title}
                onChange={handleInputChange}
                onBlur={handleFieldBlur}
                error={fieldErrors.title}
                touched={touchedFields.title}
                maxLength={100}
                required
              />

              {/* ─── Location ────────────────────────────────── */}
              <InputField
                label="Location"
                name="location"
                type="text"
                placeholder="e.g., Nairobi, Kenya"
                value={formData.location}
                onChange={handleInputChange}
                onBlur={handleFieldBlur}
                error={fieldErrors.location}
                touched={touchedFields.location}
                maxLength={100}
                required
              />

              {/* ─── Description ────────────────────────────── */}
              <InputField
                label="Description"
                name="description"
                type="textarea"
                placeholder="Describe the missing person and circumstances in detail..."
                value={formData.description}
                onChange={handleInputChange}
                onBlur={handleFieldBlur}
                error={fieldErrors.description}
                touched={touchedFields.description}
                rows={4}
                maxLength={500}
                required
              />

              {/* ─── Date ────────────────────────────────────── */}
              <InputField
                label="Date of Incident"
                name="date"
                type="date"
                placeholder="Select date"
                value={formData.date}
                onChange={handleInputChange}
                onBlur={handleFieldBlur}
                error={fieldErrors.date}
                touched={touchedFields.date}
                required
              />

              {/* ─── Contact ────────────────────────────────── */}
              <InputField
                label="Contact Number"
                name="contact"
                type="tel"
                placeholder="e.g., +254700000000"
                value={formData.contact}
                onChange={handleInputChange}
                onBlur={handleFieldBlur}
                error={fieldErrors.contact}
                touched={touchedFields.contact}
                maxLength={20}
                required
              />

              {/* ─── Error/Success Messages ──────────────────── */}
              {submitError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                  <AlertCircle size={18} />
                  <span>{submitError}</span>
                </div>
              )}

              {submitSuccess && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700">
                  <CheckCircle size={18} />
                  <span>{submitSuccess}</span>
                </div>
              )}

              {/* ─── Form Status ────────────────────────────── */}
              {!isFormValid() && !submitSuccess && (
                <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
                  <AlertCircle size={18} />
                  <span>Please fill in all required fields correctly before submitting</span>
                </div>
              )}

              {isFormValid() && !submitSuccess && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700">
                  <CheckCircle size={18} />
                  <span>All fields are valid! You can submit the report.</span>
                </div>
              )}

              {/* ─── Form Actions ───────────────────────────── */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2 ${
                    isFormValid() && !isSubmitting
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-200/50'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Report'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Reports;