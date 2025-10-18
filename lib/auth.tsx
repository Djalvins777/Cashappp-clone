"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  username: string
  fullName: string
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const VALID_USERNAME = "Mevins300"
const VALID_PASSWORD = "Goodluck300"
const FULL_NAME = "Mevins Lorenzo Thompson"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    const storedUsername = localStorage.getItem("username")
    if (authStatus === "true" && storedUsername) {
      setIsAuthenticated(true)
      setUsername(storedUsername)
    }
  }, [])

  const login = (inputUsername: string, inputPassword: string) => {
    if (inputUsername === VALID_USERNAME && inputPassword === VALID_PASSWORD) {
      setIsAuthenticated(true)
      setUsername(inputUsername)
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("username", inputUsername)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUsername("")
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("username")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, fullName: FULL_NAME, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
