# Testing Standards for InvoiceGenie

## 🧪 Testing Philosophy

### Testing Pyramid
```
    /\
   /  \     E2E Tests (Playwright)
  /____\    - Critical user journeys
 /      \   - Cross-browser testing
/________\  - Integration testing

   /\
  /  \      Integration Tests (Jest + RTL)
 /____\     - API endpoints
/      \    - Database operations
/________\  - Component integration

    /\
   /  \     Unit Tests (Jest + RTL)
  /____\    - Individual functions
 /      \   - Component behavior
/________\  - Utility functions
```

### Testing Principles
- **Test Behavior, Not Implementation**: Focus on what the user sees and does
- **Arrange, Act, Assert (AAA)**: Structure tests clearly
- **One Assertion Per Test**: Keep tests focused and simple
- **Descriptive Test Names**: Test names should explain the scenario
- **Independent Tests**: Each test should be able to run in isolation

## 🛠 Testing Setup

### Dependencies
```json
{
  "devDependencies": {
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/user-event": "^14.4.3",
    "@playwright/test": "^1.40.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "msw": "^2.0.0",
    "supertest": "^6.3.3"
  }
}
```

### Configuration Files

#### Jest Configuration (`jest.config.js`)
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
```

#### Jest Setup (`jest.setup.js`)
```javascript
import '@testing-library/jest-dom'
import { server } from './src/__mocks__/server'

// Establish API mocking before all tests
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished
afterAll(() => server.close())
```

#### Playwright Configuration (`playwright.config.ts`)
```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

## 🔬 Unit Testing

### Component Testing
```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button Component', () => {
  it('should render with correct text', () => {
    // Arrange
    const buttonText = 'Click me'
    
    // Act
    render(<Button>{buttonText}</Button>)
    
    // Assert
    expect(screen.getByRole('button')).toHaveTextContent(buttonText)
  })

  it('should call onClick when clicked', async () => {
    // Arrange
    const user = userEvent.setup()
    const handleClick = jest.fn()
    
    // Act
    render(<Button onClick={handleClick}>Click me</Button>)
    await user.click(screen.getByRole('button'))
    
    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    // Arrange & Act
    render(<Button disabled>Click me</Button>)
    
    // Assert
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should apply correct variant styles', () => {
    // Arrange & Act
    render(<Button variant="primary">Primary Button</Button>)
    
    // Assert
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600')
  })
})
```

### Hook Testing
```typescript
// useInvoices.test.ts
import { renderHook, act } from '@testing-library/react'
import { useInvoices } from './useInvoices'

describe('useInvoices Hook', () => {
  it('should fetch invoices on mount', async () => {
    // Arrange
    const mockInvoices = [
      { id: '1', clientName: 'Test Client', amount: 1000 }
    ]
    
    // Mock API call
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockInvoices)
    })

    // Act
    const { result } = renderHook(() => useInvoices())

    // Assert
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.invoices).toEqual(mockInvoices)
    expect(result.current.loading).toBe(false)
  })

  it('should handle error state', async () => {
    // Arrange
    global.fetch = jest.fn().mockRejectedValue(new Error('API Error'))

    // Act
    const { result } = renderHook(() => useInvoices())

    // Assert
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.error).toBe('API Error')
    expect(result.current.loading).toBe(false)
  })
})
```

### Utility Function Testing
```typescript
// formatCurrency.test.ts
import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('should format positive numbers correctly', () => {
    expect(formatCurrency(1000)).toBe('€1,000.00')
    expect(formatCurrency(1234.56)).toBe('€1,234.56')
  })

  it('should format negative numbers correctly', () => {
    expect(formatCurrency(-1000)).toBe('-€1,000.00')
  })

  it('should handle zero', () => {
    expect(formatCurrency(0)).toBe('€0.00')
  })

  it('should handle very large numbers', () => {
    expect(formatCurrency(1000000)).toBe('€1,000,000.00')
  })
})
```

## 🔗 Integration Testing

