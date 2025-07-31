// Types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token?: string
  message?: string
}

// Auth API utilities
export const authApi = {
  // Get current user from API
  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        return data.user || data
      }

      if (response.status === 401) {
        // Unauthorized - user not logged in
        return null
      }

      throw new Error(`Auth check failed: ${response.status}`)
    } catch (error) {
      console.error('Error checking auth status:', error)
      return null
    }
  },

  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (response.ok) {
        // Dispatch auth change event
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-changed'))
        }
        return data
      }

      throw new Error(data.message || 'Login failed')
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  // Sign up user
  async signup(userData: SignupData): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (response.ok) {
        // Dispatch auth change event
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-changed'))
        }
        return data
      }

      throw new Error(data.message || 'Signup failed')
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  },

  // Logout user
  async logout(): Promise<void> {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Clear any local auth data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-token')
        sessionStorage.removeItem('auth-token')
        
        // Dispatch auth change event
        window.dispatchEvent(new CustomEvent('auth-changed'))
      }

      if (!response.ok) {
        throw new Error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  },

  // Refresh token
  async refreshToken(): Promise<boolean> {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return response.ok
    } catch (error) {
      console.error('Token refresh error:', error)
      return false
    }
  },
}

// Cookie/localStorage utilities for Astro server-side
export const authUtils = {
  // Get user from cookies (for Astro server-side)
  async getUserFromCookies(cookies: any): Promise<User | null> {
    try {
      const token = cookies.get('auth-token')?.value
      if (!token) return null

      // If you're using JWT tokens, decode and verify here
      // For session-based auth, look up session in database
      
      // Example JWT verification (you'll need to implement verifyJWT)
      // const payload = await verifyJWT(token)
      // return {
      //   id: payload.userId,
      //   name: payload.name,
      //   email: payload.email,
      //   avatar: payload.avatar
      // }

      // For now, return null until you implement JWT verification
      return null
    } catch (error) {
      console.error('Error getting user from cookies:', error)
      return null
    }
  },

  // Set auth cookie
  setAuthCookie(cookies: any, token: string, maxAge: number = 7 * 24 * 60 * 60) {
    cookies.set('auth-token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge,
      path: '/',
    })
  },

  // Clear auth cookie
  clearAuthCookie(cookies: any) {
    cookies.delete('auth-token', {
      path: '/',
    })
  },
}

// Auth guards for pages
export const authGuards = {
  // Redirect to login if not authenticated
  requireAuth(user: User | null, redirectTo: string = '/login'): void {
    if (!user && typeof window !== 'undefined') {
      window.location.href = redirectTo
    }
  },

  // Redirect to dashboard if already authenticated
  requireGuest(user: User | null, redirectTo: string = '/dashboard'): void {
    if (user && typeof window !== 'undefined') {
      window.location.href = redirectTo
    }
  },

  // Check if user has specific role
  hasRole(user: User | null, role: string): boolean {
    return user?.role === role
  },
}