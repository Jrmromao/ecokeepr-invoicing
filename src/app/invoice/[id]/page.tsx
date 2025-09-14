import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'

async function sendInvoice(invoiceId: string) {
  'use server'
  
  // TODO: Implement email sending with Resend
  console.log('Sending invoice:', invoiceId)
}

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await getCurrentUser()
  
  const invoice = await db.invoice.findFirst({
    where: { id, userId: user.id },
    include: {
      client: true,
      items: true
    }
  })
  
  if (!invoice) notFound()
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Action bar - only show for drafts */}
      {invoice.status === 'draft' && (
        <div className="mb-8 flex gap-4">
          <form action={() => sendInvoice(invoice.id)}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Send Invoice
            </button>
          </form>
          <button 
            onClick={() => window.print()}
            className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            Print/PDF
          </button>
        </div>
      )}
      
      {/* Brutal UX: Clean, printable invoice layout */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 print:border-0 print:shadow-none">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">INVOICE</h1>
            <p className="text-gray-600 mt-1">#{invoice.number}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              <p>Date: {format(invoice.createdAt, 'MMM dd, yyyy')}</p>
              <p>Due: {format(invoice.dueDate, 'MMM dd, yyyy')}</p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">From:</h3>
            <div className="text-gray-600">
              <p>{user.email}</p>
              {/* TODO: Add user business details */}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">To:</h3>
            <div className="text-gray-600">
              <p className="font-medium">{invoice.client.name}</p>
              <p>{invoice.client.email}</p>
              {invoice.client.address && <p>{invoice.client.address}</p>}
            </div>
          </div>
        </div>
        
        {/* Invoice items table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Qty</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Rate</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item: { id: string; description: string; quantity: any; rate: any; amount: any }) => (
                <tr key={item.id} className="border-t border-gray-200">
                  <td className="py-3 px-4">{item.description}</td>
                  <td className="text-right py-3 px-4">{item.quantity.toString()}</td>
                  <td className="text-right py-3 px-4">${item.rate.toString()}</td>
                  <td className="text-right py-3 px-4 font-medium">${item.amount.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Total */}
        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-2 border-t border-gray-200">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg">${invoice.amount.toString()}</span>
            </div>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
              invoice.status === 'sent' ? 'bg-blue-100 text-blue-800' :
              invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {invoice.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
      
      {/* Brutal honesty about payment */}
      {invoice.status !== 'paid' && (
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Payment:</strong> Stripe integration coming soon. For now, clients pay via bank transfer or check.
          </p>
        </div>
      )}
    </div>
  )
}
