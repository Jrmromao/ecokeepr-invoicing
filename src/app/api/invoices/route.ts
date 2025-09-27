import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage for MVP (replace with database later)
let invoices: any[] = []
let nextId = 1

export async function GET() {
  return NextResponse.json({ invoices })
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const invoice = {
      id: nextId++,
      ...data,
      status: 'draft',
      createdAt: new Date().toISOString(),
      remindersSent: 0,
      lastReminderAt: null
    }

    invoices.push(invoice)

    return NextResponse.json({ 
      success: true, 
      invoice 
    })

  } catch (error) {
    console.error('Invoice creation failed:', error)
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    )
  }
}
