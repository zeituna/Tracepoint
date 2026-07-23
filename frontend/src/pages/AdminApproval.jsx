import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, MessageSquare, Users } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const AdminApproval = () => {
  const [pendingMessages, setPendingMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 });

  const fetchPendingMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/chat/pending-messages');
      const data = await response.json();
      setPendingMessages(Array.isArray(data) ? data : []);
      setStats(prev => ({ ...prev, pending: data.length }));
    } catch (error) {
      console.error('Error fetching pending messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (messageId, action) => {
    try {
      const response = await fetch(`http://localhost:5000/api/chat/messages/${messageId}/review`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, admin_id: 1 })
      });
      
      if (response.ok) {
        setPendingMessages(prev => prev.filter(m => m.id !== messageId));
        setStats(prev => ({
          ...prev,
          pending: prev.pending - 1,
          [action === 'approve' ? 'approved' : 'rejected']: prev[action === 'approve' ? 'approved' : 'rejected'] + 1
        }));
      }
    } catch (error) {
      console.error('Error reviewing message:', error);
    }
  };

  useEffect(() => {
    fetchPendingMessages();
    const interval = setInterval(fetchPendingMessages, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gradient-to-br from-slate-50/80 to-gray-100/80 min-h-screen">
      <PageHeader
        icon={MessageSquare}
        title="Message Approval"
        subtitle="Review and approve messages from users"
        actions={
          <button
            onClick={fetchPendingMessages}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition shadow-sm"
          >
            <Users size={16} />
            Refresh ({pendingMessages.length} pending)
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
              <p className="text-sm text-gray-500">Pending Approval</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="text-emerald-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.approved}</p>
              <p className="text-sm text-gray-500">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <XCircle className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.rejected}</p>
              <p className="text-sm text-gray-500">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Messages */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <MessageSquare size={18} className="text-emerald-500" />
            Pending Messages
            <span className="text-xs text-gray-400 ml-auto">
              {loading ? 'Loading...' : `${pendingMessages.length} messages waiting`}
            </span>
          </h3>
        </div>
        <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            </div>
          ) : pendingMessages.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <MessageSquare size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No pending messages</p>
              <p className="text-xs">All messages have been reviewed</p>
            </div>
          ) : (
            pendingMessages.map((message) => (
              <div key={message.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm font-medium">
                        {message.sender_name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{message.sender_name}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(message.created_at).toLocaleString()}
                        </p>
                      </div>
                      <span className="ml-auto text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock size={12} />
                        Pending
                      </span>
                    </div>
                    <p className="text-gray-700 bg-gray-50 rounded-lg p-3 mt-1">
                      {message.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Conversation: {message.conversation_subject || 'General'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleReview(message.id, 'approve')}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition font-medium"
                  >
                    <CheckCircle size={18} />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReview(message.id, 'reject')}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition font-medium"
                  >
                    <XCircle size={18} />
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminApproval;
