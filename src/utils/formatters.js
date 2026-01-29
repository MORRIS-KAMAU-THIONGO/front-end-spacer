// Format currency to USD
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

// Format date to readable format
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

// Format date and time
export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

// Calculate booking duration in hours
export const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  return Math.ceil((end - start) / (1000 * 60 * 60))
}

// Calculate total price
export const calculateTotalPrice = (pricePerHour, hours, taxRate = 0.1) => {
  const subtotal = pricePerHour * hours
  const tax = subtotal * taxRate
  return {
    subtotal,
    tax,
    total: subtotal + tax
  }
}
