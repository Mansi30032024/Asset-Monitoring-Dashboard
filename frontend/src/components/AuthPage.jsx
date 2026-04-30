import { useState } from 'react'
import { loginUser, signupUser } from '../services/api'
import MessageBanner from './MessageBanner'

const emptyAuthData = {
  name: '',
  email: '',
  password: '',
  role: 'admin'
}

function AuthPage({ mode, onModeChange, onAuthSuccess }) {
  const [authData, setAuthData] = useState(emptyAuthData)
  const [message, setMessage] = useState('')
  const isLogin = mode === 'login'

  const handleChange = (event) => {
    const { name, value } = event.target
    setAuthData((currentData) => ({ ...currentData, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const body = isLogin
      ? { email: authData.email, password: authData.password }
      : authData

    try {
      const response = isLogin ? await loginUser(body) : await signupUser(body)
      setMessage(isLogin ? 'Login successful' : 'Account created successfully')
      onAuthSuccess(response.data.token)
    } catch (err) {
      setMessage(err.response?.data?.error || 'Server not responding')
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Industrial Monitoring</p>
        <h1>{isLogin ? 'Login to dashboard' : 'Create dashboard account'}</h1>
        <p className="auth-copy">
          Continue to a general-purpose asset monitoring dashboard for industrial operations.
        </p>

        <MessageBanner message={message} />

        <form onSubmit={handleSubmit} className="form auth-form">
          {!isLogin && (
            <>
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  value={authData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Role
                <select name="role" value={authData.role} onChange={handleChange}>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
              </label>
            </>
          )}

          <label>
            Email
            <input
              type="email"
              name="email"
              value={authData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={authData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button className="primary-btn" type="submit">
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? 'Need an account?' : 'Already have an account?'}
          <button type="button" onClick={() => onModeChange(isLogin ? 'signup' : 'login')}>
            {isLogin ? 'Open signup page' : 'Open login page'}
          </button>
        </p>
      </section>
    </main>
  )
}

export default AuthPage
