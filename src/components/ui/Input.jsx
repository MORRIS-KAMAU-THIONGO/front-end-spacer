import React from 'react'
import clsx from 'clsx'

export const Input = ({ 
  label, 
  type = 'text', 
  error = '', 
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className={clsx(
          'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          error && 'border-danger focus:ring-danger',
          !error && 'border-gray-300',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-danger text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

export default Input
