import React, { forwardRef } from 'react'

const Input = forwardRef(({
  label,
  error,
  className = '',
  required = false,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`
          w-full px-4 py-2 rounded-lg border
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          disabled:opacity-60 disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
