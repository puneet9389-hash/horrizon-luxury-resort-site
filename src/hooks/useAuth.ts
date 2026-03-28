import { useEffect, useState } from 'react'
import { blink } from '@/lib/blink'

export type User = {
  id: string
  email: string
  displayName?: string
  role?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      if (state.user) {
        setUser({
          id: state.user.id,
          email: state.user.email,
          displayName: state.user.display_name,
          role: state.user.role,
        })
      } else {
        setUser(null)
      }
      
      if (!state.isLoading) {
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const login = () => blink.auth.login()
  const logout = () => blink.auth.logout()

  return { user, isLoading, login, logout, isAuthenticated: !!user }
}
