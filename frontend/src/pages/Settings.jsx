import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Lock, Database, Globe } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Settings = () => {
  const sections = [
    { icon: User, label: 'Profile', desc: 'Update your personal information' },
    { icon: Bell, label: 'Notifications', desc: 'Manage your notification preferences' },
    { icon: Lock, label: 'Security', desc: 'Password and security settings' },
    { icon: Database, label: 'Data', desc: 'Export or delete your data' },
    { icon: Globe, label: 'Preferences', desc: 'Language and regional settings' },
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-slate-50/80 to-gray-100/80 min-h-screen">
      <PageHeader 
        icon={Settings}
        title="Settings"
        subtitle="System preferences and account management"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section, i) => (
          <motion.div
            key={section.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-emerald-200 group cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition">
                <section.icon className="text-emerald-600" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{section.label}</h4>
                <p className="text-sm text-gray-500 mt-0.5">{section.desc}</p>
              </div>
              <span className="ml-auto text-gray-300 group-hover:text-emerald-500 transition">→</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
