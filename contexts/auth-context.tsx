"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"
import { useRouter } from "next/navigation"

export interface User {
  username: string
  token: string
}

interface AuthContextType {
  user: User | null
  login: (username: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Load user from localStorage on initial render
  useEffect(() => {
    const loadUser = () => {
      try {
        const token = localStorage.getItem("auth-token")
        const username = localStorage.getItem("auth-username")

        if (token && username) {
          setUser({ username, token })
        }
      } catch (error) {
        console.error("Failed to load user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = useCallback(async (username: string) => {
    // Create a more realistic JWT-like token with header, payload, and signature
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };
    
    const payload = {
      sub: username,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7), // 7 days expiry
      role: 'user'
    };
    
    // Mock JWT (not cryptographically secure, just for demo)
    const base64Header = btoa(JSON.stringify(header));
    const base64Payload = btoa(JSON.stringify(payload));
    const mockToken = `${base64Header}.${base64Payload}.mockSignature`;
    const userData = { username, token: mockToken }

    localStorage.setItem("auth-token", mockToken)
    localStorage.setItem("auth-username", username)
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("auth-token")
    localStorage.removeItem("auth-username")
    setUser(null)
    router.push("/login")
  }, [router])

  const value = {
    user,
    login,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
