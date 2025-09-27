import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 503 }
      )
    }

    const Stripe = require('stripe')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    })

    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: any

    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        console.log('Payment successful:', session.id)
        
        // Here you would:
        // 1. Update user subscription in database
        // 2. Send confirmation email
        // 3. Grant access to pro features
        
        break

      case 'customer.subscription.updated':
        const subscription = event.data.object
        console.log('Subscription updated:', subscription.id)
        
        // Handle subscription changes
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object
        console.log('Subscription cancelled:', deletedSubscription.id)
        
        // Handle subscription cancellation
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
