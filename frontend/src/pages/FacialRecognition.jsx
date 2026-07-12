import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Search, 
  User, 
  CheckCircle, 
  RefreshCw,
  MapPin,
  Calendar,
  Image,
  AlertCircle,
  X
} from 'lucide-react';

const FacialRecognition = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraError, setCameraError] = useState('');
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Sample gallery images
  const galleryImages = [
    { id: 1, name: 'Amina Hassan', age: 28, location: 'Wajir, Kenya', status: 'active', image: '👩🏾', date: '2024-06-29' },
    { id: 2, name: 'Fatumia Ali', age: 32, location: 'Garissa, Kenya', status: 'pending', image: '👩🏾', date: '2024-06-28' },
    { id: 3, name: 'Mohamed Omar', age: 45, location: 'Nairobi, Kenya', status: 'resolved', image: '👨🏾', date: '2024-06-27' },
    { id: 4, name: 'Sarah Ochieng', age: 22, location: 'Kisumu, Kenya', status: 'active', image: '👩🏾', date: '2024-06-26' },
    { id: 5, name: 'John Kimani', age: 38, location: 'Mombasa, Kenya', status: 'pending', image: '👨🏾', date: '2024-06-25' },
    { id: 6, name: 'Mary Wanjiku', age: 16, location: 'Nakuru, Kenya', status: 'active', image: '👩🏾', date: '2024-06-24' },
  ];

  // Handle file upload
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

  // Camera functions - FIXED
  const startCamera = async () => {
    setCameraError('');
    setIsCameraLoading(true);
    
    try {
      // Check if browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Your browser does not support camera access');
        setIsCameraLoading(false);
        return;
      }

      // Try to get camera with specific constraints
      const constraints = {
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      setCameraStream(stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsCameraLoading(false);
        };
        videoRef.current.onerror = () => {
          setCameraError('Error loading video stream');
          setIsCameraLoading(false);
        };
      }
      
      setShowCamera(true);
      setError('');
    } catch (err) {
      console.error('Camera error details:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera access denied. Please allow camera permissions in your browser.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('No camera found on your device.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setCameraError('Camera is being used by another application.');
      } else {
        setCameraError(`Camera error: ${err.message || 'Unknown error'}`);
      }
      setIsCameraLoading(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => {
        track.stop();
        track.enabled = false;
      });
      setCameraStream(null);
    }
    setShowCamera(false);
    setIsCameraLoading(false);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.pause();
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      try {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
            processImage(file);
            stopCamera();
            setSuccess('Photo captured successfully!');
            setTimeout(() => setSuccess(''), 3000);
          }
        }, 'image/jpeg', 0.9);
      } catch (err) {
        setError('Failed to capture photo');
        console.error('Capture error:', err);
      }
    }
  };

  // Handle upload button click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle drag and drop
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

  // Handle search/match
  const handleSearch = async () => {
    if (!uploadedImage) {
      setError('Please upload or capture an image first');
      return;
    }

    setIsUploading(true);
    setError('');
    setSuccess('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const matchedResults = galleryImages
        .filter(item => Math.random() > 0.4)
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

  // Reset search
  const handleReset = () => {
    setUploadedImage(null);
    setPreviewUrl(null);
    setSearchResults([]);
    setHasSearched(false);
    setError('');
    setSuccess('');
    setCameraError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    stopCamera();
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-red-500',
      pending: 'bg-yellow-500',
      resolved: 'bg-green-500',
    };
    return badges[status] || 'bg-gray-500';
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Face Recognition</h1>
          <p className="text-gray-500">Upload or capture an image to find matching records</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Camera size={16} />
          <span>Version 2.0</span>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-semibold text-gray-700 mb-4">Upload or Capture Image</h2>
        
        {/* Camera View */}
        {showCamera && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="relative">
              {isCameraLoading ? (
                <div className="flex justify-center items-center h-64 bg-black rounded-lg">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  className="w-full max-h-96 rounded-lg bg-black"
                  autoPlay
                  playsInline
                  muted
                />
              )}
              <canvas ref={canvasRef} className="hidden" />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                <button
                  onClick={capturePhoto}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition shadow-lg"
                >
                  Capture
                </button>
                <button
                  onClick={stopCamera}
                  className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

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
              <div className="flex justify-center gap-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <Image className="h-10 w-10 text-gray-400" />
                </div>
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <Camera className="h-10 w-10 text-gray-400" />
                </div>
              </div>
              <div>
                <p className="text-gray-600">Drag and drop an image here, or</p>
                <div className="flex justify-center gap-3 mt-3 flex-wrap">
                  <button
                    onClick={handleUploadClick}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm flex items-center gap-2"
                  >
                    <Upload size={16} />
                    Browse Files
                  </button>
                  <button
                    onClick={startCamera}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center gap-2"
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

        {/* Camera Error */}
        {cameraError && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2 text-yellow-700 text-sm">
            <AlertCircle size={16} />
            {cameraError}
            <button 
              onClick={() => setCameraError('')} 
              className="ml-auto text-yellow-500 hover:text-yellow-700"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Error/Success Messages */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle size={16} />
            {error}
            <button 
              onClick={() => setError('')} 
              className="ml-auto text-red-500 hover:text-red-700"
            >
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

        {/* Action Buttons */}
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

      {/* Results Section */}
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
                    <span className="text-3xl">{result.image}</span>
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

      {/* Gallery Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-gray-700">Records Gallery</h2>
            <p className="text-xs text-gray-400">Reference images in the system</p>
          </div>
          <span className="text-sm text-gray-400">{galleryImages.length} records</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition group">
              <span className="text-4xl block mb-2">{item.image}</span>
              <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
              <p className="text-xs text-gray-500 truncate">{item.location}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] text-white ${getStatusBadge(item.status)}`}>
                  {item.status}
                </span>
                <span className="text-xs text-gray-400">{item.age}y</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacialRecognition;
