<!-- filepath: c:\Users\15034\Projects\ttrpg-fyi\src\components\SimpleNavbar.vue -->
<template>
  <header class="sticky top-0 z-50">
    <nav class="navbar bg-base-100/90 shadow-sm font-outfit backdrop-blur-lg justify-center items-center py-2 md:px-10 px-5">
      <div class="navbar-start">
        <a class="btn btn-ghost text-xl" href="/"> 
          🎲 TTRPG.fyi
        </a>
      </div>
      
      <div class="navbar-center hidden lg:flex">
        <nav class="menu menu-horizontal">
          <a href="/" class="hover:text-primary hover:bg-primary/10 transition py-2 px-4 rounded-md">
            🏠 Home
          </a>
          <a href="/compendium/csrd" class="hover:text-primary hover:bg-primary/10 transition py-2 px-4 rounded-md">
            🎲 CSRD
          </a>
          <a href="/about" class="hover:text-primary hover:bg-primary/10 transition py-2 px-4 rounded-md">
            ℹ️ About
          </a>
        </nav>
      </div>
      
      <div class="navbar-end flex items-center gap-2">
        <button @click="toggleTheme" class="btn btn-ghost btn-sm">
          {{ themeIcon }} Theme
        </button>
        <a href="/login" class="btn btn-ghost btn-sm">
          🔐 Login
        </a>
        <a href="/signup" class="btn btn-primary btn-sm">
          ➕ Sign Up
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const theme = ref('dark')
const themeIcon = ref('🌙')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  themeIcon.value = theme.value === 'light' ? '☀️' : '🌙'
  
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme.value)
    localStorage.setItem('theme', theme.value)
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    theme.value = savedTheme
    themeIcon.value = savedTheme === 'light' ? '☀️' : '🌙'
    document.documentElement.setAttribute('data-theme', savedTheme)
  }
})
</script>