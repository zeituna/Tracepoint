import React, { useState, useRef } from 'react'
import { 
  Camera, 
  Upload, 
  Eye, 
  Loader2,
  Trash2,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react'
import CameraCapture from '../components/CameraCapture'

const FacialRecognition = () => {
  const [imagePreview, setImagePreview] = useState(null)
  const [matchResults, setMatchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('upload')
  const [showCamera, setShowCamera] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [detectedFaces, setDetectedFaces] = useState([])
  
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setMatchResults([])
        setDetectedFaces([])
        setTimeout(() => performFaceMatch(reader.result), 500)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = (imageData) => {
    setImagePreview(imageData)
    setShowCamera(false)
    setMatchResults([])
    setDetectedFaces([])
    setTimeout(() => performFaceMatch(imageData), 500)
  }

  const performFaceMatch = (imageData) => {
    setIsLoading(true)
    setScanProgress(0)
    setMatchResults([])
    setDetectedFaces([])

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    setTimeout(() => {
      const detected = [
        { x: 50, y: 30, width: 100, height: 120, confidence: 92 },
        { x: 180, y: 40, width: 80, height: 100, confidence: 78 },
      ]
      setDetectedFaces(detected)
    }, 1000)

    setTimeout(() => {
      const results = [
        { 
          id: 1, 
          name: 'Amina Hassan', 
          match: Math.floor(Math.random() * 30) + 70, 
          status: 'Active', 
          confidence: 'High',
          age: 28,
          location: 'Nairobi, Kenya',
          lastSeen: '2 hours ago'
        },
        { 
          id: 2, 
          name: 'Peter Otieno', 
          match: Math.floor(Math.random() * 30) + 60, 
          status: 'Active', 
          confidence: 'Medium',
          age: 45,
          location: 'Kiambu, Kenya',
          lastSeen: '4 hours ago'
        },
        { 
          id: 3, 
          name: 'Fatumia Ali', 
          match: Math.floor(Math.random() * 30) + 50, 
          status: 'Pending', 
          confidence: 'Medium',
          age: 32,
          location: 'Garissa, Kenya',
          lastSeen: '1 day ago'
        },
        { 
          id: 4, 
          name: 'Sarah Wanjiru', 
          match: Math.floor(Math.random() * 30) + 40, 
          status: 'Resolved', 
          confidence: 'Low',
          age: 19,
          location: 'Mombasa, Kenya',
          lastSeen: '6 hours ago'
        },
      ].sort((a, b) => b.match - a.match)
      
      setMatchResults(results)
      setIsLoading(false)
      clearInterval(interval)
    }, 3000)
  }

  const clearUpload = () => {
    setImagePreview(null)
    setMatchResults([])
    setDetectedFaces([])
    setScanProgress(0)
    setIsLoading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const retryMatch = () => {
    if (imagePreview) {
      setMatchResults([])
      setDetectedFaces([])
      performFaceMatch(imagePreview)
    }
  }

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30'
    if (percentage >= 60) return 'text-amber-600 bg-amber-50 dark:bg-amber-950/30'
    return 'text-red-600 bg-red-50 dark:bg-red-950/30'
  }

  const getConfidenceColor = (confidence) => {
    const colors = {
      High: 'text-emerald-600',
      Medium: 'text-amber-600',
      Low: 'text-red-600',
    }
    return colors[confidence] || 'text-gray-600'
  }

  const getStatusColor = (status) => {
    const colors = {
      Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      Resolved: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Facial Recognition</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">AI-powered face matching system</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === 'upload'
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/25'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Upload size={16} className="inline mr-1" />
            Upload
          </button>
          <button 
            onClick={() => setActiveTab('matches')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === 'matches'
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/25'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Eye size={16} className="inline mr-1" />
            Matches
          </button>
        </div>
      </div>

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Area */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <Camera size={18} />
              Upload or Capture Photo
            </h3>
            
            {!imagePreview ? (
              <div>
                <div 
                  className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:border-primary-500 transition-all cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-5xl mb-4">📸</div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Click to upload or drag & drop</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Supports JPG, PNG, WEBP</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                
                <button
                  onClick={() => setShowCamera(true)}
                  className="mt-4 w-full px-4 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Camera size={18} />
                  Open Camera
                </button>
              </div>
            ) : (
              <div>
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Uploaded" 
                    className="w-full max-h-[400px] object-contain rounded-xl bg-gray-50 dark:bg-gray-800"
                  />
                  {detectedFaces.length > 0 && !isLoading && (
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                      {detectedFaces.map((face, index) => (
                        <div
                          key={index}
                          className="absolute border-2 border-emerald-500 rounded-lg animate-pulse"
                          style={{
                            left: `${(face.x / 300) * 100}%`,
                            top: `${(face.y / 300) * 100}%`,
                            width: `${(face.width / 300) * 100}%`,
                            height: `${(face.height / 300) * 100}%`,
                          }}
                        >
                          <span className="absolute -top-6 left-0 text-xs bg-emerald-500 text-white px-2 py-0.5 rounded">
                            Face {index + 1} ({face.confidence}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {isLoading && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>Scanning face...</span>
                      <span>{scanProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${scanProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={clearUpload}
                    className="flex-1 px-4 py-2 bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-950/50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Clear
                  </button>
                  <button
                    onClick={retryMatch}
                    className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={16} />
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* Camera Modal */}
            {showCamera && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Capture Photo</h3>
                  <CameraCapture 
                    onCapture={handleCameraCapture}
                    onClose={() => setShowCamera(false)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <Eye size={18} />
              Match Results
            </h3>
            
            {isLoading ? (
              <div className="text-center py-8">
                <Loader2 size={40} className="animate-spin text-primary-500 mx-auto" />
                <p className="text-gray-500 dark:text-gray-400 mt-3 font-medium">Analyzing face...</p>
                <p className="text-sm text-gray-400">This may take a few moments</p>
              </div>
            ) : matchResults.length > 0 ? (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {matchResults.map((result, index) => (
                  <div key={result.id} className={`bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 transition-all hover:shadow-md ${
                    index === 0 ? 'border-2 border-emerald-500' : ''
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{result.name}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getMatchColor(result.match)}`}>
                            {result.match}% Match
                          </span>
                          <span className={`text-xs font-medium ${getConfidenceColor(result.confidence)}`}>
                            {result.confidence} Confidence
                          </span>
                        </div>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                          {result.status}
                        </span>
                      </div>
                      {index === 0 && (
                        <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs rounded-full">
                          Best Match
                        </span>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          result.match >= 80 ? 'bg-emerald-500' :
                          result.match >= 60 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${result.match}%` }}
                      ></div>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                      <span>👤 {result.age} years</span>
                      <span>📍 {result.location}</span>
                      <span>🕐 {result.lastSeen}</span>
                    </div>
                    <button className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
                      View Details →
                    </button>
                  </div>
                ))}
              </div>
            ) : imagePreview ? (
              <div className="text-center py-8 text-gray-400">
                <div className="text-4xl mb-3">🔍</div>
                <p className="font-medium text-gray-500">No matches found</p>
                <p className="text-sm">Try uploading a clearer image</p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <div className="text-4xl mb-3">📤</div>
                <p>Upload an image to start matching</p>
                <p className="text-sm">Or use your camera to capture a photo</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Matches Tab */}
      {activeTab === 'matches' && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
            <Eye size={18} />
            Recent Matches
          </h3>
          {matchResults.length > 0 ? (
            <div className="space-y-3">
              {matchResults.map((result) => (
                <div key={result.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {result.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{result.name}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getMatchColor(result.match)}`}>
                          {result.match}% Match
                        </span>
                        <span className={`text-xs font-medium ${getConfidenceColor(result.confidence)}`}>
                          {result.confidence}
                        </span>
                      </div>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                        {result.status}
                      </span>
                    </div>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View →
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-3">🎯</div>
              <p className="font-medium text-gray-500">No matches yet</p>
              <p className="text-sm">Upload an image to find matches</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FacialRecognition
