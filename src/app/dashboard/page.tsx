'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Invoice {
  id: number
  clientName: string
  clientEmail: string
  amount: string
  dueDate: string
  description: string
  status: string
  createdAt: string
  remindersSent: number
  lastReminderAt: string | null
}

export default function Dashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      const response = await fetch('/api/invoices')
      const data = await response.json()
      setInvoices(data.invoices || [])
    } catch (error) {
      console.error('Failed to fetch invoices:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const sendReminder = async (invoiceId: number) => {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/remind`, {
        method: 'POST'
      })
      
      if (response.ok) {
        alert('Reminder sent successfully!')
        fetchInvoices() // Refresh list
      } else {
        alert('Failed to send reminder')
      }
    } catch (error) {
      alert('Error sending reminder')
    }
  }

  const markAsPaid = async (invoiceId: number) => {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/paid`, {
        method: 'POST'
      })
      
      if (response.ok) {
        alert('Invoice marked as paid!')
        fetchInvoices() // Refresh list
      } else {
        alert('Failed to update invoice')
      }
    } catch (error) {
      alert('Error updating invoice')
    }
  }

  const totalOwed = invoices
    .filter(inv => inv.status !== 'paid')
    .reduce((sum, inv) => sum + parseFloat(inv.amount), 0)

  const overdueCount = invoices.filter(inv => {
    if (inv.status === 'paid') return false
    return new Date(inv.dueDate) < new Date()
  }).length

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">€</span>
              </div>
              <span className="text-xl font-bold">EcoKeepr</span>
            </div>
            <Link 
              href="/create"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              + New Invoice
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Owed</h3>
            <p className="text-3xl font-bold text-gray-900">€{totalOwed.toFixed(2)}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-red-200 bg-red-50">
            <h3 className="text-sm font-medium text-red-600 mb-2">Overdue Invoices</h3>
            <p className="text-3xl font-bold text-red-700">{overdueCount}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Invoices</h3>
            <p className="text-3xl font-bold text-gray-900">{invoices.length}</p>
          </div>
        </div>

        {/* Invoice List */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Your Invoices</h2>
          </div>
          
          {invoices.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500 mb-4">No invoices yet</p>
              <Link 
                href="/create"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Create Your First Invoice
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {invoices.map((invoice) => {
                    const isOverdue = new Date(invoice.dueDate) < new Date() && invoice.status !== 'paid'
                    
                    return (
                      <tr key={invoice.id}>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{invoice.clientName}</div>
                          <div className="text-sm text-gray-500">{invoice.clientEmail}</div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          €{parseFloat(invoice.amount).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(invoice.dueDate).toLocaleDateString()}
                          {isOverdue && (
                            <div className="text-red-600 text-xs font-medium">OVERDUE</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            invoice.status === 'paid' 
                              ? 'bg-green-100 text-green-800'
                              : isOverdue
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {invoice.status === 'paid' ? 'Paid' : isOverdue ? 'Overdue' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {invoice.status !== 'paid' && (
                              <>
                                <button
                                  onClick={() => sendReminder(invoice.id)}
                                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                  Send Reminder
                                </button>
                                <button
                                  onClick={() => markAsPaid(invoice.id)}
                                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                                >
                                  Mark Paid
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
