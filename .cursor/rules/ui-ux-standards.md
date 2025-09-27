# UI/UX Standards for InvoiceGenie

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--blue-50: #eff6ff
--blue-100: #dbeafe
--blue-200: #bfdbfe
--blue-300: #93c5fd
--blue-400: #60a5fa
--blue-500: #3b82f6
--blue-600: #2563eb  /* Primary */
--blue-700: #1d4ed8
--blue-800: #1e40af
--blue-900: #1e3a8a

/* Semantic Colors */
--green-500: #10b981  /* Success */
--yellow-500: #f59e0b /* Warning */
--red-500: #ef4444    /* Error */
--gray-500: #6b7280   /* Neutral */

/* Gray Scale */
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db
--gray-400: #9ca3af
--gray-500: #6b7280
--gray-600: #4b5563
--gray-700: #374151
--gray-800: #1f2937
--gray-900: #111827
```

### Typography
```css
/* Font Families */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Font Sizes */
text-xs: 0.75rem    /* 12px */
text-sm: 0.875rem   /* 14px */
text-base: 1rem     /* 16px */
text-lg: 1.125rem   /* 18px */
text-xl: 1.25rem    /* 20px */
text-2xl: 1.5rem    /* 24px */
text-3xl: 1.875rem  /* 30px */
text-4xl: 2.25rem   /* 36px */
text-5xl: 3rem      /* 48px */

/* Font Weights */
font-light: 300
font-normal: 400
font-medium: 500
font-semibold: 600
font-bold: 700
font-extrabold: 800
```

### Spacing Scale
```css
/* Base unit: 4px */
space-1: 0.25rem   /* 4px */
space-2: 0.5rem    /* 8px */
space-3: 0.75rem   /* 12px */
space-4: 1rem      /* 16px */
space-5: 1.25rem   /* 20px */
space-6: 1.5rem    /* 24px */
space-8: 2rem      /* 32px */
space-10: 2.5rem   /* 40px */
space-12: 3rem     /* 48px */
space-16: 4rem     /* 64px */
space-20: 5rem     /* 80px */
space-24: 6rem     /* 96px */
```

## 🧩 Component Standards

### Button Components
```typescript
// Primary Button
const PrimaryButton = ({ children, ...props }) => (
  <button 
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    {...props}
  >
    {children}
  </button>
)

// Secondary Button
const SecondaryButton = ({ children, ...props }) => (
  <button 
    className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    {...props}
  >
    {children}
  </button>
)

// Danger Button
const DangerButton = ({ children, ...props }) => (
  <button 
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    {...props}
  >
    {children}
  </button>
)
```

### Form Components
```typescript
// Input Field
const Input = ({ label, error, required, id, ...props }) => (
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
      className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        error ? 'border-red-300' : 'border-gray-300'
      }`}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    />
    {error && (
      <p id={`${id}-error`} className="text-sm text-red-600">
        {error}
      </p>
    )}
  </div>
)

// Select Field
const Select = ({ label, error, required, id, children, ...props }) => (
  <div className="space-y-2">
    <label 
      htmlFor={id}
      className="block text-sm font-medium text-gray-700"
    >
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <select
      id={id}
      className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        error ? 'border-red-300' : 'border-gray-300'
      }`}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    >
      {children}
    </select>
    {error && (
      <p id={`${id}-error`} className="text-sm text-red-600">
        {error}
      </p>
    )}
  </div>
)
```

### Card Components
```typescript
// Basic Card
const Card = ({ children, className = '', ...props }) => (
  <div 
    className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}
    {...props}
  >
    {children}
  </div>
)

// Card Header
const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
)

// Card Body
const CardBody = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
)

// Card Footer
const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-gray-200 ${className}`}>
    {children}
  </div>
)
```

### Status Badges
```typescript
const StatusBadge = ({ status, children }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyles(status)}`}>
      {children}
    </span>
  )
}
```

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

### Grid System
```typescript
// Container
const Container = ({ children, className = '' }) => (
  <div className={`max-w-7xl mx-auto px-6 ${className}`}>
    {children}
  </div>
)

// Grid Layouts
const Grid = ({ cols = 1, gap = 6, children, className = '' }) => (
  <div className={`grid grid-cols-${cols} gap-${gap} ${className}`}>
    {children}
  </div>
)

