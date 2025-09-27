import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Payment system not configured. Please contact support.' },
        { status: 503 }
      )
    }

    const Stripe = require('stripe')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    })

    const { amount, currency = 'eur' } = await request.json()

    if (!amount || amount < 50) {
      return NextResponse.json(
        { error: 'Amount must be at least €0.50' },
        { status: 400 }
      )
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        service: 'ecokeepr-pro-subscription'
      }
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })

  } catch (error) {
    console.error('Payment intent creation failed:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
