<!-- filepath: c:\Users\15034\Projects\ttrpg-fyi\src\components\ThemeToggle.vue -->
<template>
  <details class="dropdown dropdown-end">
    <summary 
      class="btn btn-ghost btn-sm btn-circle"
      :title="`Current theme: ${currentThemeData.label}`"
    >
      <Icon :icon="currentThemeData.icon" class="w-4 h-4" />
    </summary>
    
    <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-64 max-h-96 overflow-y-auto p-2 shadow-lg">
      <!-- System themes section -->
      <li class="menu-title">
        <span>System</span>
      </li>
      <li>
        <a 
          @click="handleThemeClick('auto')"
          :class="{ 'active': currentTheme === 'auto' }"
        >
          <Icon icon="mdi:theme-light-dark" class="w-4 h-4" />
          Auto
          <span v-if="currentTheme === 'auto'" class="badge badge-sm">✓</span>
        </a>
      </li>
      
      <!-- Light themes section -->
      <li v-for="theme in lightThemes" :key="theme.name">
        <a 
          @click="handleThemeClick(theme.name)"
          :class="{ 'active': currentTheme === theme.name }"
        >
          <Icon :icon="theme.icon" class="w-4 h-4" />
          {{ theme.label }}
          <span v-if="currentTheme === theme.name" class="badge badge-sm">✓</span>
        </a>
      </li>
      
      <li v-for="theme in darkThemes" :key="theme.name">
        <a 
          @click="handleThemeClick(theme.name)"
          :class="{ 'active': currentTheme === theme.name }"
        >
          <Icon :icon="theme.icon" class="w-4 h-4" />
          {{ theme.label }}
          <span v-if="currentTheme === theme.name" class="badge badge-sm">✓</span>
        </a>
      </li>
    </ul>
  </details>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useTheme } from '../composables/useTheme'

// Use the theme composable
const { currentTheme, setTheme } = useTheme()

// Theme click handler that closes the dropdown
const handleThemeClick = (themeName: string) => {
  setTheme(themeName)
  // Close the details dropdown after selection
  const details = document.querySelector('details[open]') as HTMLDetailsElement
  if (details) {
    details.removeAttribute('open')
  }
}

// Light themes
const lightThemes = [
  { name: 'light', label: 'Light', icon: 'mdi:white-balance-sunny' },
  { name: 'cupcake', label: 'Cupcake', icon: 'mdi:cupcake' },
  { name: 'bumblebee', label: 'Bumblebee', icon: 'mdi:bee' },
  { name: 'emerald', label: 'Emerald', icon: 'mdi:diamond-stone' },
  { name: 'corporate', label: 'Corporate', icon: 'mdi:office-building' },
  { name: 'garden', label: 'Garden', icon: 'mdi:flower' },
  { name: 'lofi', label: 'Lo-Fi', icon: 'mdi:music-note' },
  { name: 'pastel', label: 'Pastel', icon: 'mdi:palette' },
  { name: 'fantasy', label: 'Fantasy', icon: 'mdi:castle' },
  { name: 'wireframe', label: 'Wireframe', icon: 'mdi:vector-square' },
  { name: 'cmyk', label: 'CMYK', icon: 'mdi:printer' },
  { name: 'autumn', label: 'Autumn', icon: 'mdi:leaf' },
  { name: 'acid', label: 'Acid', icon: 'mdi:test-tube' },
  { name: 'lemonade', label: 'Lemonade', icon: 'mdi:cup' },
  { name: 'winter', label: 'Winter', icon: 'mdi:snowflake' },
] as const

// Dark themes
const darkThemes = [
  { name: 'dark', label: 'Dark', icon: 'mdi:weather-night' },
  { name: 'synthwave', label: 'Synthwave', icon: 'mdi:sine-wave' },
  { name: 'retro', label: 'Retro', icon: 'mdi:cassette' },
  { name: 'cyberpunk', label: 'Cyberpunk', icon: 'mdi:robot' },
  { name: 'valentine', label: 'Valentine', icon: 'mdi:heart' },
  { name: 'halloween', label: 'Halloween', icon: 'mdi:halloween' },
  { name: 'forest', label: 'Forest', icon: 'mdi:tree' },
  { name: 'aqua', label: 'Aqua', icon: 'mdi:water' },
  { name: 'black', label: 'Black', icon: 'mdi:circle' },
  { name: 'luxury', label: 'Luxury', icon: 'mdi:diamond' },
  { name: 'dracula', label: 'Dracula', icon: 'mdi:vampire' },
  { name: 'business', label: 'Business', icon: 'mdi:briefcase' },
  { name: 'night', label: 'Night', icon: 'mdi:moon-waning-crescent' },
  { name: 'coffee', label: 'Coffee', icon: 'mdi:coffee' },
  { name: 'dim', label: 'Dim', icon: 'mdi:brightness-6' },
  { name: 'nord', label: 'Nord', icon: 'mdi:mountain' },
  { name: 'sunset', label: 'Sunset', icon: 'mdi:weather-sunset' },
] as const

// All themes combined for finding current theme data
const allThemes = [
  { name: 'auto', label: 'Auto', icon: 'mdi:theme-light-dark' },
  ...lightThemes,
  ...darkThemes
] as const

const currentThemeData = computed(() => {
  const found = allThemes.find(t => t.name === currentTheme.value)
  return found || allThemes[0]
})
</script>

<style scoped>
/* Custom dropdown positioning if needed */
.dropdown-content {
  margin-top: 0.5rem;
}
</style>