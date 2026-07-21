import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scan, Camera, Search, User, CheckCircle, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import CameraCapture from '../components/CameraCapture'; // existing component

const FacialRecognition = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const handleCapture = (imageData) => {
    setCapturedImage(imageData);
    setError(null);
    // Simulate search (replace with real API)
    setIsSearching(true);
    setTimeout(() => {
      setSearchResults([
        { id: 1, name: 'Aisha Mohamed', match: 94, status: 'active' },
        { id: 2, name: 'James Kiprop', match: 78, status: 'pending' },
      ]);
      setIsSearching(false);
    }, 1500);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setSearchResults([]);
    setError(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-slate-50/80 to-gray-100/80 min-h-screen">
      <PageHeader 
        icon={Scan}
        title="Facial Recognition"
        subtitle="Search for missing persons using facial recognition technology"
        actions={
          <button
            onClick={() => {}}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition shadow-sm"
          >
            <Camera size={16} />
            Upload Photo
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera / Image Section */}
        <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-3">Capture or Upload Photo</h3>
          {capturedImage ? (
            <div className="space-y-3">
              <img src={capturedImage} alt="Captured" className="w-full rounded-xl border border-gray-200" />
              <div className="flex gap-2">
                <button
                  onClick={handleRetake}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
                >
                  Retake
                </button>
                {isSearching ? (
                  <button className="flex-1 py-2 bg-emerald-500 text-white rounded-xl animate-pulse" disabled>
                    Searching...
                  </button>
                ) : (
                  <button
                    onClick={() => {}}
                    className="flex-1 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition"
                  >
                    Search Again
                  </button>
                )}
              </div>
            </div>
          ) : (
            <CameraCapture 
              onCapture={handleCapture}
              onClose={() => {}}
            />
          )}
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Search size={18} className="text-emerald-500" />
            Search Results
          </h3>
          {isSearching && (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent" />
            </div>
          )}
          {!isSearching && searchResults.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              <User size={48} className="mx-auto mb-2 text-gray-300" />
              <p>No results yet. Capture a photo to start.</p>
            </div>
          )}
          {!isSearching && searchResults.length > 0 && (
            <div className="space-y-3">
              {searchResults.map((person) => (
                <div key={person.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
                    {person.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{person.name}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`px-2 py-0.5 rounded-full ${
                        person.status === 'active' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {person.status}
                      </span>
                      <span className="text-emerald-600 font-semibold">{person.match}% match</span>
                    </div>
                  </div>
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">View →</button>
                </div>
              ))}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacialRecognition;