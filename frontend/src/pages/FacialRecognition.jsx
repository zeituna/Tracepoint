import React, { useState, useRef } from 'react'

const FacialRecognition = () => {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [matchResults, setMatchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('upload') // upload, gallery, matches
  const [galleryImages, setGalleryImages] = useState([
    { id: 1, name: 'Amina Hassan', image: null, match: 92 },
    { id: 2, name: 'Peter Otieno', image: null, match: 78 },
    { id: 3, name: 'Fatumia Ali', image: null, match: 85 },
    { id: 4, name: 'Sarah Wanjiru', image: null, match: 95 },
    { id: 5, name: 'John Mwangi', image: null, match: 67 },
  ])
  const [cameraActive, setCameraActive] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  // Mock face matching function
  const performFaceMatch = (image) => {
    setIsLoading(true)
    setMatchResults([])
    
    // Simulate API call delay
    setTimeout(() => {
      const mockResults = [
        { id: 1, name: 'Amina Hassan', match: Math.floor(Math.random() * 30) + 70, status: 'Active' },
        { id: 2, name: 'Peter Otieno', match: Math.floor(Math.random() * 30) + 60, status: 'Active' },
        { id: 3, name: 'Fatumia Ali', match: Math.floor(Math.random() * 30) + 50, status: 'Pending' },
        { id: 4, name: 'Sarah Wanjiru', match: Math.floor(Math.random() * 30) + 40, status: 'Resolved' },
      ].sort((a, b) => b.match - a.match)
      
      setMatchResults(mockResults)
      setIsLoading(false)
    }, 2000)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setUploadedImage(file)
        // Auto-start matching
        performFaceMatch(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setUploadedImage(file)
        performFaceMatch(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setCameraActive(true)
      }
    } catch (err) {
      alert('Unable to access camera. Please check permissions.')
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      canvasRef.current.width = videoRef.current.videoWidth
      canvasRef.current.height = videoRef.current.videoHeight
      context.drawImage(videoRef.current, 0, 0)
      const imageData = canvasRef.current.toDataURL('image/jpeg')
      setImagePreview(imageData)
      setCameraActive(false)
      
      // Stop camera stream
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop())
      }
      
      performFaceMatch(imageData)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
    setCameraActive(false)
  }

  const clearUpload = () => {
    setUploadedImage(null)
    setImagePreview(null)
    setMatchResults([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 bg-green-50 dark:bg-green-900/20'
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
    return 'text-red-600 bg-red-50 dark:bg-red-900/20'
  }

  const getMatchBarColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Facial Recognition</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">AI-powered face matching system</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'upload' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
          >
            📤 Upload
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'gallery' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
          >
            🖼️ Gallery
          </button>
          <button 
            onClick={() => setActiveTab('matches')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'matches' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
          >
            🎯 Matches
          </button>
        </div>
      </div>

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Area */}
          <div>
            <div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 text-center hover:border-primary-500 transition-all min-h-[300px] flex flex-col items-center justify-center"
              onDrop={handleDragDrop}
              onDragOver={handleDragOver}
            >
              {!imagePreview ? (
                <>
                  <div className="text-6xl mb-4">📸</div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Upload a Photo</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Drag & drop or click to select</p>
                  <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG, WEBP</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label 
                    htmlFor="file-upload"
                    className="mt-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:shadow-lg transition-all"
                  >
                    Select Image
                  </label>
                  
                  <button
                    onClick={startCamera}
                    className="mt-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center gap-2"
                  >
                    📷 Use Camera
                  </button>
                </>
              ) : (
                <div className="w-full">
                  <img 
                    src={imagePreview} 
                    alt="Uploaded" 
                    className="max-h-[300px] mx-auto rounded-lg object-contain"
                  />
                  <div className="flex gap-3 mt-4 justify-center">
                    <button
                      onClick={clearUpload}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
                    >
                      Clear
                    </button>
                    <label 
                      htmlFor="file-upload"
                      className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                    >
                      Change
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Camera Capture */}
            {cameraActive && (
              <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                <video 
                  ref={videoRef} 
                  className="w-full rounded-lg"
                  style={{ maxHeight: '300px' }}
                />
                <div className="flex gap-3 mt-3 justify-center">
                  <button
                    onClick={capturePhoto}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-all"
                  >
                    📸 Capture
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-all"
                  >
                    Stop
                  </button>
                </div>
                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}
          </div>

          {/* Results */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Match Results</h3>
              
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                  <p className="text-gray-500 mt-3">Analyzing face...</p>
                </div>
              ) : matchResults.length > 0 ? (
                <div className="space-y-4">
                  {matchResults.map((result) => (
                    <div key={result.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{result.name}</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getMatchColor(result.match)}`}>
                            {result.match}% Match
                          </span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          result.status === 'Active' ? 'bg-green-100 text-green-700' :
                          result.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {result.status}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${getMatchBarColor(result.match)}`}
                          style={{ width: `${result.match}%` }}
                        ></div>
                      </div>
                      <button className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View Details →
                      </button>
                    </div>
                  ))}
                </div>
              ) : imagePreview ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No matches found</p>
                  <p className="text-sm">Try uploading a clearer image</p>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-4xl mb-2">🔍</p>
                  <p>Upload an image to start matching</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Gallery Tab */}
      {activeTab === 'gallery' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Face Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((person) => (
              <div key={person.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center hover:shadow-md transition-all">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full mx-auto flex items-center justify-center text-3xl text-white">
                  {person.name.charAt(0)}
                </div>
                <p className="font-medium text-gray-900 dark:text-white mt-2">{person.name}</p>
                <p className="text-xs text-gray-500">{person.match}% match</p>
                <button className="mt-2 bg-primary-500 hover:bg-primary-600 text-white px-3 py-1 rounded text-xs transition-colors">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Matches Tab */}
      {activeTab === 'matches' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Matches</h3>
          {matchResults.length > 0 ? (
            <div className="space-y-4">
              {matchResults.map((result) => (
                <div key={result.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold">
                      {result.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{result.name}</p>
                      <p className="text-sm text-gray-500">{result.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(result.match)}`}>
                      {result.match}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p className="text-4xl mb-2">🎯</p>
              <p>No matches yet. Upload an image to find matches.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FacialRecognition
