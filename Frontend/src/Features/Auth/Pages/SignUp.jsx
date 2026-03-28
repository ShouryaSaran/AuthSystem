import React, { useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { useAuth } from '../Hooks/useAuth'
import '../Styles/register.scss'

function SignUp() {
  const navigate = useNavigate()
  const { handleRegister, loading } = useAuth()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [missingFields, setMissingFields] = useState([])
  const [error, setError] = useState('')
  const [animateErrors, setAnimateErrors] = useState(false)

  const fieldLabelMap = {
    username: 'Username',
    email: 'Email address',
    password: 'Password'
  }

  const isMissing = (fieldName) => missingFields.includes(fieldName)

  const triggerErrorAnimation = () => {
    setAnimateErrors(false)
    requestAnimationFrame(() => setAnimateErrors(true))
  }

  const onSignUpClick = async () => {
    const missing = []

    if (!username.trim()) missing.push('username')
    if (!email.trim()) missing.push('email')
    if (!password.trim()) missing.push('password')

    if (missing.length > 0) {
      setMissingFields(missing)
      setError(`Required fields: ${missing.map((field) => fieldLabelMap[field]).join(', ')}`)
      triggerErrorAnimation()
      return
    }

    try {
      setMissingFields([])
      setError('')
      await handleRegister({ username, email, password })
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <aside className="register-visual">
          <div className="brand">clever</div>
          <div className="visual-copy">
            <h2>Build something amazing today.</h2>
            <p>Start your account and begin creating in minutes.</p>
          </div>
        </aside>

        <section className="register-form-panel">
          <div className="form-wrap">
            <h1>Create account</h1>
            <p className="subtitle">Join us! Enter your details below.</p>

            <div className={`form-group ${isMissing('username') ? 'is-invalid' : ''} ${isMissing('username') && animateErrors ? 'bounce' : ''}`}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className={`form-group ${isMissing('email') ? 'is-invalid' : ''} ${isMissing('email') && animateErrors ? 'bounce' : ''}`}>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={`form-group ${isMissing('password') ? 'is-invalid' : ''} ${isMissing('password') && animateErrors ? 'bounce' : ''}`}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="required-error">{error}</p>}

            <button type="button" className="primary-btn" onClick={onSignUpClick} disabled={loading}>
              {loading ? 'Creating account...' : 'Sign up'}
            </button>

            <div className="separator">OR</div>

            <div className="social-row">
              <button type="button" className="social-btn">GitHub</button>
              <button type="button" className="social-btn">Google</button>
            </div>

            <p className="signin-row">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SignUp
