import { useState, useCallback, useRef } from 'react'

export const useMap = (initialCenter = [0, 0], initialZoom = 13) => {
  const [center, setCenter] = useState(initialCenter)
  const [zoom, setZoom] = useState(initialZoom)
  const mapRef = useRef(null)

  const setMapRef = useCallback((ref) => {
    mapRef.current = ref
  }, [])

  const setView = useCallback((newCenter, newZoom) => {
    setCenter(newCenter)
    if (newZoom) setZoom(newZoom)
  }, [])

  const zoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 1, 20))
  }, [])

  const zoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 1, 1))
  }, [])

  return {
    center,
    zoom,
    mapRef,
    setMapRef,
    setView,
    zoomIn,
    zoomOut,
  }
}
