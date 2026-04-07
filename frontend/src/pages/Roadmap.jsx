import { useState } from 'react'

const mockRoadmap = [
  {
    phase: 'Phase 1',
    title: 'Core Fundamentals',
    duration: '4 weeks',
    status: 'completed',
    skills: ['JavaScript ES6+', 'HTML/CSS', 'Git basics'],
    resources: ['MDN Web Docs', 'freeCodeCamp', 'The Odin Project'],
  },
  {
    phase: 'Phase 2',
    title: 'Frontend Development',
    duration: '6 weeks',
    status: 'in-progress',
    skills: ['React', 'Tailwind CSS', 'React Router'],
    resources: ['React Docs', 'Scrimba React Course', 'Kevin Powell CSS'],
  },
  {
    phase: 'Phase 3',
    title: 'Backend Development',
    duration: '6 weeks',
    status: 'upcoming',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
    resources: ['Node.js Docs', 'The Odin Project', 'Traversy Media'],
  },
  {
    phase: 'Phase 4',
    title: 'Advanced Topics',
    duration: '4 weeks',
    status: 'upcoming',
    skills: ['TypeScript', 'Docker', 'CI/CD', 'AWS basics'],
    resources: ['TypeScript Docs', 'Docker Docs', 'AWS Free Tier'],
  },
]

const statusConfig = {
  completed: { label: 'Completed', color: 'text-green-600', bg: 'bg-green-50', dot: 'bg-green-500' },
  'in-progress': { label: 'In Progress', color: 'text-blue-600', bg: 'bg-blue-50', dot: 'bg-blue-500' },
  upcoming: { label: 'Upcoming', color: 'text-gray-400', bg: 'bg-gray-50', dot: 'bg-gray-300' },
}

export default function Roadmap() {
  const [activePhase, setActivePhase] = useState(1)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Learning Roadmap</h1>
        <p className="text-gray-400 text-sm mt-1">
          Your personalized path to becoming job-ready
        </p>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-gray-700">Overall Progress</h2>
          <span className="text-sm font-medium text-blue-600">25%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }} />
        </div>
        <p className="text-xs text-gray-400 mt-2">1 of 4 phases completed</p>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {mockRoadmap.map((phase, index) => {
          const config = statusConfig[phase.status]
          return (
            <div
              key={phase.phase}
              className={`bg-white rounded-xl p-5 shadow-sm border-l-4 cursor-pointer transition hover:shadow-md
                ${phase.status === 'completed' ? 'border-green-400' :
                  phase.status === 'in-progress' ? 'border-blue-500' : 'border-gray-200'}`}
              onClick={() => setActivePhase(activePhase === index ? null : index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{phase.phase}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-800 mt-0.5">{phase.title}</h3>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{phase.duration}</span>
              </div>

              {activePhase === index && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-2">Skills to Learn</p>
                      <div className="flex flex-wrap gap-1.5">
                        {phase.skills.map((skill) => (
                          <span key={skill} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-2">Resources</p>
                      <ul className="space-y-1">
                        {phase.resources.map((res) => (
                          <li key={res} className="text-xs text-blue-500 hover:underline cursor-pointer">
                            → {res}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}