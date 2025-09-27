# EcoKeepr MVP Development Plan

## Current Status: 30% Complete
**Target MVP Completion: 3 weeks**

## Phase 1: Core CRUD Operations (Week 1)

### 1.1 Invoice Management
**Priority: CRITICAL**

#### Create Invoice Form (`/src/app/invoices/create/page.tsx`)
- [ ] Invoice number generation (auto-increment)
- [ ] Client selection dropdown
- [ ] Invoice items (description, quantity, rate, amount)
- [ ] Due date picker
- [ ] Currency selection (EUR, GBP, USD)
- [ ] Save as draft/Send functionality

#### Invoice List View (`/src/app/invoices/page.tsx`)
- [ ] Paginated invoice table
- [ ] Status filters (draft, sent, paid, overdue)
- [ ] Search by invoice number/client
- [ ] Sort by date, amount, status
- [ ] Quick actions (edit, send, mark paid)

#### Edit Invoice (`/src/app/invoices/[id]/edit/page.tsx`)
- [ ] Pre-populated form with existing data
- [ ] Update invoice items
- [ ] Change status
- [ ] Version history tracking

### 1.2 Client Management
**Priority: HIGH**

#### Client CRUD (`/src/app/clients/`)
- [ ] Add client form (name, email, address, phone)
- [ ] Client list with search/filter
- [ ] Edit client details
- [ ] Client payment history view
- [ ] Delete client (with invoice check)

#### Client Selection Component
- [ ] Searchable dropdown for invoice creation
- [ ] Quick add client from invoice form
- [ ] Client validation (email format, required fields)

### 1.3 Dashboard Improvements
**Priority: MEDIUM**

#### Dashboard Widgets (`/src/app/dashboard/page.tsx`)
- [ ] Total outstanding amount
- [ ] Overdue invoices count
- [ ] Recent invoices list
- [ ] Quick actions (create invoice, add client)
- [ ] Monthly revenue chart (basic)

## Phase 2: Automation & Core Features (Week 2)

### 2.1 Email System
**Priority: CRITICAL**

#### Email Integration
- [ ] Resend API setup
- [ ] Email templates (HTML + text)
- [ ] Send invoice functionality
- [ ] Email tracking (opened, clicked)

#### Reminder System (`/src/app/api/reminders/`)
- [ ] Automated reminder scheduling
- [ ] Escalating reminder templates (polite → firm → final)
- [ ] Cron job setup (Vercel Cron or external)
- [ ] Manual reminder sending

#### Email Templates
```
/src/lib/email-templates/
  - invoice-sent.tsx
  - reminder-polite.tsx
  - reminder-firm.tsx
  - reminder-final.tsx
```

### 2.2 Business Logic
**Priority: HIGH**

#### Automated Calculations
- [ ] Days overdue calculation
- [ ] Next reminder date logic
- [ ] Late fee calculations (optional)
- [ ] Payment status updates

#### Invoice Status Management
- [ ] Auto-update overdue status
- [ ] Payment confirmation workflow
- [ ] Status change notifications

### 2.3 PDF Generation
**Priority: MEDIUM**

#### Invoice PDF (`/src/lib/pdf-generator.ts`)
- [ ] Professional invoice template
- [ ] Company branding support
- [ ] Multi-currency formatting
- [ ] Download/email PDF functionality

## Phase 3: Analytics & Polish (Week 3)

### 3.1 Advanced Dashboard
**Priority: MEDIUM**

#### Analytics Widgets
- [ ] Payment trends chart (Chart.js/Recharts)
- [ ] Average payment time
- [ ] Client payment scores
- [ ] Cash flow forecast
- [ ] Monthly/quarterly reports

#### Client Intelligence
- [ ] Payment behavior scoring (fast/slow/problem)
- [ ] Risk assessment for new invoices
- [ ] Client payment history timeline
- [ ] Automated client tags

### 3.2 User Experience
**Priority: HIGH**

#### Notifications System
- [ ] In-app notifications
- [ ] Email notifications for important events
- [ ] Browser push notifications (optional)

#### Mobile Responsiveness
- [ ] Mobile-optimized invoice creation
- [ ] Touch-friendly dashboard
- [ ] Mobile email templates

### 3.3 Settings & Configuration
**Priority: LOW**

#### User Settings (`/src/app/settings/`)
- [ ] Company information
- [ ] Invoice templates customization
- [ ] Reminder preferences
- [ ] Currency and timezone settings

