import React from 'react'

const Card = ({ children, className = '', variant = 'default' }) => {
  const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    primary: 'bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800',
    success: 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800',
    danger: 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800',
    warning: 'bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800',
  }

  return (
    <div className={`rounded-xl shadow-sm ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}

export default Card
