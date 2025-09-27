'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createInvoice } from '@/lib/actions'

export default function CreateInvoice() {
  const [isLoading, setIsLoading] = useState(false)
  const [invoice, setInvoice] = useState({
    clientName: '',
    clientEmail: '',
    amount: '',
    dueDate: '',
    description: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('clientName', invoice.clientName)
      formData.append('clientEmail', invoice.clientEmail)
      formData.append('description', invoice.description)
      formData.append('amount', invoice.amount)
      
      await createInvoice(formData)
    } catch (error) {
      console.error('Error creating invoice:', error)
      alert('Error creating invoice')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">€</span>
              </div>
              <span className="text-xl font-bold">EcoKeepr</span>
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Invoice</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Client Name *
            </label>
            <input
              type="text"
              required
              value={invoice.clientName}
              onChange={(e) => setInvoice({...invoice, clientName: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Client Email *
            </label>
            <input
              type="email"
              required
              value={invoice.clientEmail}
              onChange={(e) => setInvoice({...invoice, clientEmail: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="john@company.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Amount (€) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={invoice.amount}
                onChange={(e) => setInvoice({...invoice, amount: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1500.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Due Date *
              </label>
              <input
                type="date"
                required
                value={invoice.dueDate}
                onChange={(e) => setInvoice({...invoice, dueDate: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={invoice.description}
              onChange={(e) => setInvoice({...invoice, description: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Web development services for Q3 2024"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Invoice...' : 'Create Invoice'}
          </button>
        </form>
      </main>
    </div>
  )
}
