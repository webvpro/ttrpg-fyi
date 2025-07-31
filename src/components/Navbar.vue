<!-- filepath: c:\Users\15034\Projects\ttrpg-fyi\src\components\Navbar.vue -->
<template>
  <header class="sticky top-0 z-50">
    <nav class="navbar bg-base-100/90 shadow-sm font-outfit backdrop-blur-lg justify-center items-center py-2 md:px-10 px-5">
      
      <!-- Mobile Menu Button & Brand -->
      <div class="navbar-start">
        <div class="dropdown">
          <button
            tabindex="0"
            role="button"
            class="btn btn-ghost lg:hidden"
            aria-label="Open menu"
          >
            <Icon icon="mdi:menu" class="w-5 h-5" />
          </button>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li v-for="item in navigation" :key="item.href">
              <a 
                :href="item.href" 
                :class="[
                  'flex items-center gap-2',
                  { 'active': isCurrentPath(item.href) }
                ]"
              >
                <Icon :icon="item.icon" class="w-4 h-4" />
                {{ item.label }}
              </a>
            </li>
            
            <!-- Mobile auth options -->
            <li class="border-t border-base-300 mt-2 pt-2 lg:hidden">
              <!-- Show user info if logged in -->
              <div v-if="normalizedUser" class="px-4 py-2">
                <div class="font-semibold">{{ normalizedUser.name }}</div>
                <div class="text-sm opacity-70">{{ normalizedUser.email }}</div>
              </div>
              
              <!-- Show login if not logged in -->
              <template v-else>
                <a href="/login" class="flex items-center gap-2">
                  <Icon icon="mdi:login" class="w-4 h-4" />
                  Login
                </a>
              </template>
            </li>
            
            <!-- Mobile user menu items (when logged in) -->
            <template v-if="normalizedUser">
              <li class="lg:hidden">
                <a href="/dashboard" class="flex items-center gap-2">
                  <Icon icon="mdi:view-dashboard" class="w-4 h-4" />
                  Dashboard
                </a>
              </li>
              <li class="lg:hidden">
                <a href="/profile" class="flex items-center gap-2">
                  <Icon icon="mdi:account-edit" class="w-4 h-4" />
                  Settings
                </a>
              </li>
              <li class="lg:hidden">
                <form method="POST" class="w-full">
                    <button type="submit" class="btn btn-error w-full justify-start">
                      <Icon icon="mdi:logout" class="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </form>
              </li>
            </template>
            
            <!-- Mobile signup (when not logged in) -->
            <li v-if="!normalizedUser" class="lg:hidden">
              <a href="/signup" class="flex items-center gap-2">
                <Icon icon="mdi:account-plus" class="w-4 h-4" />
                Sign Up
              </a>
            </li>
          </ul>
        </div>
        <!-- Brand with fallback -->
        <a class="btn btn-ghost  text-xl flex items-center gap-2" href="/"> 
          <!-- Try game-icons first, fallback to emoji -->
          <Icon 
            icon="game-icons:dice-fire" 
            class="w-6 h-6" 
            @error="handleIconError"
            fallback="🎲"
          />
          <!-- Or use conditional rendering -->
          <!-- <Icon v-if="gameIconsLoaded" icon="gi:dice-fire" class="w-6 h-6" />
          <span v-else class="text-2xl">🎲</span> -->
          <span class="font-bold">TTRPG.fyi</span>
        </a>
      </div>
      
      <!-- Desktop Navigation -->
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li v-for="item in navigation" :key="item.href">
            <a 
              :href="item.href" 
              :class="[
                'flex items-center gap-2',
                { 'active': isCurrentPath(item.href) }
              ]"
            >
              <Icon :icon="item.icon" class="w-4 h-4" />
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
      
      <!-- Right Side Actions -->
      <div class="navbar-end flex items-center gap-2">
        <!-- Cookie Settings Button -->
        <button 
          @click="showCookieSettings"
          class="btn btn-ghost btn-sm flex items-center gap-1"
          title="Cookie Settings"
        >
          <Icon icon="mdi:cookie" class="w-4 h-4" />
          <span class="hidden sm:inline">Cookies</span>
        </button>
        
        <!-- Theme Toggle - no props needed, uses global state -->
        <ThemeToggle />
        
        <!-- User Profile Menu (when logged in) -->
        <div v-if="normalizedUser" class="dropdown dropdown-end">
          <button 
            tabindex="0" 
            role="button" 
            class="btn btn-ghost btn-circle avatar"
            aria-label="User menu"
            :title="`Logged in as ${normalizedUser.name}`"
          >
            <div class="w-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
              <img 
                v-if="normalizedUser.avatar" 
                :src="normalizedUser.avatar" 
                :alt="normalizedUser.name"
                class="w-full h-full rounded-full object-cover"
              />
              <Icon v-else icon="mdi:account-circle" class="w-6 h-6 text-primary" />
            </div>
          </button>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li class="menu-title">
              <span>{{ normalizedUser.name }}</span>
              <span class="text-xs opacity-70">{{ normalizedUser.email }}</span>
            </li>
            <li>
              <a href="/dashboard" class="flex items-center gap-2">
                <Icon icon="mdi:view-dashboard" class="w-4 h-4" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="/profile" class="flex items-center gap-2">
                <Icon icon="mdi:account-edit" class="w-4 h-4" />
                Profile Settings
              </a>
            </li>
            <li>
              <a href="/campaigns" class="flex items-center gap-2">
                <Icon icon="game-icons:spell-book" class="w-4 h-4" />
                My Campaigns
              </a>
            </li>
            <li class="border-t border-base-300 mt-2 pt-2">
              <button @click="logout" class="flex items-center gap-2 text-error hover:text-error-content hover:bg-error w-full text-left">
                <Icon icon="mdi:logout" class="w-4 h-4" />
                Logout
              </button>
            </li>
          </ul>
        </div>
        
        <!-- Auth Buttons (when NOT logged in) -->
        <template v-else>
          <a href="/login" class="btn btn-ghost btn-sm flex items-center gap-1">
            <Icon icon="mdi:login" class="w-4 h-4" />
            <span class="hidden sm:inline">Login</span>
          </a>
          <a href="/signup" class="btn btn-primary btn-sm flex items-center gap-1">
            <Icon icon="mdi:account-plus" class="w-4 h-4" />
            <span class="hidden sm:inline">Sign Up</span>
          </a>
        </template>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import ThemeToggle from './ThemeToggle.vue'