## Technical Implementation Details

### Database Enhancements
```sql
-- Add missing fields to existing schema
ALTER TABLE invoices ADD COLUMN template_id VARCHAR;
ALTER TABLE invoices ADD COLUMN notes TEXT;
ALTER TABLE clients ADD COLUMN payment_terms INTEGER DEFAULT 30;
ALTER TABLE clients ADD COLUMN payment_score INTEGER DEFAULT 0;
```

### API Endpoints Needed
```
POST /api/invoices - Create invoice
PUT /api/invoices/[id] - Update invoice
GET /api/invoices - List invoices with filters
POST /api/invoices/[id]/send - Send invoice via email
POST /api/invoices/[id]/remind - Send reminder
PUT /api/invoices/[id]/status - Update status

POST /api/clients - Create client
PUT /api/clients/[id] - Update client
GET /api/clients - List clients
GET /api/clients/[id]/invoices - Client invoice history

GET /api/dashboard/stats - Dashboard statistics
GET /api/reports/[type] - Generate reports
```

### Key Components to Build
```
/src/components/
  invoices/
    - InvoiceForm.tsx
    - InvoiceList.tsx
    - InvoiceCard.tsx
    - StatusBadge.tsx
  clients/
    - ClientForm.tsx
    - ClientList.tsx
    - ClientSelector.tsx
  dashboard/
    - StatsWidget.tsx
    - RecentInvoices.tsx
    - PaymentChart.tsx
  ui/
    - DataTable.tsx
    - DatePicker.tsx
    - CurrencyInput.tsx
```

### Environment Variables Needed
```env
# Email
RESEND_API_KEY=
FROM_EMAIL=

# Database (already configured)
DATABASE_URL=

# Authentication (already configured)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# App Configuration
NEXT_PUBLIC_APP_URL=
COMPANY_NAME=
DEFAULT_CURRENCY=EUR
```

## Testing Strategy

### Unit Tests
- [ ] Invoice calculations
- [ ] Date utilities
- [ ] Email template rendering
- [ ] Payment status logic

### Integration Tests
- [ ] Invoice creation flow
- [ ] Email sending
- [ ] Database operations
- [ ] API endpoints

### User Acceptance Tests
- [ ] Complete invoice workflow
- [ ] Client management
- [ ] Dashboard functionality
- [ ] Mobile responsiveness

## Deployment Checklist

### Pre-Launch
- [ ] Database migrations
- [ ] Email templates tested
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Mobile testing complete

### Launch Requirements
- [ ] GDPR compliance (EU users)
- [ ] Terms of service
- [ ] Privacy policy
- [ ] Error monitoring (Sentry)
- [ ] Analytics (Vercel Analytics)

## Success Metrics

### Week 1 Goals
- [ ] Users can create and manage invoices
- [ ] Basic client management works
- [ ] Dashboard shows key metrics

### Week 2 Goals
- [ ] Email system functional
- [ ] Automated reminders working
- [ ] PDF generation implemented

### Week 3 Goals
- [ ] Analytics dashboard complete
- [ ] Mobile experience polished
- [ ] Ready for user testing

### MVP Success Criteria
- [ ] Complete invoice lifecycle (create → send → track → paid)
- [ ] Automated reminder system
- [ ] Client payment intelligence
- [ ] Professional user experience
- [ ] Mobile responsive
- [ ] GDPR compliant

## Risk Mitigation

### Technical Risks
- **Email deliverability**: Use Resend with proper domain setup
- **Performance**: Implement pagination and caching
- **Data loss**: Regular backups and transactions

### User Experience Risks
- **Complexity**: Keep UI simple and intuitive
- **Mobile usage**: Test on real devices
- **Onboarding**: Create guided tour for new users

### Business Risks
- **Feature creep**: Stick to MVP scope
- **User feedback**: Implement feedback collection early
- **Competition**: Focus on unique value proposition

## Next Steps After MVP

### Phase 4: European Expansion
- [ ] Multi-language support (FR, DE, ES, PT)
- [ ] Local currency formatting
- [ ] GDPR compliance enhancements
- [ ] European payment methods

### Phase 5: Advanced Features
- [ ] Recurring invoices
- [ ] Time tracking integration
- [ ] Advanced reporting
- [ ] API for integrations
- [ ] Mobile app

---

**Start Date**: Week of January 27, 2025
**MVP Target**: February 17, 2025
**European Launch**: March 3, 2025
