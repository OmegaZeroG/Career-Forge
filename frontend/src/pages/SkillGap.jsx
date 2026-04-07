import { useState } from 'react'

const mockSkills = {
  have: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
  missing: ['TypeScript', 'Node.js', 'Docker', 'AWS', 'GraphQL'],
  learning: ['Python', 'MongoDB'],
}

export default function SkillGap() {
  const [targetRole, setTargetRole] = useState('')
  const [analyzed, setAnalyzed] = useState(false)

  const handleAnalyze = (e) => {
    e.preventDefault()
    setAnalyzed(true)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Skill Gap Analysis</h1>
        <p className="text-gray-400 text-sm mt-1">
          See which skills you need for your target role
        </p>
      </div>

      {/* Target role input */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 className="text-sm font-medium text-gray-700 mb-4">Target Role</h2>
        <form onSubmit={handleAnalyze} className="flex gap-3">
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g. Full Stack Developer, Data Scientist"
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition"
          >
            Analyze
          </button>
        </form>
      </div>

      {analyzed && (
        <>
          {/* Score */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-700">Skill Match Score</h2>
              <span className="text-2xl font-semibold text-blue-600">50%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }} />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              You have 5 of 10 required skills for {targetRole}
            </p>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-medium text-green-600 mb-3">
                ✅ Skills You Have ({mockSkills.have.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {mockSkills.have.map((skill) => (
                  <span key={skill} className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-medium text-red-500 mb-3">
                ❌ Missing Skills ({mockSkills.missing.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {mockSkills.missing.map((skill) => (
                  <span key={skill} className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-medium text-orange-500 mb-3">
                📚 Currently Learning ({mockSkills.learning.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {mockSkills.learning.map((skill) => (
                  <span key={skill} className="text-xs bg-orange-50 text-orange-600 px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {!analyzed && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">📊</p>
          <p className="text-sm">Enter your target role above to analyze your skill gap</p>
        </div>
      )}
    </div>
  )
}