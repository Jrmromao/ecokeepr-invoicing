import { auth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export default async function Dashboard() {
  const { userId } = auth()
  
  if (!userId) {
    return <div>Please sign in</div>
  }

  // Get user's invoice statistics
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      invoices: {
        include: {
          client: true,
          reminders: true
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!user) {
    return <div>User not found</div>
  }

  // Calculate statistics
  const totalOwed = user.invoices
    .filter(inv => inv.status !== 'paid')
    .reduce((sum, inv) => sum + Number(inv.amount), 0)

  const overdueInvoices = user.invoices.filter(inv => 
    inv.status === 'overdue' || 
    (inv.dueDate < new Date() && inv.status !== 'paid')
  )

  const totalOverdue = overdueInvoices
    .reduce((sum, inv) => sum + Number(inv.amount), 0)

  const avgDaysToPay = user.invoices
    .filter(inv => inv.paidAt)
    .reduce((sum, inv, _, arr) => {
      const days = Math.floor(
        (inv.paidAt!.getTime() - inv.dueDate.getTime()) / (1000 * 60 * 60 * 24)
      )
      return sum + days / arr.length
    }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Payment Tracker</h1>
            <Link 
              href="/create" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Invoice
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Owed</h3>
            <p className="text-3xl font-bold text-gray-900">€{totalOwed.toFixed(2)}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-red-200 bg-red-50">
            <h3 className="text-sm font-medium text-red-600 mb-2">Overdue Amount</h3>
            <p className="text-3xl font-bold text-red-700">€{totalOverdue.toFixed(2)}</p>
            <p className="text-sm text-red-600 mt-1">{overdueInvoices.length} invoices</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Avg Days to Pay</h3>
            <p className="text-3xl font-bold text-gray-900">{avgDaysToPay.toFixed(0)}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-green-200 bg-green-50">
            <h3 className="text-sm font-medium text-green-600 mb-2">This Month Collected</h3>
            <p className="text-3xl font-bold text-green-700">€{
              user.invoices
                .filter(inv => inv.paidAt && inv.paidAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
                .reduce((sum, inv) => sum + Number(inv.amount), 0)
                .toFixed(2)
            }</p>
          </div>
        </div>

        {/* Overdue Invoices Alert */}
        {overdueInvoices.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-red-800 mb-4">
              🚨 {overdueInvoices.length} Overdue Invoices Need Attention
            </h2>
            <div className="space-y-3">
              {overdueInvoices.slice(0, 3).map(invoice => (
                <div key={invoice.id} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{invoice.client.name}</span>
                    <span className="text-gray-600 ml-2">Invoice #{invoice.number}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-red-700">€{Number(invoice.amount).toFixed(2)}</div>
                    <div className="text-sm text-red-600">
                      {Math.floor((new Date().getTime() - invoice.dueDate.getTime()) / (1000 * 60 * 60 * 24))} days overdue
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Invoices */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Recent Invoices</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reminders</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {user.invoices.slice(0, 10).map(invoice => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{invoice.client.name}</div>
                      <div className="text-sm text-gray-500">{invoice.client.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{invoice.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      €{Number(invoice.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {invoice.dueDate.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        invoice.status === 'paid' 
                          ? 'bg-green-100 text-green-800'
                          : invoice.status === 'overdue'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {invoice.remindersSent} sent
                      {invoice.lastReminderAt && (
                        <div className="text-xs text-gray-500">
                          Last: {invoice.lastReminderAt.toLocaleDateString()}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
