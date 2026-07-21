import React from 'react';
import { motion } from 'framer-motion';

const KPICard = ({ title, value, icon: Icon, color, trend, trendUp, subtitle }) => {
  return (
    <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
          <div className="flex items-center gap-1 mt-2">
            <span className={`text-xs font-semibold ${trendUp ? 'text-emerald-500' : 'text-red-500'}`}>{trend}</span>
            <span className="text-xs text-gray-400">{subtitle}</span>
          </div>
        </div>
        <div className={`bg-gradient-to-br ${color} p-3 rounded-2xl shadow-lg`}><Icon className="text-white" size={20} /></div>
      </div>
    </motion.div>
  );
};
export default KPICard;
