# InvoiceGenie Development Standards & Practices

## 🎯 Project Overview
InvoiceGenie is a modern invoicing application built with Next.js 15, TypeScript, Tailwind CSS, Clerk authentication, and Prisma ORM. This document outlines our development standards, UI guidelines, and testing practices.

## 📋 Table of Contents
1. [Coding Standards](#coding-standards)
2. [UI/UX Standards](#uiux-standards)
3. [Testing Standards](#testing-standards)
4. [File Organization](#file-organization)
5. [Performance Guidelines](#performance-guidelines)
6. [Security Standards](#security-standards)

---

## 🛠 Coding Standards

### TypeScript Standards
- **Strict Mode**: Always use strict TypeScript configuration
- **Type Safety**: Define explicit types for all functions, props, and state
- **Interfaces**: Use interfaces for object shapes, types for unions/primitives
- **No `any`**: Avoid `any` type - use `unknown` or proper typing instead
- **Generic Types**: Use generics for reusable components and functions

```typescript
// ✅ Good
interface User {
  id: string
  email: string
  name?: string
}

const fetchUser = async (id: string): Promise<User | null> => {
  // implementation
}

// ❌ Bad
const fetchUser = async (id: any): Promise<any> => {
  // implementation
}
```

### React Standards
- **Functional Components**: Use functional components with hooks
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Props Interface**: Always define props interface
- **Error Boundaries**: Implement error boundaries for robust error handling
- **Memoization**: Use `useMemo` and `useCallback` for expensive operations

```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ variant, children, onClick }) => {
  const handleClick = useCallback(() => {
    onClick()
  }, [onClick])

  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
```

### Next.js Standards
- **App Router**: Use App Router (not Pages Router)
- **Server Components**: Prefer Server Components when possible
- **Client Components**: Mark with `'use client'` directive
- **Loading States**: Implement proper loading.tsx files
- **Error Handling**: Use error.tsx for error boundaries
- **Metadata**: Define proper metadata for SEO

```typescript
// ✅ Good - Server Component
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}

// ✅ Good - Client Component
'use client'
export default function InteractiveComponent() {
  const [state, setState] = useState()
  return <div>Interactive content</div>
}
```

### Database Standards (Prisma)
- **Schema Validation**: Always validate data before database operations
- **Error Handling**: Wrap database operations in try-catch blocks
- **Transactions**: Use transactions for multi-step operations
- **Type Safety**: Use Prisma generated types
- **🚨 CRITICAL RULE**: **NEVER EVER** make database changes without a Prisma migration
- **🚨 CRITICAL RULE**: **NEVER EVER** use `npx prisma migrate reset --force` in production
- **Migration First**: Always modify `schema.prisma` first, then run `npx prisma migrate dev`
- **Schema Drift**: If schema drift is detected, create a new migration to fix it
- **Production Safety**: Only use `prisma migrate deploy` in production environments

### Database Migration Best Practices
- **Always Use Migrations**: Every database change must go through a migration
- **Schema First**: Modify `prisma/schema.prisma` before running any migration commands
- **Development Workflow**: 
  ```bash
  # 1. Modify schema.prisma
  # 2. Generate migration
  npx prisma migrate dev --name descriptive-migration-name
  # 3. Test the migration
  # 4. Commit both schema and migration files
  ```
- **Production Workflow**:
  ```bash
  # 1. Deploy migration files
  npx prisma migrate deploy
  # 2. Generate client
  npx prisma generate
  ```
- **Schema Drift Resolution**: If drift is detected, create a migration to fix it:
  ```bash
  npx prisma migrate dev --name fix-schema-drift
  ```
- **Emergency Situations**: If you must reset (DEVELOPMENT ONLY):
  ```bash
  # ⚠️ DEVELOPMENT ONLY - NEVER IN PRODUCTION
  npx prisma migrate reset --force
  ```

```typescript
// ✅ Good
export const createInvoice = async (data: CreateInvoiceInput) => {
  try {
    const invoice = await db.invoice.create({
      data: {
        ...data,
        userId: data.userId,
        status: 'DRAFT'
      }
    })
    return { success: true, data: invoice }
  } catch (error) {
    console.error('Failed to create invoice:', error)
    return { success: false, error: 'Failed to create invoice' }
  }
}
```

---

## 🎨 UI/UX Standards

### Design System
- **Color Palette**: Use consistent color scheme
  - Primary: Blue (#2563eb)
  - Success: Green (#10b981)
  - Warning: Yellow (#f59e0b)
  - Error: Red (#ef4444)
  - Gray Scale: 50-900

### Tailwind CSS Standards
- **Utility First**: Use Tailwind utilities over custom CSS
- **Responsive Design**: Mobile-first approach
- **Consistent Spacing**: Use Tailwind spacing scale
- **Component Classes**: Create reusable component classes

```typescript
// ✅ Good - Reusable component classes
const buttonVariants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-lg',
  danger: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg'
}
```

### Component Standards
- **Atomic Design**: Follow atomic design principles
- **Props Interface**: Always define props interface
- **Default Props**: Use default parameters instead of defaultProps
- **Accessibility**: Include proper ARIA labels and keyboard navigation

```typescript
// ✅ Good - Accessible component
interface InputProps {
  label: string
  error?: string
  required?: boolean
  id: string
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  required = false, 
  id,
  ...props 
}) => {
  return (
    <div className="space-y-2">
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`input ${error ? 'border-red-500' : 'border-gray-300'}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
```

### Layout Standards
- **Consistent Spacing**: Use 4px base unit (Tailwind's spacing scale)
- **Grid System**: Use CSS Grid and Flexbox for layouts
- **Breakpoints**: Mobile (sm), Tablet (md), Desktop (lg), Large (xl)
- **Container**: Max width containers with proper padding

---

## 🧪 Testing Standards

### Testing Framework
- **Jest**: Unit and integration tests
- **React Testing Library**: Component testing
- **Playwright**: End-to-end testing
- **MSW**: API mocking

### Test Structure
```
src/
  __tests__/
    components/
    pages/
    utils/
  __mocks__/
  test-utils.tsx
```

### Unit Testing Standards
- **Test Files**: `*.test.ts` or `*.test.tsx`
- **Coverage**: Minimum 80% code coverage
- **Test Names**: Descriptive test names
- **AAA Pattern**: Arrange, Act, Assert

```typescript
// ✅ Good - Unit test example
import { render, screen, fireEvent } from '@testing-library/react'
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

  it('should call onClick when clicked', () => {
    // Arrange
    const handleClick = jest.fn()
    
    // Act
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByRole('button'))
    
    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Integration Testing
- **API Routes**: Test API endpoints
- **Database**: Test database operations
- **Authentication**: Test auth flows

```typescript
// ✅ Good - Integration test example
import { createMocks } from 'node-mocks-http'
import handler from '../api/invoices/route'

describe('/api/invoices', () => {
  it('should create invoice successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        clientName: 'Test Client',
        amount: 1000
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toMatchObject({
      success: true,
      data: expect.objectContaining({
        clientName: 'Test Client',
        amount: 1000
      })
    })
  })
})
```

### E2E Testing
- **Critical Paths**: Test main user journeys
- **Cross-browser**: Test on major browsers
- **Mobile**: Test responsive design

```typescript
// ✅ Good - E2E test example
import { test, expect } from '@playwright/test'

test('user can create invoice', async ({ page }) => {
  await page.goto('/dashboard')
  
  // Login
  await page.click('[data-testid="sign-in-button"]')
  // ... login flow
  
  // Create invoice
  await page.click('[data-testid="create-invoice-button"]')
  await page.fill('[data-testid="client-name"]', 'Test Client')
  await page.fill('[data-testid="amount"]', '1000')
  await page.click('[data-testid="save-invoice"]')
  
  // Verify
  await expect(page.locator('[data-testid="invoice-list"]')).toContainText('Test Client')
})
```

---

## 📁 File Organization

### Directory Structure
```
src/
  app/                    # Next.js App Router
    (auth)/              # Auth group
    api/                 # API routes
    dashboard/           # Dashboard pages
    globals.css          # Global styles
    layout.tsx           # Root layout
  components/            # Reusable components
    ui/                  # Base UI components
    forms/               # Form components
    layout/              # Layout components
  lib/                   # Utilities and configurations
    auth.ts              # Auth configuration
    db.ts                # Database connection
    validations.ts       # Zod schemas
  hooks/                 # Custom React hooks
  types/                 # TypeScript type definitions
  utils/                 # Utility functions
  __tests__/             # Test files
```

### Naming Conventions
- **Files**: kebab-case (`user-profile.tsx`)
- **Components**: PascalCase (`UserProfile`)
- **Functions**: camelCase (`getUserProfile`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`UserProfile`)

### Import Organization
```typescript
// ✅ Good - Organized imports
// 1. React and Next.js
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// 2. Third-party libraries
import { useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'

// 3. Internal imports
import { Button } from '@/components/ui/Button'
import { createInvoice } from '@/lib/actions'
import { InvoiceSchema } from '@/lib/validations'

// 4. Types
import type { Invoice } from '@/types/invoice'
```

---

## ⚡ Performance Guidelines

### Next.js Performance
- **Image Optimization**: Use `next/image` for images
- **Code Splitting**: Use dynamic imports for large components
- **Bundle Analysis**: Regular bundle size monitoring
- **Caching**: Implement proper caching strategies

```typescript
// ✅ Good - Dynamic import
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>
})

// ✅ Good - Image optimization
import Image from 'next/image'

<Image
  src="/logo.png"
  alt="Logo"
  width={100}
  height={100}
  priority
/>
```

### React Performance
- **Memoization**: Use `React.memo` for expensive components
- **Callback Optimization**: Use `useCallback` for event handlers
- **State Optimization**: Minimize re-renders

```typescript
// ✅ Good - Memoized component
const ExpensiveComponent = React.memo(({ data }: { data: Data[] }) => {
  const processedData = useMemo(() => {
    return data.map(item => processItem(item))
  }, [data])

  return <div>{/* render processed data */}</div>
})
```

---

## 🔒 Security Standards

### Authentication & Authorization
- **Clerk Integration**: Use Clerk for authentication
- **Route Protection**: Protect sensitive routes with middleware
- **User Validation**: Validate user permissions on API routes

```typescript
// ✅ Good - Protected API route
import { auth } from '@clerk/nextjs/server'

export async function POST(request: Request) {
  const { userId } = await auth()
  
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Process request
}
```

### Data Validation
- **Zod Schemas**: Use Zod for runtime validation
- **Input Sanitization**: Sanitize all user inputs
- **SQL Injection**: Use Prisma ORM to prevent SQL injection

```typescript
// ✅ Good - Input validation
import { z } from 'zod'

const CreateInvoiceSchema = z.object({
  clientName: z.string().min(1).max(100),
  amount: z.number().positive(),
  dueDate: z.date()
})

export const createInvoice = async (data: unknown) => {
  const validatedData = CreateInvoiceSchema.parse(data)
  // Process validated data
}
```

### Environment Variables
- **Secrets Management**: Never commit secrets to version control
- **Environment Validation**: Validate required environment variables
- **Type Safety**: Use typed environment variables

```typescript
// ✅ Good - Environment validation
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  CLERK_SECRET_KEY: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1)
})

const env = envSchema.parse(process.env)
```

---

## 📝 Code Review Checklist

### Before Submitting PR
- [ ] All tests pass
- [ ] TypeScript compilation successful
- [ ] No console.log statements
- [ ] Proper error handling
- [ ] Accessibility considerations
- [ ] Performance impact reviewed
- [ ] Security implications considered
- [ ] **🚨 Database migrations included for any schema changes**
- [ ] **🚨 No direct database modifications outside of Prisma**
- [ ] **🚨 Migration files committed with schema changes**

### Code Quality
- [ ] Code is readable and well-commented
- [ ] Functions are small and focused
- [ ] No code duplication
- [ ] Proper naming conventions
- [ ] Consistent formatting

---

## 🚀 Deployment Standards

### Pre-deployment
- [ ] All tests passing
- [ ] Build successful
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Performance testing completed

### Monitoring
- [ ] Error tracking configured
- [ ] Performance monitoring set up
- [ ] Logging implemented
- [ ] Health checks configured

---

## 📚 Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

### Tools
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier
- **Type Checking**: TypeScript
- **Testing**: Jest + React Testing Library + Playwright
- **Bundle Analysis**: @next/bundle-analyzer

---

*This document should be updated as the project evolves and new standards are established.*