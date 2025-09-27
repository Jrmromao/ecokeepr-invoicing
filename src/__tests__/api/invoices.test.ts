import { GET, POST } from '@/app/api/invoices/route'

// Mock NextRequest
const createMockRequest = (body?: any) => ({
  json: jest.fn().mockResolvedValue(body || {}),
} as any)

describe('/api/invoices', () => {
  beforeEach(() => {
    // Reset the in-memory storage before each test
    jest.clearAllMocks()
  })

  describe('GET /api/invoices', () => {
    it('should return invoices array', async () => {
      const response = await GET()
      const data = await response.json()
      
      expect(response.status).toBe(200)
      expect(data).toHaveProperty('invoices')
      expect(Array.isArray(data.invoices)).toBe(true)
    })
  })

  describe('POST /api/invoices', () => {
    it('should create invoice successfully', async () => {
      const invoiceData = {
        clientName: 'Test Client',
        clientEmail: 'client@example.com',
        amount: 1000,
        description: 'Test service'
      }

      const mockRequest = createMockRequest(invoiceData)
      const response = await POST(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.invoice).toMatchObject({
        clientName: 'Test Client',
        clientEmail: 'client@example.com',
        amount: 1000,
        description: 'Test service',
        status: 'draft',
        remindersSent: 0,
        lastReminderAt: null,
        createdAt: expect.any(String)
      })
    })

    it('should handle invalid JSON gracefully', async () => {
      const mockRequest = {
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
      } as any

      const response = await POST(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to create invoice')
    })

    it('should set default values for invoice', async () => {
      const invoiceData = {
        clientName: 'Test Client',
        amount: 1000
        // Missing some fields
      }

      const mockRequest = createMockRequest(invoiceData)
      const response = await POST(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.invoice).toMatchObject({
        status: 'draft',
        remindersSent: 0,
        lastReminderAt: null,
        createdAt: expect.any(String)
      })
    })
  })
})