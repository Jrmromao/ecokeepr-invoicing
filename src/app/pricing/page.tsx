'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (priceId: string) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      })

      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">€</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              EcoKeepr
            </span>
          </Link>
        </div>
      </header>

      {/* Pricing Section */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">Choose the plan that works for your business</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Starter</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-5xl font-bold text-gray-900">€0</span>
              <span className="text-lg text-gray-600 ml-2">/month</span>
            </div>
            <p className="text-gray-600 mb-8">Perfect for testing our system</p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">Track up to 10 invoices</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">Basic email reminders</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">Payment status tracking</span>
              </li>
            </ul>

            <Link 
              href="/sign-up"
              className="w-full py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all text-center inline-block"
            >
              Start Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="relative bg-white border-2 border-blue-500 rounded-2xl p-8 shadow-lg">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                Most Popular
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Professional</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">€29</span>
              <span className="text-lg text-gray-600 ml-2">/month</span>
            </div>
            <p className="text-gray-600 mb-8">For serious freelancers and small businesses</p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-gray-700"><strong>Unlimited</strong> invoice tracking</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">Automated reminder sequences</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">Legal escalation templates</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">Recovery analytics dashboard</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">Priority email support</span>
              </li>
            </ul>

            <button
              onClick={() => handleSubscribe('price_pro_monthly')}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                'Start Professional Trial'
              )}
            </button>
          </div>
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            All plans include GDPR compliance and European banking integration
          </p>
          <p className="text-sm text-gray-500">
            Cancel anytime. No hidden fees. 30-day money-back guarantee.
          </p>
        </div>
      </main>
    </div>
  )
}
