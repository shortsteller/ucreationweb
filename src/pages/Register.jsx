import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import './Auth.css'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await register(name, email, password)
      toast.success('Account created successfully!')
      navigate('/')
    } catch (err) {
      toast.error('Registration failed. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo"><span className="logo-text">Uditas</span><span className="logo-sub">Creations</span></Link>
            <h1>Create Account</h1>
            <p>Join us and start your jewelry shopping journey</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <FiUser className="field-icon" />
              <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="auth-field">
              <FiMail className="field-icon" />
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="auth-field">
              <FiLock className="field-icon" />
              <input type={showPassword ? 'text' : 'password'} placeholder="Create password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
              <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <div className="auth-divider"><span>or</span></div>
          <button className="btn btn-secondary btn-lg google-btn" onClick={loginWithGoogle}>
            <FcGoogle /> Continue with Google
          </button>
          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

