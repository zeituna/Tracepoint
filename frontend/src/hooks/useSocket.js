import { useState, useEffect, useCallback, useRef } from 'react'

export const useSocket = (url, options = {}) => {
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState(null)
  const socketRef = useRef(null)

  const connect = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return

    const socket = new WebSocket(url)
    socketRef.current = socket

    socket.onopen = () => {
      setIsConnected(true)
      if (options.onOpen) options.onOpen()
    }

    socket.onclose = () => {
      setIsConnected(false)
      if (options.onClose) options.onClose()
    }

    socket.onerror = (error) => {
      if (options.onError) options.onError(error)
    }

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        setLastMessage(data)
        if (options.onMessage) options.onMessage(data)
      } catch (error) {
        setLastMessage(event.data)
        if (options.onMessage) options.onMessage(event.data)
      }
    }

    return socket
  }, [url, options])

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close()
      socketRef.current = null
      setIsConnected(false)
    }
  }, [])

  const sendMessage = useCallback((data) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data))
      return true
    }
    return false
  }, [])

  useEffect(() => {
    if (options.autoConnect !== false) {
      connect()
    }

    return () => {
      disconnect()
    }
  }, [connect, disconnect, options.autoConnect])

  return {
    isConnected,
    lastMessage,
    sendMessage,
    connect,
    disconnect,
    socket: socketRef.current,
  }
}
