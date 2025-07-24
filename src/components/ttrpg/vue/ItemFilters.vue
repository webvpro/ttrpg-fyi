<template>
  <div class="card bg-base-100 border border-base-300 mb-4">
    <!-- Filter Header (Always Visible) -->
    <div class="card-body p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="card-title text-lg">Filters</h3>
        
        <div class="flex items-center gap-2">
          <!-- Filter Summary -->
          <div v-if="hasActiveFilters" class="flex items-center gap-2">
            <span class="text-xs font-medium text-base-content/70">
              {{ totalActiveFilterCount }} filter{{ totalActiveFilterCount !== 1 ? 's' : '' }}
            </span>
          </div>
          
          <!-- Clear All Button (visible when filters active) -->
          <button 
            v-if="hasActiveFilters"
            @click="clearAllFilters" 
            class="btn btn-xs btn-outline btn-error"
            title="Clear all filters"
          >
            <Icon icon="mdi:filter-off" class="w-3 h-3 mr-1" />
            Clear All
          </button>
        </div>
      </div>

      <!-- Filter Group Tabs -->
      <div v-if="filterGroups.length > 0" class="w-full">
        <!-- Tab Headers -->
        <div class="tabs tabs-bordered mb-4">
          <button
            v-for="(filterGroup, index) in filterGroups" 
            :key="`tab-${filterGroup.property}`"
            class="tab"
            :class="{ 'tab-active': activeTabIndex === index }"
            @click="setActiveTab(index)"
          >
            {{ formatPropertyName(filterGroup.property) }}
            <span class="badge badge-sm ml-2">{{ filterGroup.values.length }}</span>
            <span 
              v-if="getActiveFilterCount(filterGroup.property) > 0"
              class="badge badge-primary badge-xs ml-1"
            >
              {{ getActiveFilterCount(filterGroup.property) }}
            </span>
          </button>
        </div>
        
        <!-- Tab Content Panel -->
        <div class="bg-base-100 border border-base-300 rounded-lg p-4">
          <div v-if="activeFilterGroup">
            <!-- Filter Group Header -->
            <div class="flex items-center justify-between mb-4">
              <!-- Quick actions for this filter group -->
              <div class="flex items-center gap-2">
                <span 
                  v-if="getActiveFilterCount(activeFilterGroup.property) > 0"
                  class="badge badge-primary badge-sm"
                >
                  {{ getActiveFilterCount(activeFilterGroup.property) }} selected
                </span>
                <button 
                  v-if="getActiveFilterCount(activeFilterGroup.property) > 0"
                  @click="clearPropertyFilters(activeFilterGroup.property)"
                  class="btn btn-xs btn-ghost btn-circle"
                  title="Clear this filter"
                >
                  <Icon icon="mdi:close" class="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <!-- Filter Options for Active Tab -->
            <div class="max-h-64 overflow-y-auto">
              <div class="grid grid-cols-1 gap-2">
                <label 
                  v-for="value in activeFilterGroup.values" 
                  :key="value.value"
                  class="flex items-center gap-3 cursor-pointer hover:bg-base-200 p-3 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    :checked="isFilterActive(activeFilterGroup.property, value.value)"
                    @change="toggleFilter(activeFilterGroup.property, value.value, $event.target.checked)"
                    class="checkbox checkbox-sm checkbox-primary"
                  />
                  <span class="label-text flex-1 font-medium">{{ formatFilterValue(value.value) }}</span>
                  <span class="badge badge-outline badge-sm text-base-content/70">
                    {{ value.count }}
                  </span>
                </label>
              </div>
            </div>
          </div>
          
          <!-- Empty state -->
          <div v-else class="text-center py-8 text-base-content/50">
            <Icon icon="mdi:filter-outline" class="w-12 h-12 mx-auto mb-2" />
            <p>No filter options available</p>
          </div>
        </div>
      </div>

      <!-- Active filters summary -->
      <div v-if="hasActiveFilters" class="mt-6 pt-4 border-t border-base-300">
        <div class="flex items-center justify-between mb-3">
          <h4 class="text-sm font-bold text-base-content">Active Filters</h4>
          <span class="text-xs text-base-content/70">{{ totalActiveFilterCount }} total</span>
        </div>
        
        <div class="flex flex-wrap gap-2">
          <div 
            v-for="(values, property) in activeFilters" 
            :key="property"
            class="flex flex-wrap gap-2"
          >
            <span 
              v-for="value in values"
              :key="`${property}-${value}`"
              class="badge badge-primary gap-2 cursor-pointer hover:badge-primary-focus transition-colors"
              @click="removeFilter(property, value)"
              :title="`Remove ${formatPropertyName(property)}: ${formatFilterValue(value)}`"
            >
              <span class="text-xs">{{ formatPropertyName(property) }}: {{ formatFilterValue(value) }}</span>
              <Icon icon="mdi:close" class="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  searchTerm: {
    type: String,
    default: ''
  },
  filterableProperties: {
    type: Array,
    default: () => ['categories', 'level']
  },
  maxFilterValues: {
    type: Number,
    default: 20
  }
})

const emit = defineEmits(['update:searchTerm', 'update:filters', 'filtered-items'])

// Reactive state
const activeFilters = ref({})
const activeTabIndex = ref(0)

