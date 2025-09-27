import { render, screen } from '@testing-library/react'
import { AuthButton } from '@/components/auth-button'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return <a href={href} {...props}>{children}</a>
  }
})

describe('AuthButton Component', () => {
  it('should render sign-in and sign-up links when user is signed out', () => {
    // The component uses Clerk's SignedOut component which is mocked in jest.setup.js
    // to always render its children, so we can test the links
    render(<AuthButton />)

    expect(screen.getByText('Sign In')).toBeInTheDocument()
    expect(screen.getByText('Get Started')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Sign In' })).toHaveAttribute('href', '/sign-in')
    expect(screen.getByRole('link', { name: 'Get Started' })).toHaveAttribute('href', '/sign-up')
  })

  it('should have correct styling for sign-in link', () => {
    render(<AuthButton />)

    const signInLink = screen.getByRole('link', { name: 'Sign In' })
    expect(signInLink).toHaveClass('text-sm', 'text-gray-600', 'hover:text-blue-600', 'font-medium', 'transition-colors')
  })

  it('should have correct styling for sign-up link', () => {
    render(<AuthButton />)

    const signUpLink = screen.getByRole('link', { name: 'Get Started' })
    expect(signUpLink).toHaveClass('bg-blue-600', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'text-sm', 'font-medium', 'hover:bg-blue-700', 'transition-colors')
  })

  it('should render user button when user is signed in', () => {
    // The component uses Clerk's SignedIn component which is mocked in jest.setup.js
    // to always render its children, so we can test the UserButton
    render(<AuthButton />)

    expect(screen.getByTestId('user-button')).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(<AuthButton />)

    const signInLink = screen.getByRole('link', { name: 'Sign In' })
    const signUpLink = screen.getByRole('link', { name: 'Get Started' })

    expect(signInLink).toBeInTheDocument()
    expect(signUpLink).toBeInTheDocument()
  })
})
