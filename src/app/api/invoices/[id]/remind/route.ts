import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend (will fallback to console if no API key)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Simple in-memory storage (same as main route)
let invoices: any[] = []

// Simple email templates
const getEmailTemplate = (invoice: any, reminderCount: number) => {
  const templates = [
    {
      subject: `Friendly reminder: Invoice due - €${invoice.amount}`,
      body: `Hi ${invoice.clientName},

Just a friendly reminder that your invoice for €${invoice.amount} was due on ${new Date(invoice.dueDate).toLocaleDateString()}.

Description: ${invoice.description || 'Services rendered'}

If you've already sent payment, please disregard this message.

Best regards,
EcoKeepr Payment Recovery`
    },
    {
      subject: `Payment required: Invoice overdue - €${invoice.amount}`,
      body: `Dear ${invoice.clientName},

Your invoice for €${invoice.amount} is now overdue (due: ${new Date(invoice.dueDate).toLocaleDateString()}).

Description: ${invoice.description || 'Services rendered'}

Please arrange payment immediately to avoid further action.

Regards,
EcoKeepr Payment Recovery`
    },
    {
      subject: `FINAL NOTICE: Immediate payment required - €${invoice.amount}`,
      body: `Dear ${invoice.clientName},

This is a FINAL NOTICE for your overdue invoice of €${invoice.amount}.

Due date: ${new Date(invoice.dueDate).toLocaleDateString()}
Description: ${invoice.description || 'Services rendered'}

If payment is not received within 7 days, we will be forced to pursue legal action.

IMMEDIATE PAYMENT REQUIRED.

Legal Department,
EcoKeepr Payment Recovery`
    }
  ]

  return templates[Math.min(reminderCount, 2)]
}

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

    const invoice = globalInvoices[invoiceIndex]
    
    // Get email template
    const template = getEmailTemplate(invoice, invoice.remindersSent)
    
    // Send email
    let emailSent = false
    
    if (resend) {
      try {
        await resend.emails.send({
          from: 'EcoKeepr <noreply@ecokeepr.com>',
          to: [invoice.clientEmail],
          subject: template.subject,
          text: template.body,
        })
        emailSent = true
        console.log(`✅ Email sent to ${invoice.clientEmail}`)
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError)
        // Continue anyway - log the attempt
      }
    }
    
    // Always log email (for development/backup)
    console.log('📧 REMINDER EMAIL:')
    console.log(`To: ${invoice.clientEmail}`)
    console.log(`Subject: ${template.subject}`)
    console.log(`Body: ${template.body}`)
    console.log(`Sent via Resend: ${emailSent}`)
    
    // Update invoice
    globalInvoices[invoiceIndex] = {
      ...invoice,
      remindersSent: invoice.remindersSent + 1,
      lastReminderAt: new Date().toISOString(),
      status: 'sent'
    }

    return NextResponse.json({ 
      success: true,
      message: emailSent ? 'Reminder sent successfully' : 'Reminder logged (email not configured)',
      emailSent
    })

  } catch (error) {
    console.error('Reminder sending failed:', error)
    return NextResponse.json(
      { error: 'Failed to send reminder' },
      { status: 500 }
    )
  }
}
