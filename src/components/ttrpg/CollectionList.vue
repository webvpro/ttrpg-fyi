<template>
  <div class="relative">
    <!-- Main content (always visible) -->
    <div class="flex flex-col">
      <!-- Navbar -->
      <div class="navbar bg-base-300">
        <div class="flex-1">
          <h1 class="text-xl font-bold">{{ computedPageTitle }}</h1>
        </div>
        <div class="flex-none">
          <button 
            v-if="selectedEntry"
            @click="toggleDrawer"
            class="btn btn-square btn-ghost"
          >
            <Icon icon="mdi:information-outline" class="w-6 h-6" />
          </button>
        </div> 
      </div>
      
      <!-- Main content area (now the list) -->
      <div class="flex-1 flex flex-col">
        <!-- Main header -->
        <div class="p-4 border-b border-base-300">
          <h2 class="text-lg font-semibold">{{ formattedCollectionName }} List</h2>
          <p class="text-sm text-gray-600 opacity-70">{{ entries.length }} items</p>
        </div>
        
        <!-- Search bar -->
        <div class="p-4 border-b border-base-300">
          <input 
            v-model="searchTerm"
            type="text" 
            placeholder="Search items..." 
            class="input input-sm w-full max-w-md"
          />
        </div>

        <!-- Debug info (only in development) -->
        <div v-if="showDebug" class="alert alert-warning text-warning-content m-4">
          <Icon icon="mdi:alert-outline" class="w-6 h-6 shrink-0" />
          <div>
            <h3 class="font-bold">Debug Info</h3>
            <div class="text-xs">Found {{ entries.length }} {{ formattedCollectionName }}</div>
            <div v-if="entries.length === 0" class="text-xs text-error">
              No {{ formattedCollectionName }} found! Check collection configuration.
            </div>
          </div>
        </div>

        <!-- Related Rules Component -->
        <div class="p-4">
          <RelatedRules 
            :rules="rules"
            :collection-name="collectionName"
            :show-debug="showDebug"
            :tab-key="tabKey"
          />
        </div>
        
        <!-- Entries grid/list -->
        <div class="flex-1 p-4" @click="handleBackgroundClick">
          <!-- No entries found -->
          <div v-if="entries.length === 0" class="alert alert-error">
            <Icon icon="mdi:close-circle-outline" class="w-6 h-6 shrink-0" />
            <div>
              <h3 class="font-bold">No {{ formattedCollectionName }} found!</h3>
              <div class="text-xs">This could be due to:</div>
              <ul class="list-disc list-inside mt-2 text-xs">
                <li>Collection configuration error</li>
                <li>File path mismatch</li>
                <li>Invalid frontmatter in markdown files</li>
              </ul>
            </div>
          </div>

          <!-- Entries grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div 
              v-for="entry in filteredEntries" 
              :key="entry.id"
              class="card bg-base-100 shadow hover:shadow-lg transition-shadow cursor-pointer"
              :class="{ 'ring-2 ring-primary': selectedEntry?.id === entry.id }"
              @click="selectEntry(entry)"
            >
              <div class="card-body p-4">
                <h3 class="card-title text-base">{{ entry.title || entry.id }}</h3>
                <p v-if="entry.description" class="text-sm text-gray-600 opacity-70 line-clamp-3">
                  {{ entry.description }}
                </p>
                <div class="card-actions justify-end mt-2">
                  <button class="btn btn-sm btn-primary">View Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Floating sidebar (positioned absolutely) -->
    <div 
      v-show="selectedEntry && isDrawerOpen"
      ref="sidebarRef"
      class="fixed top-0 right-0 w-96 h-full bg-base-200 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out"
    >
      <!-- Backdrop/overlay for mobile -->
      <div 
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        @click="closeDrawer"
      ></div>
      
      <!-- Sidebar content -->
      <div class="relative h-full flex flex-col z-50">
        <!-- Header -->
        <div class="p-4 border-b border-base-300 bg-base-300">
          <div class="flex justify-between items-start">
            <h2 class="text-lg font-semibold">{{ selectedEntry?.title || selectedEntry?.id }}</h2>
            <button @click="closeDrawer" class="btn btn-sm btn-ghost">
              <Icon icon="mdi:close" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-4">
          <!-- Entry content -->
          <div class="mb-4" v-if="selectedEntry">
            <!-- Markdown content from the entry itself -->
            <div 
              v-if="selectedEntry.rendered?.html" 
              class="prose prose-sm max-w-none" 
              v-html="selectedEntry.rendered.html"
            ></div>
            <!-- Fallback to description if no rendered content -->
            <div v-else-if="selectedEntry.description" class="mb-4">
              <p class="text-gray-600 opacity-70">{{ selectedEntry.description }}</p>
            </div>
            <div v-else class="text-gray-500 italic">No content available for this entry.</div>
          </div>

          <!-- Additional Properties (if any) -->
          <div v-if="additionalProperties.length > 0" class="mb-4">
            <h3 class="font-bold text-base mb-3">Properties</h3>
            <div class="space-y-2">
              <div v-for="prop in additionalProperties" :key="prop.key" class="flex flex-col p-3 bg-base-100 rounded">
                <span class="font-medium text-sm">{{ formatKey(prop.key) }}</span>
                <span class="text-sm mt-1">{{ formatValue(prop.value) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="p-4 border-t border-base-300 bg-base-300" v-if="selectedEntry">
          <div class="flex flex-col gap-2">
            <a 
              :href="`/compendium/csrd/${folderName}/${selectedEntry.id.toLowerCase()}`" 
              class="btn btn-primary btn-sm"
            >
              View Full Page
            </a>
            <button @click="closeDrawer" class="btn btn-outline btn-sm">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import RelatedRules from '../vue/RelatedRules.vue'

// Props
const props = defineProps({
  entries: {
    type: Array,
    required: true,
    default: () => []
  },
  rules: {
    type: [Object, Array],
    default: () => ({})
  },
  collectionName: {
    type: String,
    required: true
  },
  folderName: {
    type: String,
    required: true
  },
  pageTitle: {
    type: String,
    default: ''
  },
  pageDescription: {
    type: String,
    default: ''
  },
  showDebug: {
    type: Boolean,
    default: false
  }
})

// Reactive data
const selectedEntry = ref(null)
const searchTerm = ref('')
const isDrawerOpen = ref(false)
const sidebarRef = ref(null)

// Computed properties
const formattedCollectionName = computed(() => {
  return props.collectionName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
})

const computedPageTitle = computed(() => {
  return props.pageTitle || formattedCollectionName.value
})

const computedPageDescription = computed(() => {
  return props.pageDescription || `A complete list of all ${formattedCollectionName.value.toLowerCase()}`
})

const filteredEntries = computed(() => {
  if (!searchTerm.value) return props.entries
  
  return props.entries.filter(entry => {
    const title = entry.title || entry.id
    return title.toLowerCase().includes(searchTerm.value.toLowerCase())
  })
})

const additionalProperties = computed(() => {
  if (!selectedEntry.value) return []
  
  const excludeKeys = ['id', 'title', 'description', 'rendered']
  return Object.entries(selectedEntry.value)
    .filter(([key, value]) => !excludeKeys.includes(key) && value !== null && value !== undefined)
    .map(([key, value]) => ({ key, value }))
})

// Unique key for tab groups to force re-render
const tabKey = computed(() => {
  return selectedEntry.value ? `with_entry_${selectedEntry.value.id}` : 'no_entry'
})

// Methods
const selectEntry = (entry) => {
  console.log('Selecting entry:', entry.id)
  
  // If drawer is open, close it first
  if (isDrawerOpen.value) {
    console.log('Closing drawer first...')
    isDrawerOpen.value = false
    selectedEntry.value = null
    
    // Wait for the close animation, then select new entry
    setTimeout(() => {
      console.log('Opening drawer with new entry:', entry.id)
      selectedEntry.value = entry
      isDrawerOpen.value = true
    }, 300)
  } else {
    // If drawer is closed, select entry and open immediately
    selectedEntry.value = entry
    isDrawerOpen.value = true
  }
}

const closeDrawer = () => {
  console.log('Closing drawer')
  isDrawerOpen.value = false
  // Clear selection after a short delay
  setTimeout(() => {
    selectedEntry.value = null
  }, 300)
}

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}

const handleBackgroundClick = (event) => {
  // Only close if clicking on the background (not on any child elements)
  if (event.target === event.currentTarget && isDrawerOpen.value) {
    closeDrawer()
  }
}

const formatKey = (key) => {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
}

const formatValue = (value) => {
  if (Array.isArray(value)) {
    return value.join(', ')
  }
  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2)
  }
  return String(value)
}
</script>

<style>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>