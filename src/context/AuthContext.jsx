import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Firebase auth will be integrated here
    const savedUser = localStorage.getItem('uditas_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Firebase auth login will go here
    const mockUser = { id: '1', email, name: email.split('@')[0], avatar: null }
    setUser(mockUser)
    localStorage.setItem('uditas_user', JSON.stringify(mockUser))
    return mockUser
  }

  const register = async (name, email, password) => {
    // Firebase auth register will go here
    const mockUser = { id: '1', email, name, avatar: null }
    setUser(mockUser)
    localStorage.setItem('uditas_user', JSON.stringify(mockUser))
    return mockUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('uditas_user')
  }

  const loginWithGoogle = async () => {
    // Firebase Google auth will go here
    console.log('Google login - Firebase integration pending')
  }

  return (
    <AuthContext.Provider value={{
      user, loading, login, register, logout, loginWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
