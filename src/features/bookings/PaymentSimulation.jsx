import React, { useState } from 'react'
import { Button } from '../../components/ui'

export const PaymentSimulation = ({ bookingId, amount, onSuccess, onError, isLoading = false }) => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  })

  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setCardData(prev => ({ ...prev, [name]: value }))
  }

  const simulatePaymentProcessing = async (e) => {
    e.preventDefault()
    setPaymentProcessing(true)

    // Simulate payment delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Random success/failure (80% success rate)
    const isSuccess = Math.random() < 0.8

    if (isSuccess) {
      setPaymentStatus({
        success: true,
        message: 'Payment successful! Your booking has been confirmed.',
        transactionId: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase()
      })
      if (onSuccess) {
        onSuccess({ bookingId, amount, ...cardData })
      }
    } else {
      setPaymentStatus({
        success: false,
        message: 'Payment failed. Please try again.'
      })
      if (onError) {
        onError('Payment simulation failed')
      }
    }

    setPaymentProcessing(false)
  }

  if (paymentStatus) {
    return (
      <div className={`p-6 rounded-lg text-center ${paymentStatus.success ? 'bg-green-50' : 'bg-red-50'}`}>
        <div className={`inline-flex justify-center items-center w-12 h-12 rounded-full mb-4 ${paymentStatus.success ? 'bg-success' : 'bg-danger'}`}>
          {paymentStatus.success ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        <p className={`font-semibold mb-2 ${paymentStatus.success ? 'text-success' : 'text-danger'}`}>
          {paymentStatus.message}
        </p>
        {paymentStatus.transactionId && (
          <p className="text-sm text-gray-600 mb-4">
            Transaction ID: {paymentStatus.transactionId}
          </p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={simulatePaymentProcessing} className="space-y-4 max-w-md">
      <div className="bg-light p-4 rounded-lg mb-4">
        <p className="text-sm text-gray-600">Simulated Payment Amount</p>
        <p className="text-2xl font-bold text-primary">${amount.toFixed(2)}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Number (Test: 4111111111111111)
        </label>
        <input
          type="text"
          name="cardNumber"
          value={cardData.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          maxLength="19"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Holder Name
        </label>
        <input
          type="text"
          name="cardHolder"
          value={cardData.cardHolder}
          onChange={handleChange}
          placeholder="John Doe"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date (MM/YY)
          </label>
          <input
            type="text"
            name="expiryDate"
            value={cardData.expiryDate}
            onChange={handleChange}
            placeholder="12/25"
            maxLength="5"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVV
          </label>
          <input
            type="password"
            name="cvv"
            value={cardData.cvv}
            onChange={handleChange}
            placeholder="123"
            maxLength="3"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={paymentProcessing || isLoading}
        className="w-full"
      >
        {paymentProcessing ? 'Processing Payment...' : 'Pay Now'}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        This is a simulated payment form for demonstration purposes only.
      </p>
    </form>
  )
}

export default PaymentSimulation