### API Route Testing
```typescript
// api/invoices/route.test.ts
import { createMocks } from 'node-mocks-http'
import handler from './route'

describe('/api/invoices', () => {
  beforeEach(() => {
    // Mock Clerk auth
    jest.mock('@clerk/nextjs/server', () => ({
      auth: () => ({ userId: 'user_123' })
    }))
  })

  it('should create invoice successfully', async () => {
    // Arrange
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        clientName: 'Test Client',
        amount: 1000,
        dueDate: '2024-02-01'
      }
    })

    // Act
    await handler(req, res)

    // Assert
    expect(res._getStatusCode()).toBe(201)
    const data = JSON.parse(res._getData())
    expect(data).toMatchObject({
      success: true,
      data: expect.objectContaining({
        clientName: 'Test Client',
        amount: 1000
      })
    })
  })

  it('should return 401 for unauthenticated requests', async () => {
    // Arrange
    jest.doMock('@clerk/nextjs/server', () => ({
      auth: () => ({ userId: null })
    }))

    const { req, res } = createMocks({
      method: 'POST',
      body: { clientName: 'Test Client', amount: 1000 }
    })

    // Act
    await handler(req, res)

    // Assert
    expect(res._getStatusCode()).toBe(401)
  })

  it('should validate request body', async () => {
    // Arrange
    const { req, res } = createMocks({
      method: 'POST',
      body: { clientName: '', amount: -100 } // Invalid data
    })

    // Act
    await handler(req, res)

    // Assert
    expect(res._getStatusCode()).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toContain('validation')
  })
})
```

### Database Testing
```typescript
// lib/actions.test.ts
import { createInvoice, getInvoices } from './actions'
import { db } from './db'

// Mock Prisma
jest.mock('./db', () => ({
  db: {
    invoice: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    }
  }
}))

describe('Invoice Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create invoice successfully', async () => {
    // Arrange
    const mockInvoice = {
      id: '1',
      clientName: 'Test Client',
      amount: 1000,
      userId: 'user_123'
    }
    
    db.invoice.create.mockResolvedValue(mockInvoice)
    db.user.findUnique.mockResolvedValue({ id: 'user_123' })

    // Act
    const result = await createInvoice({
      clientName: 'Test Client',
      amount: 1000,
      dueDate: new Date('2024-02-01')
    })

    // Assert
    expect(result.success).toBe(true)
    expect(result.data).toEqual(mockInvoice)
    expect(db.invoice.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        clientName: 'Test Client',
        amount: 1000
      })
    })
  })

  it('should handle database errors', async () => {
    // Arrange
    db.user.findUnique.mockResolvedValue({ id: 'user_123' })
    db.invoice.create.mockRejectedValue(new Error('Database error'))

    // Act
    const result = await createInvoice({
      clientName: 'Test Client',
      amount: 1000,
      dueDate: new Date('2024-02-01')
    })

    // Assert
    expect(result.success).toBe(false)
    expect(result.error).toBe('Failed to create invoice')
  })
})
```

## 🌐 End-to-End Testing

### Critical User Journeys
```typescript
// e2e/invoice-creation.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Invoice Creation Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/sign-in')
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.click('[data-testid="sign-in-button"]')
    await expect(page).toHaveURL('/dashboard')
  })

  test('should create invoice successfully', async ({ page }) => {
    // Navigate to create invoice page
    await page.click('[data-testid="create-invoice-button"]')
    await expect(page).toHaveURL('/create')

    // Fill invoice form
    await page.fill('[data-testid="client-name-input"]', 'Acme Corporation')
    await page.fill('[data-testid="client-email-input"]', 'billing@acme.com')
    await page.fill('[data-testid="amount-input"]', '2500')
    await page.fill('[data-testid="due-date-input"]', '2024-02-15')
    await page.fill('[data-testid="description-textarea"]', 'Web development services')

    // Submit form
    await page.click('[data-testid="save-invoice-button"]')

    // Verify success
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
    await expect(page).toHaveURL('/dashboard')

    // Verify invoice appears in dashboard
    await expect(page.locator('[data-testid="invoice-list"]')).toContainText('Acme Corporation')
  })

  test('should show validation errors for invalid data', async ({ page }) => {
    await page.goto('/create')

    // Try to submit empty form
    await page.click('[data-testid="save-invoice-button"]')

    // Verify validation errors
    await expect(page.locator('[data-testid="client-name-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="amount-error"]')).toBeVisible()
  })

  test('should save as draft when draft button is clicked', async ({ page }) => {
    await page.goto('/create')

    // Fill partial data
    await page.fill('[data-testid="client-name-input"]', 'Draft Client')
    await page.fill('[data-testid="amount-input"]', '1000')

    // Save as draft
    await page.click('[data-testid="save-draft-button"]')

    // Verify draft saved
    await expect(page.locator('[data-testid="draft-saved-message"]')).toBeVisible()
  })
})
```

