import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ icon: Icon, title, subtitle, actions }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
    >
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-200/50">
            <Icon className="text-emerald-600" size={28} />
          </div>
        )}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </motion.div>
  );
};

export default PageHeader;
