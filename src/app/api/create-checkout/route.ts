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

    const { priceId, successUrl, cancelUrl } = await request.json()

    // Default to Pro plan if no priceId provided
    const defaultPriceId = priceId || 'price_pro_monthly_29eur'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: defaultPriceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        service: 'ecokeepr-subscription'
      }
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url
    })

  } catch (error) {
    console.error('Checkout session creation failed:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
