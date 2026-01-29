import React from 'react'
import clsx from 'clsx'

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-600 focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-purple-600 focus:ring-secondary',
    success: 'bg-success text-white hover:bg-green-600 focus:ring-success',
    danger: 'bg-danger text-white hover:bg-red-600 focus:ring-danger',
    outline: 'border-2 border-primary text-primary hover:bg-blue-50 focus:ring-primary'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
