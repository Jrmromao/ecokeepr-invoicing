import Link from 'next/link'
import { AuthButton } from '@/components/auth-button'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Modern professional header */}
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
                <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Pricing</a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</a>
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
            <Link href="/create" className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
              <div className="relative bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                Start Free Trial
              </div>
            </Link>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all">
              Schedule Demo
            </button>
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

        {/* Modern Problem/Solution Cards */}
        <div className="py-24 border-t border-gray-100">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Problem */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white border border-red-200 rounded-2xl p-10 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-2xl">⚠️</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">The Challenge</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Average freelancer is owed <strong className="text-red-600">€12,000</strong> in unpaid invoices</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Manual follow-up consumes <strong className="text-red-600">5+ hours weekly</strong></span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong className="text-red-600">30%</strong> of overdue invoices are never collected</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Inconsistent follow-up damages professional relationships</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Solution */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white border border-green-200 rounded-2xl p-10 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-2xl">✅</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Solution</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong className="text-green-600">Automated sequences</strong> with professional templates</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Smart escalation from gentle reminders to legal notices</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Comprehensive payment tracking and analytics</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>GDPR-compliant with European banking integration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Features */}
        <div id="features" className="py-24 border-t border-gray-100">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Professional Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to recover payments efficiently and maintain professional relationships
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl"></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Automated Reminders</h3>
              <p className="text-gray-600 leading-relaxed">Professional email sequences that escalate appropriately while maintaining client relationships</p>
            </div>

            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl"></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Tracking</h3>
              <p className="text-gray-600 leading-relaxed">Real-time dashboard with comprehensive analytics showing payment status and recovery progress</p>
            </div>

            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl"></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Legal Templates</h3>
              <p className="text-gray-600 leading-relaxed">European-compliant legal notice templates for professional final demand letters</p>
            </div>
          </div>
        </div>

        {/* Modern Pricing */}
        <div id="pricing" className="py-24 border-t border-gray-100">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Simple, honest pricing designed for European businesses</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-10 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Starter</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-bold text-gray-900">€0</span>
                  <span className="text-lg text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-gray-600 mb-8">Perfect for testing our system</p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Track up to 10 invoices</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Basic email reminders</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Payment status tracking</span>
                  </li>
                </ul>
                <button className="w-full py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all">
                  Start Free
                </button>
              </div>
            </div>

            {/* Professional */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-blue-300 rounded-2xl opacity-75"></div>
              <div className="relative bg-white border-2 border-blue-500 rounded-2xl p-10 shadow-lg">
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
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700"><strong>Unlimited</strong> invoice tracking</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Automated reminder sequences</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Legal escalation templates</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Recovery analytics dashboard</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">SEPA payment integration</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Priority email support</span>
                  </li>
                </ul>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                  <button className="relative w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                    Start Professional Trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern CTA */}
        <div className="py-24 border-t border-gray-100">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl opacity-50"></div>
            <div className="relative text-center bg-white border border-gray-200 rounded-3xl p-16 shadow-sm">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Recover Your Money?</h2>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Join over 1,247 European businesses using EcoKeepr to automate professional payment recovery
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/create" className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                  <div className="relative bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                    Start Free Trial
                  </div>
                </Link>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="border-t border-gray-100 bg-gradient-to-b from-gray-50 to-gray-100 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">€</span>
                </div>
                <span className="text-xl font-bold text-gray-900">EcoKeepr</span>
              </div>
              <p className="text-gray-600 leading-relaxed">Professional payment recovery for European businesses and freelancers.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-6">Product</h4>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-6">Support</h4>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-6">Legal</h4>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">GDPR Compliance</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
            <p>&copy; 2024 EcoKeepr. All rights reserved. Made with ❤️ for European businesses.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
