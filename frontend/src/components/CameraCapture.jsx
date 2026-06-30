import React, { useRef, useState, useEffect } from 'react'
import { Camera, X, RefreshCw } from 'lucide-react'

const CameraCapture = ({ onCapture, onClose }) => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [error, setError] = useState(null)
  const [capturedImage, setCapturedImage] = useState(null)

  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      })
      setStream(mediaStream)
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
          setIsCameraReady(true)
        }
      }
    } catch (err) {
      setError('Unable to access camera: ' + err.message)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsCameraReady(false)
  }

  const capturePhoto = () => {
    if (!isCameraReady || !videoRef.current) {
      alert('Camera not ready')
      return
    }

    try {
      const video = videoRef.current
      const canvas = canvasRef.current
      
      // Set canvas size to match video
      canvas.width = video.videoWidth || 640
      canvas.height = video.videoHeight || 480
      
      // Draw video frame to canvas
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      // Get image data
      const imageData = canvas.toDataURL('image/jpeg', 0.9)
      setCapturedImage(imageData)
      
      // Stop camera after capture
      stopCamera()
      
      // Send to parent
      if (onCapture) {
        onCapture(imageData)
      }
    } catch (err) {
      alert('Error capturing: ' + err.message)
    }
  }

  const retry = () => {
    setCapturedImage(null)
    setError(null)
    startCamera()
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-xl text-center">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <button 
          onClick={retry}
          className="mt-3 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          <RefreshCw size={16} className="inline mr-2" />
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      {!capturedImage ? (
        <>
          <div className="relative">
            <video 
              ref={videoRef} 
              className="w-full max-h-[400px] object-contain"
              autoPlay
              playsInline
              muted
            />
            {!isCameraReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
              </div>
            )}
          </div>
          <div className="p-4 flex gap-2">
            <button
              onClick={capturePhoto}
              disabled={!isCameraReady}
              className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                isCameraReady 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Camera size={18} />
              {isCameraReady ? 'Capture Photo' : 'Loading...'}
            </button>
            <button
              onClick={() => {
                stopCamera()
                if (onClose) onClose()
              }}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <X size={18} />
              Close
            </button>
          </div>
        </>
      ) : (
        <div className="p-4">
          <img 
            src={capturedImage} 
            alt="Captured" 
            className="w-full max-h-[400px] object-contain rounded-lg"
          />
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                setCapturedImage(null)
                startCamera()
              }}
              className="flex-1 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              Retake
            </button>
            <button
              onClick={() => {
                stopCamera()
                if (onClose) onClose()
              }}
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-all"
            >
              Use This Photo
            </button>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

export default CameraCapture
