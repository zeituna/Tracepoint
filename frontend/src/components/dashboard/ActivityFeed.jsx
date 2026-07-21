import React from 'react';
import { Clock, FileText, UserPlus, CheckCircle, Bell, Building2, MapPin } from 'lucide-react';

const activityIcons = {
  report: FileText,
  user: UserPlus,
  resolved: CheckCircle,
  alert: Bell,
  org: Building2,
  location: MapPin,
};

const ActivityFeed = ({ activities }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><Clock className="text-emerald-500" size={20} /> Recent Activity</h3>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-sm text-gray-400">No recent activity</p>
        ) : (
          activities.slice(0,5).map((act, idx) => {
            const Icon = activityIcons[act.type] || FileText;
            return (
              <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition">
                <div className={`p-2 bg-${act.color}-100 rounded-xl`}><Icon className={`text-${act.color}-500`} size={16} /></div>
                <div className="flex-1"><p className="text-sm font-medium text-gray-700">{act.text}</p><p className="text-xs text-gray-400">{act.time}</p></div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default ActivityFeed;
