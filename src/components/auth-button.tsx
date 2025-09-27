'use client'

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export function AuthButton() {
  return (
    <div className="flex items-center gap-4">
      <SignedOut>
        <Link href="/sign-in" className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">
          Sign In
        </Link>
        <Link href="/sign-up" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Get Started
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-8 h-8"
            }
          }}
        />
      </SignedIn>
    </div>
  )
}