// Computed properties using Composition API
const filterGroups = computed(() => {
  const groups = []
  
  for (const property of props.filterableProperties) {
    const valueMap = new Map()
    
    // Count occurrences of each value for this property
    for (const item of props.items) {
      const value = item[property]
      if (value === null || value === undefined) continue
      
      // Handle arrays (like tags, categories)
      if (Array.isArray(value)) {
        for (const arrayValue of value) {
          if (arrayValue) {
            const count = valueMap.get(arrayValue) || 0
            valueMap.set(arrayValue, count + 1)
          }
        }
      } else if (value !== '') {
        const count = valueMap.get(value) || 0
        valueMap.set(value, count + 1)
      }
    }
    
    if (valueMap.size > 0) {
      // Convert to array and sort by count (descending)
      const values = Array.from(valueMap.entries())
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, props.maxFilterValues)
      
      groups.push({
        property,
        values
      })
    }
  }
  
  return groups
})

const activeFilterGroup = computed(() => {
  return filterGroups.value[activeTabIndex.value] || null
})

const hasActiveFilters = computed(() => {
  return Object.keys(activeFilters.value).length > 0
})

const totalActiveFilterCount = computed(() => {
  return Object.values(activeFilters.value).flat().length
})

const filteredItems = computed(() => {
  let filtered = props.items
  
  // Apply search filter
  if (props.searchTerm) {
    filtered = filtered.filter(item => {
      const title = item.title || item.id || ''
      const description = item.description || ''
      const searchText = `${title} ${description}`.toLowerCase()
      return searchText.includes(props.searchTerm.toLowerCase())
    })
  }
  
  // Apply property filters
  for (const [property, filterValues] of Object.entries(activeFilters.value)) {
    if (filterValues.length === 0) continue
    
    filtered = filtered.filter(item => {
      const itemValue = item[property]
      
      if (Array.isArray(itemValue)) {
        // For arrays, check if any of the item's values match any filter value
        return itemValue.some(value => filterValues.includes(value))
      } else {
        // For single values, check direct match
        return filterValues.includes(itemValue)
      }
    })
  }
  
  return filtered
})

// Methods using Composition API
const setActiveTab = (index) => {
  activeTabIndex.value = index
}

const isFilterActive = (property, value) => {
  return activeFilters.value[property]?.includes(value) || false
}

const getActiveFilterCount = (property) => {
  return activeFilters.value[property]?.length || 0
}

const toggleFilter = (property, value, isChecked) => {
  if (!activeFilters.value[property]) {
    activeFilters.value[property] = []
  }
  
  if (isChecked) {
    if (!activeFilters.value[property].includes(value)) {
      activeFilters.value[property].push(value)
    }
  } else {
    activeFilters.value[property] = activeFilters.value[property].filter(v => v !== value)
    if (activeFilters.value[property].length === 0) {
      delete activeFilters.value[property]
    }
  }
  
  emitFilters()
}

const removeFilter = (property, value) => {
  if (activeFilters.value[property]) {
    activeFilters.value[property] = activeFilters.value[property].filter(v => v !== value)
    if (activeFilters.value[property].length === 0) {
      delete activeFilters.value[property]
    }
    emitFilters()
  }
}

const clearPropertyFilters = (property) => {
  if (activeFilters.value[property]) {
    delete activeFilters.value[property]
    emitFilters()
  }
}

const clearAllFilters = () => {
  activeFilters.value = {}
  emitFilters()
}

const formatPropertyName = (property) => {
  return property.charAt(0).toUpperCase() + property.slice(1).replace(/([A-Z])/g, ' $1')
}

const formatFilterValue = (value) => {
  if (typeof value === 'string' && value.includes('/')) {
    // For values like "Content/Modern Magic Artifacts", show just the part after the last slash
    return value.split('/').pop()
  }
  return String(value)
}

const emitFilters = () => {
  emit('update:filters', { ...activeFilters.value })
}

// Watchers using Composition API
watch(filteredItems, (newFilteredItems) => {
  emit('filtered-items', newFilteredItems)
}, { immediate: true })

// Reset active tab if filter groups change and current tab is out of bounds
watch(filterGroups, (newGroups) => {
  if (activeTabIndex.value >= newGroups.length) {
    activeTabIndex.value = Math.max(0, newGroups.length - 1)
  }
}, { immediate: true })
</script>

<style scoped>
@reference "../../../styles/global.css";

/* Custom tab styling */
.tabs .tab {
  @apply flex-1 text-center relative;
}

.tabs .tab-active {
  @apply border-primary text-primary bg-primary/10;
}

/* Smooth transitions */
.transition-colors {
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

/* Custom hover states for badges */
.badge:hover {
  @apply scale-105;
}

/* Tab hover states */
.tab:hover:not(.tab-active) {
  @apply bg-base-200;
}

/* Custom scrollbar for filter options */
.max-h-64::-webkit-scrollbar {
  width: 6px;
}

.max-h-64::-webkit-scrollbar-track {
  @apply bg-base-200 rounded;
}

.max-h-64::-webkit-scrollbar-thumb {
  @apply bg-base-content/20 rounded;
}

.max-h-64::-webkit-scrollbar-thumb:hover {
  @apply bg-base-content/40;
}
</style>