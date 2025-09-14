import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Link href="/" className="text-xl font-bold">EcoKeepr</Link>
        </div>
      </div>
      
      <div className="flex items-center justify-center py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Sign In</h1>
            <p className="text-gray-600">
              Sign in to save and manage your invoices
            </p>
          </div>
          
          <SignIn 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-none border border-gray-200"
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
