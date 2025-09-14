import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { AuthButton } from '@/components/auth-button'

async function createInvoice(formData: FormData) {
  'use server'
  
  const { userId } = await auth()
  
  // Brutal validation - no fancy Zod schemas for MVP
  const clientName = formData.get('clientName') as string
  const clientEmail = formData.get('clientEmail') as string
  const description = formData.get('description') as string
  const amount = parseFloat(formData.get('amount') as string)
  
  if (!clientName || !clientEmail || !description || !amount) {
    throw new Error('All fields required')
  }
  
  if (!userId) {
    // Redirect to sign in if not authenticated
    redirect('/sign-in?redirect_url=/create')
  }
  
  // Get or create user in our database
  const user = await getCurrentUser()
  
  // Create or find client
  let client = await db.client.findFirst({
    where: { email: clientEmail, userId: user.id }
  })
  
  if (!client) {
    client = await db.client.create({
      data: {
        name: clientName,
        email: clientEmail,
        userId: user.id
      }
    })
  }
  
  // Generate invoice number (brutal simplicity)
  const invoiceCount = await db.invoice.count({ where: { userId: user.id } })
  const invoiceNumber = `INV-${String(invoiceCount + 1).padStart(4, '0')}`
  
  // Create invoice with single item
  const invoice = await db.invoice.create({
    data: {
      number: invoiceNumber,
      amount,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      clientId: client.id,
      userId: user.id,
      items: {
        create: {
          description,
          quantity: 1,
          rate: amount,
          amount
        }
      }
    }
  })
  
  redirect(`/invoice/${invoice.id}`)
}

export default async function CreateInvoice() {
  let user = null
  
  try {
    user = await getCurrentUser()
  } catch {
    // User not authenticated, will show sign-in prompt
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">EcoKeepr</Link>
          <AuthButton />
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">Create Invoice</h1>
        
        {/* Brutal honesty about auth requirement */}
        {!user && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Sign in required:</strong> You can fill out the form, but you&apos;ll need to sign in to save your invoice.
            </p>
          </div>
        )}
        
        {/* Brutal UX: All fields on one page, no steps, no complexity */}
        <form action={createInvoice} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Client Name</label>
              <input
                name="clientName"
                type="text"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Acme Corp"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Client Email</label>
              <input
                name="clientEmail"
                type="email"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="client@acme.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              required
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Website development services"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Amount ($)</label>
              <input
                name="amount"
                type="number"
                step="0.01"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="1500.00"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              {user ? 'Create Invoice' : 'Sign In & Create'}
            </button>
            <Link
              href="/"
              className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 inline-block"
            >
              Cancel
            </Link>
          </div>
        </form>
        
        {/* Brutal honesty about limitations */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>MVP Limitations:</strong> Single line item only. Multiple items coming in v2.
          </p>
        </div>
      </div>
    </div>
  )
}
