<template>
  <div class="relative">
    <!-- Main content (always visible) -->
    <div class="flex flex-col">
      <!-- Navbar -->
      <div class="navbar bg-neutral">
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
        <div class="p-4 border-b border-gray-300 dark:border-gray-600">
          <h2 class="text-lg font-semibold">{{ formattedCollectionName }} List</h2>
          <p class="text-sm opacity-70">
            {{ filteredEntries.length }} of {{ entries.length }} items
            <span v-if="filteredEntries.length !== entries.length" class="text-primary">(filtered)</span>
          </p>
        </div>
        
        <!-- Search Bar (moved outside of filters) -->
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="relative max-w-md">
            <input 
              :value="searchTerm"
              @input="searchTerm = $event.target.value"
              type="text" 
              placeholder="Search items..." 
              class="input input-bordered input-sm w-full pl-10 pr-8"
            />
            <Icon icon="mdi:magnify" class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
            <button 
              v-if="searchTerm"
              @click="searchTerm = ''"
              class="btn btn-xs btn-ghost btn-circle absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Icon icon="mdi:close" class="w-3 h-3" />
            </button>
          </div>
        </div>
        
        <!-- Filters Component (search removed) -->
        <div class="p-4">
          <ItemFilters 
            :items="entries"
            :search-term="searchTerm"
            :filterable-properties="entriesFilters"
            @update:search-term="searchTerm = $event"
            @update:filters="activeFilters = $event"
            @filtered-items="filteredEntries = $event"
          />
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
          <GridList 
            :entries="filteredEntries"
            :selected-entry="selectedEntry"
            :collection-name="collectionName"
            :show-metadata="showDebug"
            :filterable-properties="entriesFilters"
            @select-entry="selectEntry"
          >
            <!-- Custom card content slot -->
            <template #card-content="{ entry }">
              <div v-if="showDebug" class="text-xs opacity-50 mt-2">
                <div>Type: {{ getEntryType(entry) }}</div>
                <div v-if="entry.rendered">Has Content: ✅</div>
              </div>
            </template>
            
            <!-- Custom metadata slot -->
            <template #card-metadata="{ entry }">
              <span>{{ entry.id }}</span>
              <span v-if="entry.level" class="ml-2">Lvl {{ entry.level }}</span>
            </template>
          </GridList>
        </div>
        <!-- Debug Panel for Entries -->
        <div class="m-4">
          <DebugPanel 
            :data="entries"
            :show="showDebug"
            title="Collection Entries Debug"
            :additional-props="{
              'Collection Name': formattedCollectionName,
              'Filtered Count': filteredEntries.length,
              'Search Term': searchTerm || 'None',
              'Active Filters': Object.keys(activeFilters).length,
              'Selected Entry': selectedEntry?.id || 'None',
              'Drawer Open': isDrawerOpen
            }"
            :highlight-props="['id', 'title', 'description', 'rendered']"
          >
            <template #additional-debug>
              <div class="bg-white dark:bg-gray-800 p-3 rounded border border-gray-300 dark:border-gray-600">
                <h4 class="font-semibold text-sm mb-2">Entry Status:</h4>
                <div class="text-xs font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  <div v-if="entries.length === 0" class="text-red-500">
                    ⚠️ No {{ formattedCollectionName }} found! Check collection configuration.
                  </div>
                  <div v-else class="text-green-500">
                    ✅ Found {{ entries.length }} {{ formattedCollectionName }}
                  </div>
                  <div class="mt-2">
                    Filtered entries: {{ filteredEntries.length }} / {{ entries.length }}
                  </div>
                  <div v-if="Object.keys(activeFilters).length > 0" class="mt-2">
                    Active filters: {{ JSON.stringify(activeFilters, null, 2) }}
                  </div>
                </div>
              </div>
            </template>
          </DebugPanel>
        </div>
      </div>
    </div>
    
    <!-- Floating sidebar (positioned absolutely) -->
    <div 
      v-show="selectedEntry && isDrawerOpen"
      ref="sidebarRef"
      class="fixed top-0 right-0 w-96 h-full bg-gray-100 dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out"
    >
      <!-- Backdrop/overlay for mobile -->
      <div 
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        @click="closeDrawer"
      ></div>
      
      <!-- Sidebar content -->
      <div class="relative h-full flex flex-col z-50">
        <!-- Header -->
        <div class="p-4 border-b border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700">
          <div class="flex justify-between items-start">
            <h2 class="text-lg font-semibold">{{ selectedEntry?.title || selectedEntry?.id }}</h2>
            <button @click="closeDrawer" class="btn btn-sm btn-ghost">
              <Icon icon="mdi:close" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-4">
          <!-- Debug Panel for Selected Entry -->
          <DebugPanel 
            v-if="selectedEntry"
            :data="selectedEntry"
            :show="showDebug"
            title="Selected Entry Debug"
            :additional-props="{
              'Entry ID': selectedEntry.id,
              'Has Rendered Content': !!selectedEntry.rendered?.html,
              'Additional Props Count': additionalProperties.length
            }"
            :highlight-props="['id', 'title', 'description', 'rendered']"
          />

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
              <p class="opacity-70">{{ selectedEntry.description }}</p>
            </div>
            <div v-else class="opacity-50 italic">No content available for this entry.</div>
          </div>

          <!-- Additional Properties (if any) -->
          <div v-if="additionalProperties.length > 0" class="mb-4">
            <h3 class="font-bold text-base mb-3">Properties</h3>
            <div class="space-y-2">
              <div v-for="prop in additionalProperties" :key="prop.key" class="flex flex-col p-3 bg-white dark:bg-gray-900 rounded">
                <span class="font-medium text-sm">{{ formatKey(prop.key) }}</span>
                <span class="text-sm mt-1">{{ formatValue(prop.value) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="p-4 border-t border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700" v-if="selectedEntry">
          <div class="flex flex-col gap-2">
            <a 
              :href="`/compendium/csrd/${folderName}/${selectedEntry.id.toLowerCase()}`" 
              class="btn btn-primary btn-sm"
            >
              <Icon icon="mdi:file-document-outline" class="w-4 h-4 mr-2" />
              View Full Page
            </a>
            <button @click="closeDrawer" class="btn btn-outline btn-sm">
              <Icon icon="mdi:close" class="w-4 h-4 mr-2" />
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Icon } from '@iconify/vue'
import RelatedRules from './RelatedRules.vue'
import DebugPanel from './DebugPanel.vue'
import GridList from './GridList.vue'
import ItemFilters from './ItemFilters.vue'

// Props
const props = defineProps({
  entries: {
    type: Array,
    required: true,
    default: () => []
  },
  entriesFilters: {
    type: Array,
    required: false,
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
const activeFilters = ref({})
const filteredEntries = ref([])
const isDrawerOpen = ref(false)
const sidebarRef = ref(null)

// Check if we're in the browser
const isBrowser = typeof window !== 'undefined'

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
  
  // Update URL hash when selecting an entry (only in browser)
  if (isBrowser) {
    window.history.replaceState(null, null, `#${entry.id}`)
  }
  
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
  
  // Clear the URL hash when closing (only in browser)
  if (isBrowser) {
    window.history.replaceState(null, null, window.location.pathname)
  }
  
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

const checkUrlHash = () => {
  // Only run in browser
  if (!isBrowser) return
  
  const hash = window.location.hash.slice(1) // Remove the # symbol
  
  if (hash && props.entries.length > 0) {
    console.log('Hash found in URL:', hash)
    
    // Try to find entry by exact ID match first
    let entry = props.entries.find(e => e.id.toLowerCase() === hash.toLowerCase())
    
    // If not found, try to find by title match
    if (!entry) {
      entry = props.entries.find(e => 
        (e.title || e.id).toLowerCase().replace(/\s+/g, '-') === hash.toLowerCase()
      )
    }
    
    // If still not found, try partial matches
    if (!entry) {
      entry = props.entries.find(e => 
        e.id.toLowerCase().includes(hash.toLowerCase()) ||
        (e.title && e.title.toLowerCase().includes(hash.toLowerCase()))
      )
    }
    
    if (entry) {
      console.log('Found entry for hash:', entry.id)
      selectedEntry.value = entry
      isDrawerOpen.value = true
    } else {
      console.log('No entry found for hash:', hash)
    }
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

// Helper method for GridList
const getEntryType = (entry) => {
  if (entry.type) return entry.type
  if (entry.category) return entry.category
  if (entry.level) return `Level ${entry.level}`
  return 'Item'
}

// Lifecycle hooks
onMounted(() => {
  // Only run in browser
  if (!isBrowser) return
  
  // Check for hash in URL when component mounts
  checkUrlHash()
  
  // Listen for hash changes (browser back/forward)
  window.addEventListener('hashchange', checkUrlHash)
})

// Clean up event listener
onUnmounted(() => {
  // Only run in browser
  if (!isBrowser) return
  
  window.removeEventListener('hashchange', checkUrlHash)
})

// Watch for entries prop changes (in case entries load after component mounts)
watch(() => props.entries, (newEntries) => {
  if (newEntries.length > 0) {
    checkUrlHash()
  }
}, { immediate: true })
</script>

<style>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>