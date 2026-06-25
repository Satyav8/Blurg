import { useState, useEffect, useCallback } from 'react'

const API = 'http://localhost:8000'
const POLL_INTERVAL = 5000

export function useVessels(statusFilter) {
  const [vessels, setVessels] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchVessels = useCallback(async () => {
    try {
      const url = statusFilter
        ? `${API}/vessels?status=${statusFilter}`
        : `${API}/vessels`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setVessels(data.vessels)
      setError(null)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API}/stats`)
      if (!res.ok) return
      setStats(await res.json())
    } catch {}
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchVessels()
    fetchStats()

    const id = setInterval(() => {
      fetchVessels()
      fetchStats()
    }, POLL_INTERVAL)

    return () => clearInterval(id)
  }, [fetchVessels, fetchStats])

  return { vessels, stats, loading, error, lastUpdated }
}
