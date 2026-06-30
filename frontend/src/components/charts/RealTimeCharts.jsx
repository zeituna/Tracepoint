import React, { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Scatter
} from 'recharts'

const COLORS = ['#059669', '#d97706', '#3b82f6', '#8b5cf6', '#ef4444', '#ec4899']

const RealTimeCharts = () => {
  const [liveData, setLiveData] = useState([])
  const [stats, setStats] = useState({
    total: 1248,
    active: 482,
    resolved: 766,
    pending: 124,
    growth: 12.5,
    resolvedRate: 61.4,
    avgResponseTime: '4.2h'
  })

  // Generate initial data
  useEffect(() => {
    const initialData = []
    const now = new Date()
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      initialData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        reports: Math.floor(Math.random() * 60) + 20,
        resolved: Math.floor(Math.random() * 30) + 10,
        active: Math.floor(Math.random() * 40) + 15,
        pending: Math.floor(Math.random() * 20) + 5
      })
    }
    setLiveData(initialData)
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => {
        const newData = [...prev]
        const lastDate = new Date()
        const newEntry = {
          date: lastDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          reports: Math.floor(Math.random() * 40) + 30,
          resolved: Math.floor(Math.random() * 25) + 10,
          active: Math.floor(Math.random() * 30) + 15,
          pending: Math.floor(Math.random() * 15) + 5
        }
        newData.push(newEntry)
        if (newData.length > 30) newData.shift()
        return newData
      })

      // Update stats
      setStats(prev => ({
        ...prev,
        total: prev.total + Math.floor(Math.random() * 3) - 1,
        active: prev.active + Math.floor(Math.random() * 2),
        resolved: prev.resolved + Math.floor(Math.random() * 3),
        growth: prev.growth + (Math.random() - 0.5) * 0.5
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const pieData = [
    { name: 'Active', value: stats.active },
    { name: 'Resolved', value: stats.resolved },
    { name: 'Pending', value: stats.pending },
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Total Reports</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total.toLocaleString()}</p>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            +{stats.growth.toFixed(1)}% this month
          </span>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Active Cases</p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.active}</p>
          <span className="text-xs text-emerald-600 dark:text-emerald-400">+8% this month</span>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Resolved Cases</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.resolved}</p>
          <span className="text-xs text-emerald-600 dark:text-emerald-400">+15% this month</span>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Resolution Rate</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.resolvedRate}%</p>
          <span className="text-xs text-emerald-600 dark:text-emerald-400">↑ 5.2% improvement</span>
        </div>
      </div>

      {/* Main Chart - Area Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">📈 Reports Trend</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Real-time data updates every 5 seconds</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Live</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={liveData}>
            <defs>
              <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.3} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11, fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
              formatter={(value) => <span className="text-xs text-gray-600 dark:text-gray-400">{value}</span>}
            />
            <Area 
              type="monotone" 
              dataKey="reports" 
              stroke="#059669" 
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorReports)"
              activeDot={{ r: 6, fill: '#059669' }}
            />
            <Area 
              type="monotone" 
              dataKey="resolved" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorResolved)"
              activeDot={{ r: 6, fill: '#3b82f6' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">📊 Weekly Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={liveData.slice(-7)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.3} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 10, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="active" fill="#d97706" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">🎯 Case Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                innerRadius={50}
                dataKey="value"
                animationBegin={0}
                animationDuration={1500}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">🔄 Live Activity</h3>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Updating in real-time
          </span>
        </div>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {liveData.slice(-5).reverse().map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300 dark:bg-gray-600'}`}></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-900 dark:text-white font-medium">{item.reports} reports</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400">{item.resolved} resolved</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RealTimeCharts
