import { useState, useRef } from 'react'
import api from '../lib/axios'

export default function Resume() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [resumes, setResumes] = useState([])
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)

  const fetchResumes = async () => {
    try {
      const { data } = await api.get('/resume/my')
      setResumes(data.data.resumes)
    } catch (err) {
      console.error('Failed to fetch resumes')
    }
  }

  useState(() => {
    fetchResumes()
  }, [])

  const handleFile = (selectedFile) => {
    const allowed = ['application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowed.includes(selectedFile.type)) {
      setError('Only PDF and DOCX files are allowed')
      return
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }
    setError('')
    setFile(selectedFile)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) handleFile(dropped)
  }

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setError('')
    setSuccess('')

    try {
      const formData = new FormData()
      formData.append('resume', file)

      await api.post('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setSuccess('Resume uploaded successfully!')
      setFile(null)
      fetchResumes()
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/resume/${id}`)
      fetchResumes()
    } catch (err) {
      setError('Failed to delete resume')
    }
  }

  const formatSize = (bytes) => {
    return (bytes / 1024).toFixed(1) + ' KB'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Resume</h1>
        <p className="text-gray-500 text-sm mb-8">Upload your resume to get started</p>

        {/* Upload area */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition mb-6
            ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
          <div className="text-4xl mb-3">📄</div>
          {file ? (
            <div>
              <p className="text-sm font-medium text-blue-600">{file.name}</p>
              <p className="text-xs text-gray-400 mt-1">{formatSize(file.size)}</p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium text-gray-700">
                Drag and drop your resume here
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PDF or DOCX, max 5MB
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 text-sm px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        {file && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm transition disabled:opacity-50 mb-8"
          >
            {uploading ? 'Uploading...' : 'Upload Resume'}
          </button>
        )}

        {/* Resume list */}
        {resumes.length > 0 && (
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Uploaded Resumes
            </h2>
            <div className="space-y-3">
              {resumes.map((resume) => (
                <div
                  key={resume._id}
                  className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {resume.fileType === 'pdf' ? '📕' : '📘'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {resume.originalName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatSize(resume.fileSize)} ·{' '}
                        {new Date(resume.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(resume._id)}
                    className="text-red-400 hover:text-red-600 text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}