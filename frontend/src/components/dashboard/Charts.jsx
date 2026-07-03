import React from 'react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,cd
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

// Monthly data
const monthlyData = [
  { month: 'Jan', reports: 2, resolved: 1 },
  { month: 'Feb', reports: 3, resolved: 2 },
  { month: 'Mar', reports: 4, resolved: 3 },
  { month: 'Apr', reports: 3, resolved: 2 },
  { month: 'May', reports: 5, resolved: 3 },
  { month: 'Jun', reports: 7, resolved: 4 },
]

const weeklyData = [
  { day: 'Mon', reports: 2, resolved: 1, pending: 0 },
  { day: 'Tue', reports: 3, resolved: 2, pending: 1 },
  { day: 'Wed', reports: 4, resolved: 2, pending: 1 },
  { day: 'Thu', reports: 3, resolved: 2, pending: 0 },
  { day: 'Fri', reports: 5, resolved: 3, pending: 1 },
  { day: 'Sat', reports: 2, resolved: 1, pending: 0 },
  { day: 'Sun', reports: 1, resolved: 1, pending: 0 },
]

const pieData = [
  { name: 'Active', value: 4, color: '#f59e0b' },
  { name: 'Resolved', value: 12, color: '#10b981' },
  { name: 'Pending', value: 8, color: '#ef4444' },
]

const statusData = [
  { name: 'Reports', value: 24, color: '#10b981' },
  { name: 'Active', value: 4, color: '#f59e0b' },
  { name: 'Resolved', value: 12, color: '#3b82f6' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-gray-600 dark:text-gray-400">
            {entry.name}: <span className="font-medium text-gray-900 dark:text-white">{entry.value}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export const ReportsTrendChart = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">📈 Reports Trend</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Monthly report activity</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-xs text-gray-500">Reports</span>
          <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
          <span className="text-xs text-gray-500">Resolved</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} />
          <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="reports" 
            stroke="#10b981" 
            strokeWidth={3}
            fill="#10b981"
            fillOpacity={0.1}
            dot={{ r: 4, fill: '#10b981' }}
          />
          <Area 
            type="monotone" 
            dataKey="resolved" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fill="#3b82f6"
            fillOpacity={0.1}
            dot={{ r: 4, fill: '#3b82f6' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export const WeeklyOverviewChart = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">📊 Weekly Overview</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">This week's activity</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={weeklyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6b7280' }} />
          <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="reports" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="resolved" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export const CaseDistributionChart = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">🎯 Case Distribution</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Case status breakdown</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export const StatusChart = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">📋 Status Overview</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Overall system status</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={statusData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} width={80} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export const LiveActivityChart = () => {
  const liveData = [
    { time: '10:00', reports: 2, resolved: 1 },
    { time: '10:15', reports: 3, resolved: 2 },
    { time: '10:30', reports: 4, resolved: 2 },
    { time: '10:45', reports: 3, resolved: 1 },
    { time: '11:00', reports: 5, resolved: 3 },
    { time: '11:15', reports: 2, resolved: 1 },
    { time: '11:30', reports: 4, resolved: 2 },
    { time: '11:45', reports: 3, resolved: 2 },
  ]

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">🔄 Live Activity</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Real-time updates
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={liveData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#6b7280' }} />
          <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="reports" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#10b981' }}
            activeDot={{ r: 6, fill: '#10b981' }}
          />
          <Line 
            type="monotone" 
            dataKey="resolved" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#3b82f6' }}
            activeDot={{ r: 6, fill: '#3b82f6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default {
  ReportsTrendChart,
  WeeklyOverviewChart,
  CaseDistributionChart,
  StatusChart,
  LiveActivityChart
}