### Authentication Flow Testing
```typescript
// e2e/authentication.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should sign in with email and password', async ({ page }) => {
    await page.goto('/sign-in')

    // Fill sign-in form
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.click('[data-testid="sign-in-button"]')

    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible()
  })

  test('should sign in with Google OAuth', async ({ page }) => {
    await page.goto('/sign-in')

    // Click Google sign-in button
    await page.click('[data-testid="google-sign-in-button"]')

    // Handle OAuth flow (this would need to be mocked in real tests)
    // For now, just verify the button is clickable
    await expect(page.locator('[data-testid="google-sign-in-button"]')).toBeVisible()
  })

  test('should redirect to sign-in when accessing protected route', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL('/sign-in')
  })

  test('should sign out successfully', async ({ page }) => {
    // First sign in
    await page.goto('/sign-in')
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.click('[data-testid="sign-in-button"]')

    // Then sign out
    await page.click('[data-testid="user-menu"]')
    await page.click('[data-testid="sign-out-button"]')

    // Verify redirect to home page
    await expect(page).toHaveURL('/')
  })
})
```

### Responsive Design Testing
```typescript
// e2e/responsive.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Responsive Design', () => {
  test('should work on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/dashboard')

    // Verify mobile navigation
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible()
    
    // Verify responsive grid
    const statsCards = page.locator('[data-testid="stats-card"]')
    await expect(statsCards).toHaveCount(4)
    
    // Verify table is scrollable on mobile
    const table = page.locator('[data-testid="invoices-table"]')
    await expect(table).toBeVisible()
  })

  test('should work on tablet devices', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/dashboard')

    // Verify tablet layout
    const statsGrid = page.locator('[data-testid="stats-grid"]')
    await expect(statsGrid).toHaveClass(/grid-cols-2/)
  })

  test('should work on desktop devices', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/dashboard')

    // Verify desktop layout
    const statsGrid = page.locator('[data-testid="stats-grid"]')
    await expect(statsGrid).toHaveClass(/grid-cols-4/)
  })
})
```

## 🎭 Mocking and Test Utilities

### MSW Setup
```typescript
// src/__mocks__/server.ts
import { setupServer } from 'msw/node'
import { rest } from 'msw'

export const handlers = [
  rest.get('/api/invoices', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: [
          { id: '1', clientName: 'Test Client', amount: 1000 }
        ]
      })
    )
  }),

  rest.post('/api/invoices', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        data: { id: '1', clientName: 'Test Client', amount: 1000 }
      })
    )
  }),
]

export const server = setupServer(...handlers)
```

### Test Utilities
```typescript
// src/test-utils.tsx
import { render, RenderOptions } from '@testing-library/react'
import { ClerkProvider } from '@clerk/nextjs'
import { ReactElement } from 'react'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider publishableKey="pk_test_mock">
      {children}
    </ClerkProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
```

### Custom Matchers
```typescript
// src/__tests__/custom-matchers.ts
import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveClass(className: string): R
      toHaveTextContent(text: string): R
    }
  }
}
```

## 📊 Test Coverage and Reporting

### Coverage Configuration
```json
// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:all": "npm run test && npm run test:e2e"
  }
}
```

### Coverage Thresholds
```javascript
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './src/components/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
}
```

## 🚀 CI/CD Integration

### GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run test:coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

## 📝 Testing Best Practices

### Do's ✅
- Write tests that test behavior, not implementation
- Use descriptive test names that explain the scenario
- Keep tests independent and isolated
- Mock external dependencies
- Test error cases and edge cases
- Use data-testid attributes for reliable element selection
- Write tests before fixing bugs (TDD approach)

### Don'ts ❌
- Don't test implementation details
- Don't write tests that are too complex
- Don't rely on test order
- Don't use brittle selectors (like CSS classes that might change)
- Don't skip error cases
- Don't write tests that are hard to understand

### Test Data Management
```typescript
// src/__tests__/test-data.ts
export const mockUser = {
  id: 'user_123',
  email: 'test@example.com',
  fullName: 'Test User'
}

export const mockInvoice = {
  id: 'invoice_123',
  clientName: 'Test Client',
  amount: 1000,
  status: 'PENDING',
  dueDate: new Date('2024-02-01')
}

export const mockInvoices = [mockInvoice]
```

---

*This testing standards document should be followed for all testing activities in the InvoiceGenie project.*