import { useUser } from '../composables/useUser'
import { useTheme } from '../composables/useTheme' // Add this

// Define the NavigationItem interface
interface NavigationItem {
  label: string;
  href: string;
  icon: string;
}

// Remove initialTheme prop - not needed anymore
const props = defineProps<{
  user?: any
}>()

// Use theme composable instead of prop
const { currentTheme, resolvedTheme, isDark } = useTheme()

// Use the user composable
const { normalizeUser } = useUser()

// Normalize the user data
const normalizedUser = computed(() => normalizeUser(props.user))

const currentPath = ref('')

// Add state to track if game-icons are loaded
const gameIconsLoaded = ref(false)

// Navigation items with fallbacks
const navigation = computed<NavigationItem[]>(() => [
  { label: 'Home', href: '/', icon: 'mdi:home' },
  { 
    label: 'Compendiums', 
    href: '/compendium', 
    icon: gameIconsLoaded.value ? 'game-icons:magic-gate' : 'mdi:dice-6' 
  },
  { label: 'About', href: '/about', icon: 'mdi:information' },
])

// Methods
const isCurrentPath = (href: string): boolean => {
  if (href === '/') {
    return currentPath.value === '/'
  }
  return currentPath.value.startsWith(href)
}

const updateCurrentPath = () => {
  if (typeof window !== 'undefined') {
    currentPath.value = window.location.pathname
  }
}

const showCookieSettings = () => {
  console.log('Cookie settings button clicked')
  if (typeof window !== 'undefined' && window.showCookieSettings) {
    window.showCookieSettings()
  } else {
    console.warn('Cookie settings function not available')
  }
}

const logout = async () => {
  try {
    console.log('Logging out...')
    
    // Call your logout API endpoint
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    })
    
    if (response.ok) {
      console.log('Logout successful')
      // Redirect to home - the middleware will handle clearing the user
      window.location.href = '/'
    } else {
      console.error('Logout failed')
      // Still redirect to let server handle cleanup
      window.location.href = '/'
    }
  } catch (error) {
    console.error('Error logging out:', error)
    // Fallback redirect
    window.location.href = '/'
  }
}

// Method to handle icon errors
const handleIconError = () => {
  console.warn('gi:dice-twenty-faces-twentyfailed to load, using fallback')
  gameIconsLoaded.value = false
}

// Check if game-icons are available
const checkGameIcons = async () => {
  try {
    // Try to load a game-icon to test if they're available
    const testIcon = await import('@iconify-json/game-icons')
    gameIconsLoaded.value = true
    console.log('game-icons loaded successfully')
  } catch (error) {
    console.warn('game-icons not available, using fallbacks:', error)
    gameIconsLoaded.value = false
  }
}

// Event handlers
const handlePopState = () => {
  updateCurrentPath()
}

// Lifecycle
onMounted(() => {
  console.log('Navbar mounted with user from middleware:', props.user)
  console.log('Normalized user:', normalizedUser.value)
  updateCurrentPath()
  
  // Listen for navigation changes
  if (typeof window !== 'undefined') {
    window.addEventListener('popstate', handlePopState)
  }

  checkGameIcons()
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('popstate', handlePopState)
  }
})

// Expose for parent components if needed
defineExpose({
  user: normalizedUser,
  logout
})
</script>

<style scoped>
/* DaisyUI theme-aware styles */

/* Ensure dropdown appears above other content */
.dropdown-content {
  z-index: 9999;
}

/* Smooth transitions */
.navbar a {
  transition: all 0.2s ease-in-out;
}

/* Mobile menu styling */
@media (max-width: 1023px) {
  .navbar-center {
    display: none;
  }
}

/* Custom hover effects */
.navbar a:hover {
  transform: translateY(-1px);
}
</style>