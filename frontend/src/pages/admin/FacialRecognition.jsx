import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Search, 
  User, 
  CheckCircle, 
  RefreshCw,
  MapPin,
  Calendar,
  Image,
  AlertCircle,
  X,
  Camera
} from 'lucide-react';
import CameraCapture from '../../components/CameraCapture';
const FacialRecognition = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  
  const fileInputRef = useRef(null);

  const galleryImages = [
    { id: 1, name: 'Amina Hassan', age: 28, location: 'Wajir, Kenya', status: 'active', imageUrl: '/images/people/amina-hassan.jpg' },
    { id: 2, name: 'Sarah Ochieng', age: 22, location: 'Kisumu, Kenya', status: 'active', imageUrl: '/images/people/sarah-ochieng.jpg' },
    { id: 3, name: 'Mohamed Ali', age: 45, location: 'Garissa, Kenya', status: 'active', imageUrl: '/images/people/mohamed-ali.jpg' },
    { id: 4, name: 'Fatumia Ali', age: 32, location: 'Garissa, Kenya', status: 'pending', imageUrl: '/images/people/fatuma-ali.jpg' },
    { id: 5, name: 'John Kimani', age: 38, location: 'Mombasa, Kenya', status: 'pending', imageUrl: '/images/people/john-kimani.jpg' },
    { id: 6, name: 'Mary Wanjiku', age: 16, location: 'Nakuru, Kenya', status: 'active', imageUrl: '/images/people/mary-wanjiku.jpg' },
  ];

  const [imageErrors, setImageErrors] = useState({});

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-red-500',
      pending: 'bg-yellow-500',
      resolved: 'bg-green-500',
    };
    return badges[status] || 'bg-gray-500';
  };

  const dataURLtoFile = (dataUrl, filename) => {
    const [header, data] = dataUrl.split(',');
    const mimeMatch = header.match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const binary = atob(data);
    const array = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i += 1) {
      array[i] = binary.charCodeAt(i);
    }

    return new File([array], filename, { type: mime });
  };

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      processImage(file);
    }
  };

  const processImage = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image (JPEG, PNG, WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setError('');
    setUploadedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setHasSearched(false);
    setSearchResults([]);
    setSuccess('Image uploaded successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraCapture = (imageData) => {
    const capturedFile = dataURLtoFile(imageData, 'captured-face.jpg');
    processImage(capturedFile);
    setIsCameraOpen(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSearch = async () => {
    if (!uploadedImage) {
      setError('Please upload an image first');
      return;
    }

    setIsUploading(true);
    setError('');
    setSuccess('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const matchedResults = galleryImages
        .filter(() => Math.random() > 0.4)
        .slice(0, 3)
        .map(item => ({
          ...item,
          matchScore: (Math.random() * 30 + 65).toFixed(1)
        }));

      setSearchResults(matchedResults);
      setHasSearched(true);
      
      if (matchedResults.length > 0) {
        setSuccess(`Found ${matchedResults.length} potential match${matchedResults.length > 1 ? 'es' : ''}`);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setSuccess('No matches found');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError('Error during matching process');
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setPreviewUrl(null);
    setSearchResults([]);
    setHasSearched(false);
    setError('');
    setSuccess('');
    setIsCameraOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Face Recognition</h1>
          <p className="text-gray-500">Upload an image to find matching records</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-semibold text-gray-700 mb-4">Upload Image</h2>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
            previewUrl ? 'border-emerald-400 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {previewUrl ? (
            <div className="space-y-4">
              <img 
                src={previewUrl} 
                alt="Uploaded" 
                className="max-h-64 mx-auto rounded-lg shadow-md"
              />
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <button
                  onClick={handleUploadClick}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm"
                >
                  Change Image
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <Image className="h-10 w-10 text-gray-400" />
                </div>
              </div>
              <div>
                <p className="text-gray-600">Drag and drop an image here, or</p>
                <div className="mt-3 flex items-center justify-center gap-3 flex-wrap">
                  <button
                    onClick={handleUploadClick}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm"
                  >
                    Browse Files
                  </button>
                  <button
                    onClick={() => setIsCameraOpen(true)}
                    className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition text-sm flex items-center gap-2"
                  >
                    <Camera size={16} />
                    Open Camera
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-400">Supported: JPEG, PNG, WebP (Max 5MB)</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {isCameraOpen && (
          <div className="mt-4 rounded-xl border border-gray-200 overflow-hidden">
            <CameraCapture
              onCapture={handleCameraCapture}
              onClose={() => setIsCameraOpen(false)}
            />
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle size={16} />
            {error}
            <button onClick={() => setError('')} className="ml-auto text-red-500 hover:text-red-700">
              <X size={16} />
            </button>
          </div>
        )}
        {success && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle size={16} />
            {success}
          </div>
        )}

        {previewUrl && (
          <div className="mt-4 flex gap-3 flex-wrap">
            <button
              onClick={handleSearch}
              disabled={isUploading}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  Processing...
                </>
              ) : (
                <>
                  <Search size={16} />
                  Find Matches
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {hasSearched && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">Search Results</h2>
            <span className="text-sm text-gray-400">
              {searchResults.length} match{searchResults.length !== 1 ? 'es' : ''} found
            </span>
          </div>

          {searchResults.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <User className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p>No matches found</p>
              <p className="text-sm">Try uploading a different image</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((result) => (
                <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={result.imageUrl} 
                      alt={result.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                      onError={() => handleImageError(result.id)}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{result.name}</p>
                      <p className="text-sm text-gray-500">{result.age} years</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs text-white ${getStatusBadge(result.status)}`}>
                      {result.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="flex items-center gap-2 text-gray-600">
                      <MapPin size={14} className="text-gray-400" />
                      {result.location}
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <Calendar size={14} className="text-gray-400" />
                      {result.date}
                    </p>
                    <p className="flex items-center gap-2 text-emerald-600 font-medium">
                      <CheckCircle size={14} />
                      Match Score: {result.matchScore}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Records Gallery</h2>
            <p className="text-xs text-gray-400">Reference images in the system</p>
          </div>
          <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{galleryImages.length} records</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((person) => {
            const hasError = imageErrors[person.id];
            return (
              <div key={person.id} className="border border-gray-200 rounded-xl p-4 text-center hover:shadow-lg transition duration-300 bg-white">
                {!hasError ? (
                  <img 
                    src={person.imageUrl} 
                    alt={person.name}
                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-gray-200"
                    onError={() => handleImageError(person.id)}
                  />
                ) : (
                  <div 
                    className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold shadow-md"
                    style={{ backgroundColor: '#10b981' }}
                  >
                    {getInitials(person.name)}
                  </div>
                )}
                
                <p className="text-sm font-semibold text-gray-800 truncate">{person.name}</p>
                <p className="text-xs text-gray-500 truncate">{person.location}</p>
                
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium text-white ${getStatusBadge(person.status)}`}>
                    {person.status}
                  </span>
                  <span className="text-xs text-gray-400">{person.age}y</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center text-xs text-gray-400 mt-4 pt-3 border-t border-gray-200">
          Showing all {galleryImages.length} records in the gallery
        </div>
      </div>
    </div>
  );
};

export default FacialRecognition;
