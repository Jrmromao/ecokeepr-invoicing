import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const invoiceId = parseInt(params.id)
    
    // Get invoices from global scope
    const { invoices: globalInvoices } = require('../../route')
    
    // Find invoice
    const invoiceIndex = globalInvoices.findIndex((inv: any) => inv.id === invoiceId)
    if (invoiceIndex === -1) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      )
    }

    // Update invoice status
    globalInvoices[invoiceIndex] = {
      ...globalInvoices[invoiceIndex],
      status: 'paid',
      paidAt: new Date().toISOString()
    }

    console.log(`✅ Invoice #${invoiceId} marked as paid`)

    return NextResponse.json({ 
      success: true,
      message: 'Invoice marked as paid'
    })

  } catch (error) {
    console.error('Failed to mark invoice as paid:', error)
    return NextResponse.json(
      { error: 'Failed to update invoice' },
      { status: 500 }
    )
  }
}
