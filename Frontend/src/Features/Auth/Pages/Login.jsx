import React, { useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { useAuth } from '../Hooks/useAuth'
import '../Styles/login.scss'

function Login() {
  const navigate = useNavigate()
  const { handleLogin, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const onSignInClick = async () => {
    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }

    try {
      setError('')
      await handleLogin({ email, password, rememberMe })
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <aside className="login-visual">
          <div className="brand">clever</div>
          <div className="visual-copy">
            <h2>Build something amazing today.</h2>
            <p>Maybe some text here will help me see it better.</p>
          </div>
        </aside>

        <section className="login-form-panel">
          <div className="form-wrap">
            <h1>Sign in</h1>
            <p className="subtitle">Welcome back! Enter your details below.</p>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="label-row">
              <label htmlFor="password">Password</label>
              <button type="button" className="text-button">Forgot password?</button>
            </div>
            <div className="form-group">
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <label className="check-row" htmlFor="rememberMe">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Keep me logged in</span>
            </label>

            {error && <p className="error-text">{error}</p>}

            <button type="button" className="primary-btn" onClick={onSignInClick} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="separator">OR</div>

            <div className="social-row">
              <button type="button" className="social-btn">GitHub</button>
              <button type="button" className="social-btn">Google</button>
            </div>

            <p className="signup-row">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Login
