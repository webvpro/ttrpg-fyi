<template>
  <div class="drawer lg:drawer-open">
    <!-- Drawer toggle (hidden checkbox) -->
    <input id="collection-drawer" type="checkbox" class="drawer-toggle" />
    
    <!-- Main content -->
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="navbar bg-base-300">
        <div class="flex-none lg:hidden">
          <label for="collection-drawer" class="btn btn-square btn-ghost">
            <Icon icon="mdi:menu" class="w-6 h-6" />
          </label>
        </div> 
        <div class="flex-1">
          <h1 class="text-xl font-bold">{{ computedPageTitle }}</h1>
        </div>
      </div>
      
      <!-- Main content area -->
      <div class="flex-1 p-4">
        <!-- Debug info (only in development) -->
        <div v-if="showDebug" class="alert alert-warning text-warning-content mb-4">
          <Icon icon="mdi:alert-outline" class="w-6 h-6 shrink-0" />
          <div>
            <h3 class="font-bold">Debug Info</h3>
            <div class="text-xs">Found {{ entries.length }} {{ formattedCollectionName }}</div>
            <div v-if="entries.length === 0" class="text-xs text-error">
              No {{ formattedCollectionName }} found! Check collection configuration.
            </div>
            <div v-if="Array.isArray(rules) && rules.length > 0" class="text-xs mt-2">
              <strong>Rules:</strong> {{ rules.length }} rule(s) available
              <div class="text-xs text-success">✓ Rule content available for tabs</div>
            </div>
            <div v-else-if="rules?.rendered?.html" class="text-xs mt-2">
              <strong>Rule:</strong> {{ rules.data?.title || 'Single rule' }}
              <div class="text-xs text-success">✓ Rule content available</div>
            </div>
            <div v-else class="text-xs mt-2 text-warning">⚠ No rule content</div>
          </div>
        </div>

        <!-- Rules content in tabs (always show if rules available) -->
        <div v-if="Array.isArray(rules) && rules.length > 0" class="card bg-base-100 shadow-xl mb-4">
          <div class="card-body">
            <div class="alert alert-info mb-4">
              <Icon icon="mdi:book-open-variant" class="w-5 h-5" />
              <span class="text-sm font-semibold">Related Rules ({{ rules.length }})</span>
            </div>
            
            <div class="overflow-x-auto">
              <div class="tabs-lift tabs min-w-max">
                <template v-for="(rule, index) in rules" :key="rule.id || index">
                  <input 
                    type="radio" 
                    :name="`rule_tabs_${tabKey}`" 
                    class="tab z-1" 
                    :aria-label="rule.data?.title || rule.id || `Rule ${index + 1}`"
                    :checked="!selectedEntry && index === 0"
                  />
                  <div class="sticky start-0 tab-content border-base-300 bg-base-100 p-6">
                    <h3 class="font-bold text-lg mb-4">{{ rule.data?.title || rule.id || `Rule ${index + 1}` }}</h3>
                    <div 
                      v-if="rule.rendered?.html" 
                      class="prose prose-sm md:prose-base max-w-none" 
                      v-html="rule.rendered.html"
                    ></div>
                    <div v-else class="text-gray-500 italic">No content available for this rule.</div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Single rule content (if single rule object) -->
        <div v-else-if="rules?.rendered?.html" class="card bg-base-100 shadow-xl mb-4">
          <div class="card-body">
            <div class="alert alert-info mb-4">
              <Icon icon="mdi:book-open-variant" class="w-5 h-5" />
              <span class="text-sm font-semibold">Rule: {{ rules.data?.title || collectionName }}</span>
            </div>
            <div class="prose prose-sm md:prose-base lg:prose-lg max-w-none" v-html="rules.rendered.html"></div>
          </div>
        </div>

        <!-- Selected item details -->
        <div v-if="selectedEntry" class="card bg-base-100 shadow-xl mb-4">
          <div class="card-body">
            <h2 class="card-title">{{ selectedEntry.title || selectedEntry.id }}</h2>
            
            <!-- Entry content tabs (for entry details and additional info) -->
            <div class="overflow-x-auto">
              <div class="tabs-lift tabs min-w-max">
                <!-- Entry Content Tab -->
                <input 
                  type="radio" 
                  :name="`content_tabs_${selectedEntry.id}`" 
                  class="tab z-1" 
                  aria-label="Entry Details"
                  checked="checked"
                />
                <div class="sticky start-0 tab-content border-base-300 bg-base-100 p-6">
                  <h3 class="font-bold text-lg mb-4">Entry Details</h3>
                  <!-- Markdown content from the entry itself -->
                  <div v-if="selectedEntry.rendered?.html" class="prose prose-sm md:prose-base lg:prose-lg max-w-none" v-html="selectedEntry.rendered.html"></div>
                  <!-- Fallback to description if no rendered content -->
                  <div v-else-if="selectedEntry.description" class="mt-4">
                    <p class="text-gray-600 opacity-70">{{ selectedEntry.description }}</p>
                  </div>
                  <div v-else class="text-gray-500 italic">No content available for this entry.</div>
                </div>

                <!-- Properties Tab (if additional properties exist) -->
                <template v-if="additionalProperties.length > 0">
                  <input 
                    type="radio" 
                    :name="`content_tabs_${selectedEntry.id}`" 
                    class="tab z-1" 
                    aria-label="Properties"
                  />
                  <div class="sticky start-0 tab-content border-base-300 bg-base-100 p-6">
                    <h3 class="font-bold text-lg mb-4">Properties</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div v-for="prop in additionalProperties" :key="prop.key" class="flex justify-between p-3 bg-base-200 rounded">
                        <span class="font-medium">{{ formatKey(prop.key) }}:</span>
                        <span class="text-right">{{ formatValue(prop.value) }}</span>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            
            <div class="card-actions justify-end mt-6">
              <a 
                :href="`/compendium/csrd/${folderName}/${selectedEntry.id.toLowerCase()}`" 
                class="btn btn-primary"
              >
                View Full Page
              </a>
              <button @click="clearSelection" class="btn btn-outline">Close</button>
            </div>
          </div>
        </div>

        <!-- No entries found -->
        <div v-else-if="entries.length === 0" class="alert alert-error">
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

        <!-- Placeholder when no item selected -->
        <div v-else class="hero min-h-[50vh] bg-base-200 rounded-lg">
          <div class="hero-content text-center">
            <div class="max-w-md">
              <h1 class="text-5xl font-bold">{{ computedPageTitle }}</h1>
              <p class="py-6">{{ computedPageDescription }}</p>
              <p class="text-gray-600 opacity-70">Select an item from the sidebar to view details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Drawer sidebar -->
    <div class="drawer-side">
      <label for="collection-drawer" class="drawer-overlay"></label>
      <aside class="w-80 min-h-full bg-base-200">
        <!-- Sidebar header -->
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
            class="input input-sm w-full"
          />
        </div>
        
        <!-- Entries list -->
        <ul class="menu p-0">
          <li v-for="entry in filteredEntries" :key="entry.id">
            <a 
              @click="selectEntry(entry)"
              class="flex justify-between items-center"
              :class="{ 'active bg-primary text-primary-content': selectedEntry?.id === entry.id }"
            >
              <span class="flex-1 truncate">{{ entry.title || entry.id }}</span>
              <Icon icon="mdi:chevron-right" class="w-4 h-4" />
            </a>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

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
  selectedEntry.value = entry
  // Close drawer on mobile after selection
  if (window.innerWidth < 1024) {
    document.getElementById('collection-drawer').checked = false
  }
}

const clearSelection = () => {
  selectedEntry.value = null
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
/* No custom styles needed - use classes in template instead */
</style>