// Responsive Grid
const ResponsiveGrid = ({ children, className = '' }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
    {children}
  </div>
)
```

## 🎯 Layout Patterns

### Dashboard Layout
```typescript
const DashboardLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    {/* Header */}
    <header className="bg-white shadow-sm border-b border-gray-200">
      <Container>
        <div className="flex justify-between items-center py-4">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-3">
            <Logo />
            <Navigation />
          </div>
          {/* User Menu */}
          <UserMenu />
        </div>
      </Container>
    </header>

    {/* Main Content */}
    <main className="py-8">
      <Container>
        {children}
      </Container>
    </main>
  </div>
)
```

### Page Layout
```typescript
const PageLayout = ({ title, subtitle, actions, children }) => (
  <div className="space-y-8">
    {/* Page Header */}
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-gray-600">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex gap-3">
          {actions}
        </div>
      )}
    </div>

    {/* Page Content */}
    <div>
      {children}
    </div>
  </div>
)
```

## ♿ Accessibility Standards

### Focus Management
```typescript
// Focus trap for modals
const FocusTrap = ({ children, isActive }) => {
  const trapRef = useRef(null)

  useEffect(() => {
    if (isActive && trapRef.current) {
      const focusableElements = trapRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus()
              e.preventDefault()
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus()
              e.preventDefault()
            }
          }
        }
      }

      document.addEventListener('keydown', handleTabKey)
      firstElement?.focus()

      return () => {
        document.removeEventListener('keydown', handleTabKey)
      }
    }
  }, [isActive])

  return <div ref={trapRef}>{children}</div>
}
```

### ARIA Labels
```typescript
// Accessible button with loading state
const LoadingButton = ({ loading, children, ...props }) => (
  <button
    aria-disabled={loading}
    aria-busy={loading}
    className={`relative ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    {...props}
  >
    {loading && (
      <span className="absolute inset-0 flex items-center justify-center">
        <Spinner aria-label="Loading" />
      </span>
    )}
    <span className={loading ? 'opacity-0' : ''}>
      {children}
    </span>
  </button>
)
```

## 🎨 Animation Standards

### Transitions
```css
/* Standard transitions */
.transition-standard {
  transition: all 0.2s ease-in-out;
}

.transition-fast {
  transition: all 0.15s ease-in-out;
}

.transition-slow {
  transition: all 0.3s ease-in-out;
}
```

### Hover Effects
```typescript
// Hover scale effect
const HoverScale = ({ children, scale = 1.05, className = '' }) => (
  <div className={`transform transition-transform duration-200 hover:scale-${scale} ${className}`}>
    {children}
  </div>
)

// Hover shadow effect
const HoverShadow = ({ children, className = '' }) => (
  <div className={`transition-shadow duration-200 hover:shadow-lg ${className}`}>
    {children}
  </div>
)
```

## 📊 Data Visualization

### Charts and Graphs
```typescript
// Chart container
const ChartContainer = ({ title, children, className = '' }) => (
  <Card className={className}>
    <CardHeader>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </CardHeader>
    <CardBody>
      {children}
    </CardBody>
  </Card>
)

// Metric card
const MetricCard = ({ title, value, change, icon, className = '' }) => (
  <Card className={className}>
    <CardBody>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        {icon && (
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    </CardBody>
  </Card>
)
```

## 🎯 User Experience Guidelines

### Loading States
```typescript
// Skeleton loader
const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
)

// Loading spinner
const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]} ${className}`} />
  )
}
```

### Empty States
```typescript
const EmptyState = ({ icon, title, description, action }) => (
  <div className="text-center py-12">
    {icon && (
      <div className="w-12 h-12 mx-auto mb-4 text-gray-400">
        {icon}
      </div>
    )}
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>
    {action && action}
  </div>
)
```

### Error States
```typescript
const ErrorState = ({ title, description, onRetry }) => (
  <div className="text-center py-12">
    <div className="w-12 h-12 mx-auto mb-4 text-red-400">
      <ExclamationTriangleIcon />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Try Again
      </button>
    )}
  </div>
)
```

---

*This UI/UX standards document should be referenced when creating any user interface components or layouts.*
