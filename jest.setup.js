import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock Next.js redirect
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  redirect: jest.fn(),
}))

// Mock Clerk
jest.mock('@clerk/nextjs', () => ({
  useUser: () => ({
    isSignedIn: true,
    isLoaded: true,
    user: {
      id: 'user_123',
      emailAddresses: [{ emailAddress: 'test@example.com' }],
      fullName: 'Test User',
      imageUrl: 'https://example.com/avatar.jpg',
    },
  }),
  useClerk: () => ({
    signOut: jest.fn(),
  }),
  SignedIn: ({ children }) => children,
  SignedOut: ({ children }) => children,
  UserButton: () => <div data-testid="user-button">User Button</div>,
}))

// Mock Clerk server functions
jest.mock('@clerk/nextjs/server', () => ({
  auth: () => ({ userId: 'user_123' }),
  currentUser: () => ({
    emailAddresses: [{ emailAddress: 'test@example.com' }],
    fullName: 'Test User',
  }),
}))

// Mock Prisma - moved to individual test files

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock Next.js Request and Response for API tests
global.Request = global.Request || class Request {}
global.Response = global.Response || class Response {}

// Mock NextResponse
jest.mock('next/server', () => ({
  NextRequest: class NextRequest {},
  NextResponse: {
    json: jest.fn((data, init) => ({
      json: () => Promise.resolve(data),
      status: init?.status || 200,
      ...init
    }))
  }
}))

// Suppress console errors in tests unless explicitly testing them
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
