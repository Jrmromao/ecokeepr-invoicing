import Link from 'next/link'

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-8">Create Invoice</h1>
        <div className="bg-white rounded-lg border p-6">
          <p className="text-gray-600">Invoice creation coming soon!</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
