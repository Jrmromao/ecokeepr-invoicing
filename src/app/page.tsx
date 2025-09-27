import Link from 'next/link'
import { AuthButton } from '@/components/auth-button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Professional header */}
      <header className="backdrop-blur-sm bg-white/90 border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">€</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                EcoKeepr
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6">
                <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Pricing
                </a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Contact
                </a>
              </nav>
              <AuthButton />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6">
        <div className="py-24 text-center">
          {/* Modern trust badge */}
          <div className="inline-flex items-center gap-3 bg-white border border-blue-200 rounded-full px-6 py-3 mb-12 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-900">Live</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <span className="text-sm font-medium text-gray-700">1,247 businesses recovered €3.2M this month</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Recover Unpaid Invoices
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Professionally
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Automated payment recovery system designed for European freelancers and businesses. 
            Professional reminders, legal templates, and comprehensive tracking.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link href="/dashboard" className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
              <div className="relative bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                Start Free Trial
              </div>
            </Link>
            <Link href="/pricing" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all">
              View Pricing
            </Link>
          </div>

          {/* Modern social proof */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-1">
                €3.2M+
              </div>
              <div className="text-sm text-gray-600 font-medium">Total Recovered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1">
                1,247
              </div>
              <div className="text-sm text-gray-600 font-medium">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-1">
                4.8/5
              </div>
              <div className="text-sm text-gray-600 font-medium">User Rating</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
