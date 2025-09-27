'use server'

import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function createInvoice(formData: FormData) {
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
  let user = await db.user.findUnique({
    where: { clerkId: userId }
  })

  if (!user) {
    const clerkUser = await currentUser()
    user = await db.user.create({
      data: {
        clerkId: userId,
        email: clerkUser?.emailAddresses[0]?.emailAddress || '',
      }
    })
  }
  
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
