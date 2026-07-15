import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  BellRing,
  Building2,
  CheckCircle2,
  ChevronDown,
  FileText,
  Filter,
  MapPinned,
  MessageSquare,
  PieChart as PieChartIcon,
  Search,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  UserPlus,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    reports: 0,
    messages: 0,
    cases: { total: 0, active: 0, resolved: 0, pending: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortKey, setSortKey] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setLoading(false);
          return;
        }

        const usersRes = await fetch('http://localhost:5000/api/users/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const usersData = await usersRes.json();

        const casesRes = await fetch('http://localhost:5000/api/cases/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const casesData = await casesRes.json();

        const messagesRes = await fetch('http://localhost:5000/api/messages', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const messagesData = await messagesRes.json();

        setStats({
          users: usersData.total || 0,
          reports: casesData.total || 0,
          messages: messagesData.length || 0,
          cases: casesData,
        });
      } catch (err) {
        console.error('Fetch stats error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const reportsOverTime = [
    { name: 'Jan', reports: 18, resolved: 12 },
    { name: 'Feb', reports: 24, resolved: 18 },
    { name: 'Mar', reports: 20, resolved: 16 },
    { name: 'Apr', reports: 30, resolved: 24 },
    { name: 'May', reports: 28, resolved: 20 },
    { name: 'Jun', reports: 34, resolved: 28 },
  ];

  const caseMixData = [
    { name: 'Active', value: stats.cases.active || 0 },
    { name: 'Resolved', value: stats.cases.resolved || 0 },
    { name: 'Pending', value: stats.cases.pending || 0 },
  ];

  const countyData = [
    { county: 'Nairobi', value: 12 },
    { county: 'Mombasa', value: 7 },
    { county: 'Kisumu', value: 5 },
    { county: 'Nakuru', value: 8 },
    { county: 'Kajiado', value: 4 },
  ];

  const monthlyActivity = [
    { month: 'Jan', activity: 14 },
    { month: 'Feb', activity: 18 },
    { month: 'Mar', activity: 12 },
    { month: 'Apr', activity: 22 },
    { month: 'May', activity: 19 },
    { month: 'Jun', activity: 26 },
  ];

  const recentReports = [
    { id: 'TP-1024', personName: 'Esther Njeri', county: 'Nairobi', date: '2026-07-07', status: 'Pending', officer: 'Officer Kimani' },
    { id: 'TP-1025', personName: 'James Ochieng', county: 'Kisumu', date: '2026-07-06', status: 'Active', officer: 'Officer Amina' },
    { id: 'TP-1026', personName: 'Grace Wanjiru', county: 'Mombasa', date: '2026-07-05', status: 'Resolved', officer: 'Officer T. Mugo' },
    { id: 'TP-1027', personName: 'Brian Mutua', county: 'Nakuru', date: '2026-07-04', status: 'Review', officer: 'Officer Njeri' },
    { id: 'TP-1028', personName: 'Sarah Kamau', county: 'Kajiado', date: '2026-07-03', status: 'Active', officer: 'Officer L. Wekesa' },
    { id: 'TP-1029', personName: 'David Otieno', county: 'Nairobi', date: '2026-07-03', status: 'Pending', officer: 'Officer K. Langat' },
  ];

  const activityTimeline = [
    { title: 'New report filed', detail: 'Esther Njeri submitted an urgent report from Nairobi.', time: '2 min ago', icon: FileText },
    { title: 'Case updated', detail: 'Case TP-1025 was reassigned to Officer Amina.', time: '18 min ago', icon: Activity },
    { title: 'Alert broadcast', detail: 'High-priority county alert was sent to field teams.', time: '42 min ago', icon: BellRing },
    { title: 'User registered', detail: 'A new NGO partner account was approved.', time: '1 hr ago', icon: UserPlus },
    { title: 'Case closed', detail: 'Case TP-1018 was marked resolved by the district team.', time: '3 hrs ago', icon: CheckCircle2 },
  ];

  const quickActions = [
    { title: 'Report Missing Person', icon: FileText, accent: 'emerald' },
    { title: 'Register Organization', icon: Building2, accent: 'sky' },
    { title: 'Add User', icon: Users, accent: 'violet' },
    { title: 'Broadcast Alert', icon: BellRing, accent: 'amber' },
    { title: 'View Active Cases', icon: Activity, accent: 'slate' },
  ];

  const notificationItems = [
    { title: 'Pending review', detail: 'Three high-priority reports need officer validation.', type: 'alert' },
    { title: 'System announcement', detail: 'Weekly operations briefing has been published.', type: 'info' },
    { title: 'Case escalation', detail: 'Kisumu County case requires response coordination.', type: 'critical' },
  ];

  const summaryCards = [
    {
      title: 'Total Reports',
      value: stats.reports,
      label: 'Reports submitted',
      icon: FileText,
      trend: '+8%',
      trendUp: true,
      tone: 'bg-emerald-600',
    },
    {
      title: 'Missing Persons',
      value: stats.cases.active || 0,
      label: 'Currently active',
      icon: ShieldAlert,
      trend: '+4%',
      trendUp: true,
      tone: 'bg-sky-600',
    },
    {
      title: 'Active Cases',
      value: stats.cases.active || 0,
      label: 'In progress',
      icon: Activity,
      trend: '-2%',
      trendUp: false,
      tone: 'bg-amber-600',
    },
    {
      title: 'Registered Users',
      value: stats.users,
      label: 'Verified accounts',
      icon: Users,
      trend: '+12%',
      trendUp: true,
      tone: 'bg-violet-600',
    },
  ];

  const pieColors = ['#0f766e', '#d4a445', '#475569'];

  const filteredReports = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    const next = recentReports.filter((report) => {
      const matchesSearch = !normalized || [report.id, report.personName, report.county, report.officer].some((value) => value.toLowerCase().includes(normalized));
      const matchesStatus = statusFilter === 'All' || report.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    next.sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      if (sortKey === 'date') {
        return (new Date(a.date) - new Date(b.date)) * direction;
      }
      return a[sortKey].localeCompare(b[sortKey]) * direction;
    });

    return next;
  }, [searchTerm, statusFilter, sortKey, sortDirection]);

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filteredReports.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedReports = filteredReports.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleSort = (column) => {
    if (sortKey === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(column);
      setSortDirection('asc');
    }
  };

  const statusBadgeClass = (status) => {
    const map = {
      Active: 'bg-emerald-100 text-emerald-700',
      Pending: 'bg-amber-100 text-amber-700',
      Resolved: 'bg-sky-100 text-sky-700',
      Review: 'bg-violet-100 text-violet-700',
    };
    return map[status] || 'bg-slate-100 text-slate-700';
  };

  const greetings = ['Good Morning', 'Good Afternoon', 'Good Evening', 'Good Night'];
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return greetings[0];
    if (hour < 17) return greetings[1];
    if (hour < 21) return greetings[2];
    return greetings[3];
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-16 w-16 rounded-full border-4 border-emerald-700 border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="space-y-5 p-4 md:p-5">
      <motion.section
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-[26px] border border-emerald-900/10 bg-[linear-gradient(135deg,#0f3e2d,#13533d)] p-6 shadow-[0_22px_60px_rgba(10,35,24,0.18)]"
      >
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-amber-300/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-emerald-400/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-xl border border-white/15 bg-white/10 p-2 text-amber-100">
                <Sparkles size={20} />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-emerald-50/75">
                {getGreeting()} • TracePoint Operations
              </span>
            </div>
            <h1 className="text-3xl font-semibold text-white md:text-4xl">Welcome back, Admin</h1>
            <p className="mt-2 max-w-xl text-sm text-emerald-50/80 md:text-base">
              Maintain a secure overview of missing person cases, field response activity, and institutional coordination across your network.
            </p>
          </div>

          <div className="grid gap-3 rounded-[22px] border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:grid-cols-3">
            <div className="rounded-2xl bg-white/6 px-3 py-4">
              <div className="text-[11px] uppercase tracking-[0.3em] text-amber-100/70">Reports</div>
              <div className="mt-2 text-2xl font-semibold text-white">{stats.reports}</div>
            </div>
            <div className="rounded-2xl bg-white/6 px-3 py-4">
              <div className="text-[11px] uppercase tracking-[0.3em] text-amber-100/70">Active</div>
              <div className="mt-2 text-2xl font-semibold text-white">{stats.cases.active || 0}</div>
            </div>
            <div className="rounded-2xl bg-white/6 px-3 py-4">
              <div className="text-[11px] uppercase tracking-[0.3em] text-amber-100/70">Users</div>
              <div className="mt-2 text-2xl font-semibold text-white">{stats.users}</div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card, index) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">{card.title}</p>
                <div className="mt-3 text-3xl font-semibold text-slate-900">{card.value}</div>
                <p className="mt-1 text-xs text-slate-400">{card.label}</p>
              </div>
              <div className={`rounded-2xl p-3 text-white shadow-lg ${card.tone}`}>
                <card.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className={card.trendUp ? 'text-emerald-600' : 'text-red-500'}>{card.trend}</span>
              <span className="text-slate-400">vs last month</span>
              {card.trendUp ? <TrendingUp size={16} className="text-emerald-600" /> : <TrendingDown size={16} className="text-red-500" />}
            </div>
          </motion.article>
        ))}
      </section>

      <section className="grid gap-4 2xl:grid-cols-4">
        <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)] 2xl:col-span-2">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="flex items-center gap-2 text-base font-semibold text-slate-800">
              <BarChart3 size={18} className="text-emerald-700" />
              Reports Over Time
            </h3>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">12-month view</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={reportsOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', borderRadius: '16px', border: '1px solid #e5e7eb' }} />
              <Legend />
              <Bar dataKey="reports" fill="#0f766e" radius={[5, 5, 0, 0]} />
              <Bar dataKey="resolved" fill="#d4a445" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>

        <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-800">
            <PieChartIcon size={18} className="text-amber-600" />
            Active vs Resolved Cases
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={caseMixData} cx="50%" cy="52%" outerRadius={88} labelLine={true} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {caseMixData.map((entry, index) => (
                  <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#fff', borderRadius: '16px', border: '1px solid #e5e7eb' }} />
            </PieChart>
          </ResponsiveContainer>
        </article>

        <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-800">
            <MapPinned size={18} className="text-sky-700" />
            Missing Persons by County
          </h3>
          <div className="space-y-3">
            {countyData.map((item) => (
              <div key={item.county}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-slate-600">{item.county}</span>
                  <span className="font-medium text-slate-800">{item.value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-[linear-gradient(90deg,#0f766e,#d4a445)]" style={{ width: `${item.value * 8}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)] 2xl:col-span-2">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="flex items-center gap-2 text-base font-semibold text-slate-800">
              <Activity size={18} className="text-violet-700" />
              Monthly Activity
            </h3>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">Current cycle</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', borderRadius: '16px', border: '1px solid #e5e7eb' }} />
              <Bar dataKey="activity" fill="#1d4ed8" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-800">Recent Reports</h3>
              <p className="text-xs text-slate-400">Search, filter, and manage open incident reports.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search reports"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-emerald-500 sm:w-56"
                />
              </div>
              <div className="relative">
                <Filter size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-sm outline-none focus:border-emerald-500 sm:w-40"
                >
                  <option>All</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Resolved</option>
                  <option>Review</option>
                </select>
                <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  {[
                    ['id', 'Report ID'],
                    ['personName', 'Person Name'],
                    ['county', 'County'],
                    ['date', 'Date Reported'],
                    ['status', 'Status'],
                    ['officer', 'Assigned Officer'],
                  ].map(([key, label]) => (
                    <th key={key} className="px-3 py-3 font-medium">
                      <button onClick={() => handleSort(key)} className="inline-flex items-center gap-1">
                        {label}
                        {sortKey === key ? (sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />) : null}
                      </button>
                    </th>
                  ))}
                  <th className="px-3 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedReports.map((report) => (
                  <tr key={report.id} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-3 py-3 font-semibold text-slate-700">{report.id}</td>
                    <td className="px-3 py-3 text-slate-700">{report.personName}</td>
                    <td className="px-3 py-3 text-slate-600">{report.county}</td>
                    <td className="px-3 py-3 text-slate-600">{report.date}</td>
                    <td className="px-3 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass(report.status)}`}>{report.status}</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{report.officer}</td>
                    <td className="px-3 py-3">
                      <button className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200">
                        View
                        <ArrowUpRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-400">Showing {paginatedReports.length} of {filteredReports.length} reports</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:border-emerald-500 hover:text-emerald-700"
              >
                Prev
              </button>
              <span className="text-sm text-slate-500">Page {safePage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:border-emerald-500 hover:text-emerald-700"
              >
                Next
              </button>
            </div>
          </div>
        </article>

        <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-800">Notifications Panel</h3>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">Live feed</span>
          </div>
          <div className="space-y-3">
            {notificationItems.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 rounded-xl p-2 ${item.type === 'critical' ? 'bg-red-100 text-red-600' : item.type === 'info' ? 'bg-sky-100 text-sky-600' : 'bg-amber-100 text-amber-600'}`}>
                    <BellRing size={14} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{item.title}</div>
                    <div className="text-xs text-slate-500">{item.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-800">Recent Activity</h3>
            <span className="text-xs text-slate-400">Updated continuously</span>
          </div>
          <div className="space-y-3">
            {activityTimeline.map((item) => (
              <div key={item.title} className="flex gap-3 rounded-2xl border border-slate-100 p-3">
                <div className="mt-0.5 rounded-xl bg-emerald-50 p-2 text-emerald-700">
                  <item.icon size={16} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-800">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.detail}</div>
                </div>
                <div className="text-xs text-slate-400">{item.time}</div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-800">Quick Actions</h3>
            <span className="text-xs text-slate-400">One-click operations</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {quickActions.map((action) => (
              <button
                key={action.title}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-emerald-500 hover:bg-emerald-50"
              >
                <div className={`rounded-xl p-2 text-white ${action.accent === 'emerald' ? 'bg-emerald-600' : action.accent === 'sky' ? 'bg-sky-600' : action.accent === 'violet' ? 'bg-violet-600' : action.accent === 'amber' ? 'bg-amber-600' : 'bg-slate-700'}`}>
                  <action.icon size={16} />
                </div>
                <span className="text-sm font-medium text-slate-700">{action.title}</span>
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-800">Map Preview</h3>
            <button className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700">Open Tracking Page</button>
          </div>
          <div className="rounded-[18px] border border-slate-200 bg-[linear-gradient(135deg,#e2f3ee,#f7fbfa)] p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { title: 'Nairobi Central', count: '4 active', status: 'High urgency' },
                { title: 'Kisumu West', count: '2 active', status: 'Field review' },
                { title: 'Mombasa Coast', count: '3 active', status: 'Escalated' },
                { title: 'Nakuru North', count: '1 active', status: 'Resolved' },
              ].map((location) => (
                <div key={location.title} className="rounded-2xl border border-white/80 bg-white/90 p-3 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{location.title}</div>
                      <div className="mt-1 text-xs text-slate-500">{location.count}</div>
                    </div>
                    <MapPinned size={16} className="text-emerald-700" />
                  </div>
                  <div className="mt-3 text-[11px] font-medium text-amber-700">{location.status}</div>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-800">System Health</h3>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">Nominal</span>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Case synchronization', value: '98%', icon: Activity },
              { label: 'Officer response SLA', value: '94%', icon: ShieldAlert },
              { label: 'Alert delivery', value: '99%', icon: BellRing },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-700">
                    <item.icon size={15} className="text-emerald-700" />
                    {item.label}
                  </span>
                  <span className="font-semibold text-slate-800">{item.value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-[linear-gradient(90deg,#0f766e,#d4a445)]" style={{ width: item.value }}></div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Dashboard;
