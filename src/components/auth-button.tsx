'use client'

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export function AuthButton() {
  return (
    <div className="flex items-center gap-4">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="text-sm text-gray-600 hover:text-gray-900">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}
