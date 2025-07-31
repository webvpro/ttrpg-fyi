import { ref, computed, onMounted, onUnmounted, readonly } from 'vue' // Add readonly here

// Extend Window interface for TypeScript
declare global {
  interface Window {
    themeManager?: {
      currentTheme: string
      validThemes: string[]
      setTheme: (theme: string) => void
      getTheme: () => string
      getResolvedTheme: () => string | null
      isValidTheme: (theme: string) => boolean
      applyTheme: (theme: string) => void
      init: () => void
    }
  }
}

// Theme change event interface
interface ThemeChangeEvent extends CustomEvent {
  detail: {
    theme: string
    resolvedTheme: string
  }
}

export function useTheme() {
  const currentTheme = ref<string>('auto')
  const resolvedTheme = ref<string>('dark')
  const isLoading = ref<boolean>(true)

  // Get theme manager safely
  const getThemeManager = () => {
    if (typeof window !== 'undefined' && window.themeManager) {
      return window.themeManager
    }
    return null
  }

  // Set theme
  const setTheme = (theme: string): void => {
    const manager = getThemeManager()
    if (manager) {
      manager.setTheme(theme)
      // Don't manually update here - let the event handler do it
    } else {
      console.warn('Theme manager not available')
    }
  }

  // Get current theme
  const getTheme = (): string => {
    const manager = getThemeManager()
    return manager ? manager.getTheme() : 'auto'
  }

  // Get resolved theme (what's actually applied)
  const getResolvedTheme = (): string => {
    const manager = getThemeManager()
    return manager ? (manager.getResolvedTheme() || 'dark') : 'dark'
  }

  // Check if theme is valid
  const isValidTheme = (theme: string): boolean => {
    const manager = getThemeManager()
    return manager ? manager.isValidTheme(theme) : false
  }

  // Get available themes
  const getAvailableThemes = (): string[] => {
    const manager = getThemeManager()
    return manager ? manager.validThemes : ['light', 'dark', 'auto']
  }

  // Listen for theme changes with proper typing - THIS IS KEY
  const handleThemeChange = (event: Event): void => {
    const themeEvent = event as ThemeChangeEvent
    console.log('=== THEME CHANGE EVENT RECEIVED ===')
    console.log('Event detail:', themeEvent.detail)
    
    if (themeEvent.detail) {
      console.log('Updating theme state:', {
        from: { current: currentTheme.value, resolved: resolvedTheme.value },
        to: { current: themeEvent.detail.theme, resolved: themeEvent.detail.resolvedTheme }
      })
      
      currentTheme.value = themeEvent.detail.theme
      resolvedTheme.value = themeEvent.detail.resolvedTheme
    }
  }

  // Update theme state from theme manager
  const updateThemeState = (): void => {
    const manager = getThemeManager()
    if (manager) {
      const newCurrent = manager.getTheme()
      const newResolved = manager.getResolvedTheme() || 'dark'
      
      console.log('=== UPDATING THEME STATE ===')
      console.log('Manager current:', newCurrent)
      console.log('Manager resolved:', newResolved)
      
      currentTheme.value = newCurrent
      resolvedTheme.value = newResolved
      isLoading.value = false
    }
  }

  // Wait for theme manager to be available
  const waitForThemeManager = (): void => {
    if (getThemeManager()) {
      updateThemeState()
    } else {
      // Retry after a short delay
      setTimeout(waitForThemeManager, 10)
    }
  }

  // Computed properties
  const isDark = computed(() => {
    const theme = resolvedTheme.value
    return theme === 'dark' || theme.includes('dark')
  })

  const isLight = computed(() => {
    const theme = resolvedTheme.value
    return theme === 'light' || theme.includes('light')
  })

  const isAuto = computed(() => {
    return currentTheme.value === 'auto'
  })

  // Lifecycle hooks
  onMounted(() => {
    console.log('=== useTheme MOUNTED ===')
    waitForThemeManager()
    
    // Listen for theme changes - CRITICAL FOR SYNCING
    if (typeof window !== 'undefined') {
      console.log('Adding theme-changed event listener')
      window.addEventListener('theme-changed', handleThemeChange)
    }
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      console.log('Removing theme-changed event listener')
      window.removeEventListener('theme-changed', handleThemeChange)
    }
  })

  return {
    // State
    currentTheme: readonly(currentTheme),
    resolvedTheme: readonly(resolvedTheme),
    isLoading: readonly(isLoading),
    
    // Actions
    setTheme,
    getTheme,
    getResolvedTheme,
    isValidTheme,
    getAvailableThemes,
    
    // Computed
    isDark,
    isLight,
    isAuto
  }
}

// Export types for use in components
export type { ThemeChangeEvent }