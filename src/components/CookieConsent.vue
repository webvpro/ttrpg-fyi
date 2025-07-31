<!-- filepath: c:\Users\15034\Projects\ttrpg-fyi\src\components\CookieConsent.vue -->
<template>
  <!-- Cookie Consent Modal -->
  <div v-if="showConsent" class="modal modal-open">
    <div class="modal-box max-w-md cookie-modal">
      <h3 class="font-bold text-lg flex items-center gap-2">
        🍪 We use cookies
      </h3>
      <p class="py-4 text-sm">
        This website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. 
        The latter will be set only after consent.
      </p>
      <div class="modal-action">
        <button 
          @click="acceptAll" 
          class="btn btn-primary btn-sm"
        >
          Accept all
        </button>
        <button 
          @click="showPreferences = true" 
          class="btn btn-ghost btn-sm"
        >
          Manage preferences
        </button>
        <button 
          @click="rejectAll" 
          class="btn btn-outline btn-sm"
        >
          Reject all
        </button>
      </div>
    </div>
  </div>

  <!-- Preferences Modal -->
  <div v-if="showPreferences" class="modal modal-open">
    <div class="modal-box max-w-2xl max-h-[80vh] overflow-y-auto cookie-modal">
      <h3 class="font-bold text-lg mb-4">Cookie preferences</h3>
      
      <!-- Cookie sections -->
      <div class="space-y-6">
        <!-- Info section -->
        <div class="alert alert-info">
          <Icon name="mdi:information" class="w-6 h-6" />
          <span class="text-sm">We use cookies to enhance your TTRPG.fyi experience, serve personalized content, and analyze our traffic.</span>
        </div>

        <!-- Necessary cookies -->
        <div class="card bg-base-200">
          <div class="card-body p-4">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h4 class="font-semibold flex items-center gap-2">
                  ⚙️ Strictly Necessary Cookies
                </h4>
                <p class="text-sm text-base-content/70 mt-1">
                  Essential for the proper functioning of TTRPG.fyi. Without these cookies, features like theme switching and user authentication would not work properly.
                </p>
              </div>
              <input 
                type="checkbox" 
                class="toggle toggle-primary" 
                :checked="true" 
                disabled
              />
            </div>
          </div>
        </div>

        <!-- Functionality cookies -->
        <div class="card bg-base-200">
          <div class="card-body p-4">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h4 class="font-semibold flex items-center gap-2">
                  🎨 Functionality Cookies
                </h4>
                <p class="text-sm text-base-content/70 mt-1">
                  Allow TTRPG.fyi to provide enhanced functionality like remembering your theme preference and personalization.
                </p>
              </div>
              <input 
                type="checkbox" 
                class="toggle toggle-primary" 
                v-model="preferences.functionality"
              />
            </div>
          </div>
        </div>

        <!-- Analytics cookies -->
        <div class="card bg-base-200">
          <div class="card-body p-4">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h4 class="font-semibold flex items-center gap-2">
                  📊 Analytics Cookies
                </h4>
                <p class="text-sm text-base-content/70 mt-1">
                  Help us understand how visitors interact with TTRPG.fyi by collecting and reporting information anonymously.
                </p>
              </div>
              <input 
                type="checkbox" 
                class="toggle toggle-primary" 
                v-model="preferences.analytics"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="modal-action mt-6">
        <button 
          @click="savePreferences" 
          class="btn btn-primary"
        >
          Save preferences
        </button>
        <button 
          @click="acceptAllFromPreferences" 
          class="btn btn-ghost"
        >
          Accept all
        </button>
        <button 
          @click="rejectAllFromPreferences" 
          class="btn btn-outline"
        >
          Reject all
        </button>
        <button 
          @click="closePreferences" 
          class="btn btn-ghost"
        >
          Cancel
        </button>
      </div>

      <!-- Footer links -->
      <div class="text-center mt-4 text-sm">
        <a href="/privacy-policy" class="link link-primary mr-4">Privacy Policy</a>
        <a href="/terms" class="link link-primary">Terms of Service</a>
      </div>
    </div>
  </div>

  <!-- Settings Button (for navbar) -->
  <button 
    v-if="consentGiven && !showConsent && !showPreferences"
    @click="showPreferences = true"
    class="btn btn-ghost btn-sm"
    title="Cookie Settings"
  >
    🍪
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

