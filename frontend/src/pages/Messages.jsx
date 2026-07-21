import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, Send, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Messages = () => {
  const [messages] = useState([
    { id: 1, from: 'Red Cross', subject: 'Missing person alert', time: '2 hours ago', unread: true },
    { id: 2, from: 'UNICEF', subject: 'Collaboration on case #123', time: '5 hours ago', unread: false },
    { id: 3, from: 'Nairobi Police', subject: 'Report update', time: '1 day ago', unread: false },
  ]);

  return (
    <div className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-slate-50/80 to-gray-100/80 min-h-screen">
      <PageHeader 
        icon={MessageSquare}
        title="Messages"
        subtitle="Communication with partners and field agents"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition shadow-sm">
            <Send size={16} />
            New Message
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-4 hover:bg-gray-50 transition flex items-center gap-4 ${msg.unread ? 'bg-emerald-50/50' : ''}`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-sm">
                  {msg.from.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    {msg.from}
                    {msg.unread && <span className="w-2 h-2 bg-emerald-500 rounded-full" />}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{msg.subject}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock size={14} />
                  {msg.time}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h4 className="font-semibold text-gray-800 mb-2">Quick Stats</h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Unread</span>
              <span className="font-semibold text-emerald-600">3</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total</span>
              <span className="font-semibold text-gray-800">12</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
