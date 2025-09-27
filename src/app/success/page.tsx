import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Welcome to EcoKeepr Pro! Your subscription is now active and you have access to all professional features.
        </p>

        {/* Features Unlocked */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">You now have access to:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Unlimited invoice tracking</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Automated reminder sequences</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Legal escalation templates</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Recovery analytics dashboard</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Priority email support</span>
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <Link 
            href="/dashboard" 
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Go to Dashboard
          </Link>
          <Link 
            href="/create" 
            className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors inline-block"
          >
            Create Your First Invoice
          </Link>
        </div>

        {/* Support */}
        <p className="text-sm text-gray-500 mt-8">
          Need help getting started?{' '}
          <Link href="/support" className="text-blue-600 hover:text-blue-700 font-medium">
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  )
}