// Declare the custom property on the Window interface
declare global {
  interface Window {
    showCookieSettings: () => void;
  }
}

// Reactive state
const showConsent = ref(false)
const showPreferences = ref(false)
const consentGiven = ref(false)

const preferences = ref({
  necessary: true, // Always true
  functionality: false,
  analytics: false
})

// Cookie management
const COOKIE_CONSENT_KEY = 'ttrpg-cookie-consent'
const COOKIE_PREFERENCES_KEY = 'ttrpg-cookie-preferences'

// Get cookie value
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}

// Set cookie
const setCookie = (name: string, value: string, days: number = 365) => {
  if (typeof document === 'undefined') return
  
  const expires = new Date()
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

// Load saved preferences
const loadPreferences = () => {
  const consent = getCookie(COOKIE_CONSENT_KEY)
  const savedPrefs = getCookie(COOKIE_PREFERENCES_KEY)
  
  if (consent === 'true') {
    consentGiven.value = true
    showConsent.value = false
    
    if (savedPrefs) {
      try {
        const prefs = JSON.parse(savedPrefs)
        preferences.value = { ...preferences.value, ...prefs }
      } catch (error) {
        console.error('Error parsing cookie preferences:', error)
      }
    }
  } else {
    showConsent.value = true
  }
}

// Save consent and preferences
const saveConsentAndPreferences = () => {
  setCookie(COOKIE_CONSENT_KEY, 'true')
  setCookie(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences.value))
  consentGiven.value = true
  showConsent.value = false
  showPreferences.value = false
  
  // Clear cookies based on preferences
  manageCookies()
  
  console.log('Cookie preferences saved:', preferences.value)
}

// Manage cookies based on preferences
const manageCookies = () => {
  if (!preferences.value.analytics) {
    // Clear analytics cookies
    const analyticsCookies = ['_ga', '_gid', '_gat', '_gtag']
    analyticsCookies.forEach(cookie => {
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    })
  }
  
  if (!preferences.value.functionality) {
    // Clear functionality cookies (except theme)
    const functionalityCookies = ['user-preferences', 'ttrpg-settings']
    functionalityCookies.forEach(cookie => {
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    })
  }
}

// Action handlers
const acceptAll = () => {
  preferences.value = {
    necessary: true,
    functionality: true,
    analytics: true
  }
  saveConsentAndPreferences()
}

const rejectAll = () => {
  preferences.value = {
    necessary: true,
    functionality: false,
    analytics: false
  }
  saveConsentAndPreferences()
}

const acceptAllFromPreferences = () => {
  preferences.value = {
    necessary: true,
    functionality: true,
    analytics: true
  }
  saveConsentAndPreferences()
}

const rejectAllFromPreferences = () => {
  preferences.value = {
    necessary: true,
    functionality: false,
    analytics: false
  }
  saveConsentAndPreferences()
}

const savePreferences = () => {
  saveConsentAndPreferences()
}

const closePreferences = () => {
  showPreferences.value = false
}

// Reset consent (for testing)
const resetConsent = () => {
  setCookie(COOKIE_CONSENT_KEY, '', -1)
  setCookie(COOKIE_PREFERENCES_KEY, '', -1)
  consentGiven.value = false
  showConsent.value = true
  showPreferences.value = false
  preferences.value = {
    necessary: true,
    functionality: false,
    analytics: false
  }
}

// Expose methods for parent components
defineExpose({
  showSettings: () => {
    showPreferences.value = true
  },
  reset: resetConsent
})

// Global function for navbar
if (typeof window !== 'undefined') {
  window.showCookieSettings = () => {
    showPreferences.value = true
  }
}

// Lifecycle
onMounted(() => {
  // Small delay to ensure DOM is ready
  setTimeout(loadPreferences, 100)
})
</script>

<style scoped>
/* Use CSS custom properties and regular CSS instead of @apply */
.cookie-modal {
  border: 1px solid hsl(var(--bc) / 0.2);
  transition: all 0.3s ease;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .cookie-modal {
    max-width: 95vw;
    margin: 1rem;
  }
}

/* Theme-specific adjustments using CSS custom properties */
[data-theme="cyberpunk"] .cookie-modal {
  border-color: hsl(var(--a));
}

[data-theme="retro"] .cookie-modal {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", monospace;
}

/* Ensure proper z-index for modals */
.modal {
  z-index: 9999;
}

/* Smooth fade in animation */
.modal {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

