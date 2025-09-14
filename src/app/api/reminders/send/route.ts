import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// This will be called by a cron job (Vercel Cron or Upstash QStash)
export async function POST() {
  try {
    // Find overdue invoices that need reminders
    const overdueInvoices = await prisma.invoice.findMany({
      where: {
        status: { in: ['sent', 'overdue'] },
        paidAt: null,
        dueDate: { lt: new Date() },
        OR: [
          { nextReminderAt: null },
          { nextReminderAt: { lte: new Date() } }
        ]
      },
      include: {
        client: true,
        user: true
      }
    })

    const results = []

    for (const invoice of overdueInvoices) {
      const daysPastDue = Math.floor(
        (new Date().getTime() - invoice.dueDate.getTime()) / (1000 * 60 * 60 * 24)
      )

      // Determine reminder type based on days past due
      let reminderType = 'gentle'
      let nextReminderDays = 7

      if (daysPastDue >= 30) {
        reminderType = 'legal'
        nextReminderDays = 14
      } else if (daysPastDue >= 14) {
        reminderType = 'firm'
        nextReminderDays = 7
      } else if (daysPastDue >= 7) {
        reminderType = 'gentle'
        nextReminderDays = 7
      }

      // Send email reminder (integrate with Resend)
      const emailSent = await sendReminderEmail(invoice, reminderType)

      if (emailSent) {
        // Update invoice and create reminder record
        await prisma.invoice.update({
          where: { id: invoice.id },
          data: {
            status: 'overdue',
            daysPastDue,
            remindersSent: { increment: 1 },
            lastReminderAt: new Date(),
            nextReminderAt: new Date(Date.now() + nextReminderDays * 24 * 60 * 60 * 1000)
          }
        })

        await prisma.paymentReminder.create({
          data: {
            invoiceId: invoice.id,
            type: reminderType
          }
        })

        results.push({ invoiceId: invoice.id, type: reminderType, sent: true })
      }
    }

    return NextResponse.json({ 
      success: true, 
      remindersSent: results.length,
      results 
    })

  } catch (error) {
    console.error('Reminder sending failed:', error)
    return NextResponse.json(
      { error: 'Failed to send reminders' },
      { status: 500 }
    )
  }
}

async function sendReminderEmail(invoice: { 
  id: string; 
  number: string; 
  amount: number; 
  daysPastDue: number;
  dueDate: Date;
  client: { name: string; email: string }
}, type: string) {
  // Email templates based on reminder type
  const templates = {
    gentle: {
      subject: `Friendly reminder: Invoice ${invoice.number} is past due`,
      body: `Hi ${invoice.client.name},\n\nJust a friendly reminder that invoice ${invoice.number} for €${invoice.amount} was due on ${invoice.dueDate.toLocaleDateString()}.\n\nIf you've already sent payment, please disregard this message.\n\nBest regards`
    },
    firm: {
      subject: `Payment required: Invoice ${invoice.number} is ${invoice.daysPastDue} days overdue`,
      body: `Dear ${invoice.client.name},\n\nInvoice ${invoice.number} for €${invoice.amount} is now ${invoice.daysPastDue} days overdue.\n\nPlease arrange payment immediately to avoid further action.\n\nRegards`
    },
    legal: {
      subject: `Final notice: Invoice ${invoice.number} - Legal action pending`,
      body: `Dear ${invoice.client.name},\n\nThis is a final notice for invoice ${invoice.number} (€${invoice.amount}), which is now ${invoice.daysPastDue} days overdue.\n\nIf payment is not received within 7 days, we will be forced to pursue legal action.\n\nImmediate payment required.`
    }
  }

  try {
    // Here you would integrate with Resend or another email service
    // For now, just log the email
    console.log(`Sending ${type} reminder for invoice ${invoice.number}`)
    console.log(`To: ${invoice.client.email}`)
    console.log(`Subject: ${templates[type as keyof typeof templates].subject}`)
    
    // Return true to simulate successful sending
    return true
  } catch (error) {
    console.error('Email sending failed:', error)
    return false
  }
}
