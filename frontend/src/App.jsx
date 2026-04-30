import { useState } from 'react'
import './App.css'
import AuthPage from './components/AuthPage'
import Dashboard from './components/Dashboard'

const savedToken = localStorage.getItem('assetToken') || ''

function App() {
  const [token, setToken] = useState(savedToken)
  const [page, setPage] = useState(savedToken ? 'dashboard' : 'login')

  const handleAuthSuccess = (newToken) => {
    localStorage.setItem('assetToken', newToken)
    setToken(newToken)
    setPage('dashboard')
  }

  const handleLogout = () => {
    localStorage.removeItem('assetToken')
    setToken('')
    setPage('login')
  }

  if (!token || page !== 'dashboard') {
    return (
      <AuthPage
        mode={page === 'signup' ? 'signup' : 'login'}
        onModeChange={setPage}
        onAuthSuccess={handleAuthSuccess}
      />
    )
  }

  return (
    <Dashboard
      token={token}
      onLogout={handleLogout}
    />
  )
}

export default App



//asset