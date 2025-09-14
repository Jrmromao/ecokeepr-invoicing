'use client'

import Link from 'next/link'
import { AuthButton } from '@/components/auth-button'
import { useState, useEffect } from 'react'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
        }}
      ></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

      {/* Header */}
      <header className="relative z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur-lg opacity-75"></div>
                <div className="relative w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-black text-xl">€</span>
                </div>
              </div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                EcoKeepr
              </h1>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-cyan-500/50 rounded-xl blur-lg"></div>
              <div className="relative">
                <AuthButton />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          {/* Floating badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 mb-12 group hover:scale-105 transition-all duration-500">
            <div className="relative">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-ping absolute"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <span className="text-white/90 font-medium">1,247 freelancers recovered €3.2M this month</span>
            <div className="text-green-400">↗</div>
          </div>

          {/* Main headline with typing effect */}
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              STOP LOSING
            </span>
            <span className="block bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-pulse">
              YOUR MONEY
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-white/80 max-w-4xl mx-auto mb-16 leading-relaxed font-light">
            Automated payment recovery that actually works. 
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
              {' '}Get paid 3x faster
            </span> without lifting a finger.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link href="/create" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 backdrop-blur-xl">
                <span className="relative z-10">Start Recovering Money</span>
              </div>
            </Link>
            <button className="group relative px-10 py-5 border-2 border-white/20 rounded-2xl font-bold text-xl hover:border-white/40 hover:bg-white/5 transition-all duration-300 backdrop-blur-xl">
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Watch Demo
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
            <div className="group">
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  €3.2M+
                </div>
                <div className="text-white/60 font-medium">Recovered This Month</div>
              </div>
            </div>
            <div className="group">
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  1,247
                </div>
                <div className="text-white/60 font-medium">Active Users</div>
              </div>
            </div>
            <div className="group">
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  3.2x
                </div>
                <div className="text-white/60 font-medium">Faster Payments</div>
              </div>
            </div>
          </div>
        </div>

        {/* Problem/Solution Bento Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Problem */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/50 to-orange-500/50 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative backdrop-blur-xl bg-black/40 border border-red-500/20 rounded-3xl p-10 hover:bg-black/60 transition-all duration-500">
              <div className="text-6xl mb-6">💸</div>
              <h3 className="text-3xl font-black text-red-400 mb-6">The Problem</h3>
              <div className="space-y-4 text-white/80 text-lg">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                  <span>You're owed <span className="text-red-400 font-bold">€15,000+</span> in unpaid invoices</span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Clients ghost you after receiving work</span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                  <span>You waste <span className="text-red-400 font-bold">10+ hours/week</span> chasing payments</span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                  <span><span className="text-red-400 font-bold">47%</span> of freelancers never recover overdue payments</span>
                </div>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/50 to-cyan-500/50 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative backdrop-blur-xl bg-black/40 border border-green-500/20 rounded-3xl p-10 hover:bg-black/60 transition-all duration-500">
              <div className="text-6xl mb-6">🚀</div>
              <h3 className="text-3xl font-black text-green-400 mb-6">The Solution</h3>
              <div className="space-y-4 text-white/80 text-lg">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                  <span><span className="text-green-400 font-bold">AI-powered</span> payment reminders</span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Escalates automatically: gentle → firm → legal</span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Tracks deadbeat clients automatically</span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                  <span>Shows <span className="text-green-400 font-bold">real-time recovery</span> analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Simple Pricing
          </h2>
          <p className="text-2xl text-white/60 mb-16 font-light">No BS. No hidden fees. Just results.</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-gray-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative backdrop-blur-xl bg-black/40 border border-white/20 rounded-3xl p-10 hover:bg-black/60 transition-all duration-500">
                <h3 className="text-3xl font-black text-white mb-4">Free</h3>
                <div className="text-6xl font-black text-white mb-6">€0</div>
                <p className="text-white/60 mb-8 text-lg">Perfect for testing</p>
                <div className="space-y-4 text-left mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-white/80">Track 10 invoices</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-white/80">Basic email reminders</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-white/80">No credit card required</span>
                  </div>
                </div>
                <button className="w-full py-4 border-2 border-white/30 rounded-2xl font-bold text-lg hover:border-white/50 hover:bg-white/5 transition-all duration-300 text-white">
                  Start Free
                </button>
              </div>
            </div>

            {/* Pro */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
              <div className="relative backdrop-blur-xl bg-black/60 border-2 border-purple-500/50 rounded-3xl p-10 hover:bg-black/80 transition-all duration-500">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-bold animate-pulse">
                    MOST POPULAR
                  </div>
                </div>
                <h3 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                  Pro
                </h3>
                <div className="text-6xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                  €29<span className="text-2xl">/mo</span>
                </div>
                <p className="text-white/60 mb-8 text-lg">For serious freelancers</p>
                <div className="space-y-4 text-left mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-purple-400/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    </div>
                    <span className="text-white/80"><span className="text-purple-400 font-bold">Unlimited</span> invoice tracking</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-purple-400/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    </div>
                    <span className="text-white/80">AI-powered reminder sequences</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-purple-400/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    </div>
                    <span className="text-white/80">Legal escalation templates</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-purple-400/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    </div>
                    <span className="text-white/80">Real-time recovery analytics</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-purple-400/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    </div>
                    <span className="text-white/80">SEPA payment integration</span>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <button className="relative w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
                    Start Pro Trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-3xl blur-2xl"></div>
          <div className="relative backdrop-blur-xl bg-black/40 border border-white/20 rounded-3xl p-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Ready to Get Paid?
            </h2>
            <p className="text-2xl text-white/70 mb-12 font-light">
              Join 1,247 European freelancers who recovered €3.2M with EcoKeepr
            </p>
            <Link href="/create" className="group relative inline-block">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-12 py-6 rounded-2xl font-black text-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
                Stop Losing Money - Start Free
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
