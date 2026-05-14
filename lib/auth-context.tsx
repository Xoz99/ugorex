'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface User {
  name: string
  email: string
}

interface AuthContextValue {
  user: User | null
  hydrated: boolean
  login: (email: string, password: string) => { ok: boolean; error?: string }
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = 'ugorex-user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  const persist = (u: User | null) => {
    setUser(u)
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    else localStorage.removeItem(STORAGE_KEY)
  }

  // Mock auth — no backend. Any non-empty credentials "work".
  const login = (email: string, password: string) => {
    if (!email || !password) return { ok: false, error: 'Email dan password wajib diisi.' }
    const name = email.split('@')[0].replace(/[._-]/g, ' ')
    persist({ name: name.charAt(0).toUpperCase() + name.slice(1), email })
    return { ok: true }
  }

  const register = (name: string, email: string, password: string) => {
    if (!name || !email || !password) return { ok: false, error: 'Semua field wajib diisi.' }
    if (password.length < 6) return { ok: false, error: 'Password minimal 6 karakter.' }
    persist({ name, email })
    return { ok: true }
  }

  const logout = () => persist(null)

  return (
    <AuthContext.Provider value={{ user, hydrated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
