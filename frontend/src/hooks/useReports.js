import { useState, useEffect } from 'react'

export const useReports = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchReports = async () => {
    setLoading(true)
    try {
      const mockReports = [
        { id: 1, name: 'Amina Hassan', location: 'Nairobi, Kenya', date: '2024-06-29', status: 'Active', age: 28 },
        { id: 2, name: 'Peter Otieno', location: 'Kiambu, Kenya', date: '2024-06-28', status: 'Active', age: 45 },
        { id: 3, name: 'Fatumia Ali', location: 'Garissa, Kenya', date: '2024-06-27', status: 'Pending', age: 32 },
      ]
      setReports(mockReports)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [])

  return { reports, loading, error, fetchReports }
}
