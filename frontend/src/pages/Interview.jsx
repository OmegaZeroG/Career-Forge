import { useState } from 'react'

const mockQuestions = {
  behavioral: [
    { q: 'Tell me about yourself.', tip: 'Use the Present-Past-Future formula. Start with your current role, mention past experience, then your goals.' },
    { q: 'What is your greatest strength?', tip: 'Pick a strength relevant to the role and back it up with a specific example.' },
    { q: 'Describe a challenge you overcame.', tip: 'Use the STAR method: Situation, Task, Action, Result.' },
  ],
  technical: [
    { q: 'Explain the difference between == and === in JavaScript.', tip: '== checks value only, === checks value AND type. Always prefer === to avoid type coercion bugs.' },
    { q: 'What is the virtual DOM in React?', tip: 'A lightweight JS representation of the real DOM. React compares old and new virtual DOM to minimize real DOM updates.' },
    { q: 'What is a REST API?', tip: 'An architectural style using HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources.' },
  ],
  situational: [
    { q: 'How do you handle tight deadlines?', tip: 'Prioritize tasks, communicate early about blockers, focus on MVP first.' },
    { q: 'How do you work in a team?', tip: 'Mention communication, code reviews, pair programming, and conflict resolution.' },
  ],
}

const categories = [
  { key: 'behavioral', label: 'Behavioral', icon: '🧠' },
  { key: 'technical', label: 'Technical', icon: '💻' },
  { key: 'situational', label: 'Situational', icon: '🎯' },
]

export default function Interview() {
  const [activeCategory, setActiveCategory] = useState('behavioral')
  const [expanded, setExpanded] = useState(null)
  const [role, setRole] = useState('')

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Interview Preparation</h1>
        <p className="text-gray-400 text-sm mt-1">Practice common interview questions with AI tips</p>
      </div>

      {/* Role input */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter target role (e.g. Frontend Developer)"
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition">
            Generate Questions
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
              ${activeCategory === cat.key
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
              }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {mockQuestions[activeCategory].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setExpanded(expanded === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
            >
              <span className="text-sm font-medium text-gray-800">{item.q}</span>
              <span className="text-gray-400 ml-4 flex-shrink-0">
                {expanded === index ? '▲' : '▼'}
              </span>
            </button>
            {expanded === index && (
              <div className="px-5 pb-5 border-t border-gray-50">
                <div className="bg-blue-50 rounded-lg p-4 mt-3">
                  <p className="text-xs font-medium text-blue-600 mb-1">💡 Tip</p>
                  <p className="text-sm text-blue-800">{item.tip}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}