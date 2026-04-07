import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Resume from './pages/Resume'
import Jobs from './pages/Jobs'
import SkillGap from './pages/SkillGap'
import Roadmap from './pages/Roadmap'
import Applications from './pages/Applications'
import Interview from './pages/Interview'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import ProtectedRoute from './routes/ProtectedRoute'
import AppLayout from './components/layout/AppLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes with sidebar layout */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/skills" element={<SkillGap />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App