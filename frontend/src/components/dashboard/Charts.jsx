import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export const BarChartComponent = ({ data, dataKey, nameKey, title }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
    <h3 className="font-semibold text-gray-800 mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis dataKey={nameKey} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: 'white', borderRadius: '12px', border: 'none' }} />
        <Bar dataKey={dataKey} fill="#10b981" radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const PieChartComponent = ({ data, title }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
    <h3 className="font-semibold text-gray-800 mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" labelLine={true} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={100} fill="#8884d8" dataKey="value">
          {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip contentStyle={{ background: 'white', borderRadius: '12px', border: 'none' }} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);
