import { useAuthStore } from '../store/authStore'
import { Link } from 'react-router-dom'

const stats = [
  { label: 'Profile Score', value: '0%', color: 'text-blue-600', bg: 'bg-blue-50', link: '/profile' },
  { label: 'Jobs Matched', value: '0', color: 'text-green-600', bg: 'bg-green-50', link: '/jobs' },
  { label: 'Skills to Learn', value: '0', color: 'text-orange-500', bg: 'bg-orange-50', link: '/skills' },
  { label: 'Applications', value: '0', color: 'text-purple-600', bg: 'bg-purple-50', link: '/applications' },
]

const quickLinks = [
  { label: 'Upload Resume', desc: 'Upload and parse your resume', link: '/resume', icon: '📄' },
  { label: 'Browse Jobs', desc: 'Find matching opportunities', link: '/jobs', icon: '💼' },
  { label: 'View Skill Gap', desc: 'See what skills you need', link: '/skills', icon: '📊' },
  { label: 'Learning Roadmap', desc: 'Get personalized learning path', link: '/roadmap', icon: '🗺️' },
  { label: 'Prep Interview', desc: 'Practice with AI questions', link: '/interview', icon: '🎯' },
  { label: 'AI Career Chat', desc: 'Get personalized guidance', link: '/chat', icon: '🤖' },
]

export default function Dashboard() {
  const { user } = useAuthStore()

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome back, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Here's your career progress overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.link}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-3xl font-semibold ${stat.color}`}>{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="mb-6">
        <h2 className="text-base font-medium text-gray-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              to={item.link}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-100 border border-transparent transition flex items-start gap-4"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Getting started banner */}
      <div className="bg-blue-600 rounded-xl p-6 text-white">
        <h3 className="text-base font-medium mb-1">Get started in 3 steps</h3>
        <p className="text-sm text-blue-100 mb-4">Complete these to unlock your full career dashboard</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/resume" className="bg-white text-blue-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition text-center">
            1. Upload Resume
          </Link>
          <Link to="/jobs" className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-400 transition text-center">
            2. Browse Jobs
          </Link>
          <Link to="/skills" className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-400 transition text-center">
            3. Check Skill Gap
          </Link>
        </div>
      </div>
    </div>
  )
}