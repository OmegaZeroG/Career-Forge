import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '▦' },
  { path: '/resume', label: 'Resume', icon: '📄' },
  { path: '/jobs', label: 'Jobs', icon: '💼' },
  { path: '/skills', label: 'Skill Gap', icon: '📊' },
  { path: '/roadmap', label: 'Roadmap', icon: '🗺️' },
  { path: '/applications', label: 'Applications', icon: '📋' },
  { path: '/interview', label: 'Interview', icon: '🎯' },
  { path: '/chat', label: 'AI Chat', icon: '🤖' },
  { path: '/profile', label: 'Profile', icon: '👤' },
]

export default function Sidebar({ collapsed, setCollapsed }) {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-100 flex flex-col transition-all duration-300 z-10 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo + toggle */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
        {!collapsed && (
          <span className="text-base font-semibold text-blue-600 tracking-tight">
            ForgeCareer
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition ml-auto"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition
              ${isActive
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`
            }
          >
            <span className="text-base flex-shrink-0">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User + logout */}
      <div className="border-t border-gray-100 p-3">
        {!collapsed && (
          <div className="px-2 mb-2">
            <p className="text-xs font-medium text-gray-800 truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-500 transition"
        >
          <span>↩</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}