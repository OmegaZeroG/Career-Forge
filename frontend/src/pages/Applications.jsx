import { useState } from 'react'

const initialApplications = {
  applied: [
    { id: 1, role: 'Frontend Developer', company: 'Google', date: '2026-03-15', salary: '₹25L' },
    { id: 2, role: 'React Developer', company: 'Flipkart', date: '2026-03-18', salary: '₹18L' },
  ],
  screening: [
    { id: 3, role: 'UI Engineer', company: 'Swiggy', date: '2026-03-10', salary: '₹20L' },
  ],
  interview: [
    { id: 4, role: 'Software Engineer', company: 'Razorpay', date: '2026-03-05', salary: '₹30L' },
  ],
  offer: [],
  rejected: [
    { id: 5, role: 'Full Stack Dev', company: 'Zomato', date: '2026-03-01', salary: '₹22L' },
  ],
}

const columns = [
  { key: 'applied', label: 'Applied', color: 'border-blue-400 text-blue-600' },
  { key: 'screening', label: 'Screening', color: 'border-yellow-400 text-yellow-600' },
  { key: 'interview', label: 'Interview', color: 'border-purple-400 text-purple-600' },
  { key: 'offer', label: 'Offer', color: 'border-green-400 text-green-600' },
  { key: 'rejected', label: 'Rejected', color: 'border-red-300 text-red-400' },
]

export default function Applications() {
  const [apps, setApps] = useState(initialApplications)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ role: '', company: '', salary: '' })

  const handleAdd = (e) => {
    e.preventDefault()
    const newApp = {
      id: Date.now(),
      ...form,
      date: new Date().toISOString().split('T')[0],
    }
    setApps({ ...apps, applied: [newApp, ...apps.applied] })
    setForm({ role: '', company: '', salary: '' })
    setShowForm(false)
  }

  const totalApps = Object.values(apps).flat().length

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Application Tracker</h1>
          <p className="text-gray-400 text-sm mt-1">{totalApps} total applications</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          + Add Application
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">New Application</h3>
          <form onSubmit={handleAdd} className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Job Role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              required
              className="flex-1 min-w-32 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              required
              className="flex-1 min-w-32 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Salary (optional)"
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
              className="flex-1 min-w-32 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add
            </button>
          </form>
        </div>
      )}

      {/* Kanban board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div key={col.key} className="flex-shrink-0 w-60">
            <div className={`flex items-center gap-2 mb-3 pb-2 border-b-2 ${col.color}`}>
              <span className="text-sm font-medium">{col.label}</span>
              <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
                {apps[col.key].length}
              </span>
            </div>
            <div className="space-y-3">
              {apps[col.key].length === 0 && (
                <div className="text-xs text-gray-300 text-center py-6 border border-dashed border-gray-100 rounded-lg">
                  No applications
                </div>
              )}
              {apps[col.key].map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 hover:shadow-md transition"
                >
                  <p className="text-sm font-medium text-gray-800">{app.role}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{app.company}</p>
                  {app.salary && (
                    <p className="text-xs text-green-600 mt-1">{app.salary}</p>
                  )}
                  <p className="text-xs text-gray-300 mt-2">{app.date}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}