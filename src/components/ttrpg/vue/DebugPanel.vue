<template>
  <div v-if="show" class="collapse collapse-arrow bg-warning/10 border border-warning/30 mb-4">
    <input type="checkbox" class="collapse-toggle" /> 
    <div class="collapse-title text-lg font-bold text-warning-content hover:bg-warning/20 cursor-pointer">
      {{ title }}
    </div>
    <div class="collapse-content bg-warning/5"> 
      <div class="space-y-4 pt-4">
        <!-- Data Type Check -->
        <div class="bg-base-100 p-3 rounded border border-base-300">
          <h4 class="font-semibold text-sm mb-2 text-base-content">Data Type:</h4>
          <div class="text-xs font-mono bg-base-200 p-2 rounded text-base-content">
            {{ typeof data }} - {{ Array.isArray(data) ? 'Array' : getDataType(data) }}
          </div>
        </div>

        <!-- Data Content -->
        <div class="bg-base-100 p-3 rounded border border-base-300">
          <h4 class="font-semibold text-sm mb-2 text-base-content">Data Content:</h4>
          <div class="text-xs font-mono bg-base-200 p-2 rounded max-h-40 overflow-y-auto text-base-content">
            <pre>{{ JSON.stringify(data, null, 2) }}</pre>
          </div>
        </div>

        <!-- Data Keys/Length -->
        <div class="bg-base-100 p-3 rounded border border-base-300">
          <h4 class="font-semibold text-sm mb-2 text-base-content">Data Keys/Length:</h4>
          <div class="text-xs font-mono bg-base-200 p-2 rounded text-base-content">
            <div v-if="Array.isArray(data)">
              Array Length: {{ data.length }}
            </div>
            <div v-else-if="typeof data === 'object' && data !== null">
              Object Keys: {{ Object.keys(data).join(', ') }}
              <br>
              Keys Count: {{ Object.keys(data).length }}
            </div>
            <div v-else>
              Not an object or array
            </div>
          </div>
        </div>

        <!-- Individual Items (if object/array) -->
        <div v-if="showIndividualItems && (typeof data === 'object' && data !== null)" class="bg-base-100 p-3 rounded border border-base-300">
          <h4 class="font-semibold text-sm mb-2 text-base-content">Individual Items:</h4>
          <div class="space-y-2 max-h-60 overflow-y-auto">
            <div v-for="(item, key) in data" :key="key" class="text-xs bg-base-200 p-2 rounded border border-base-300">
              <div class="font-semibold text-base-content">{{ key }}:</div>
              <div class="mt-1">
                <div v-if="typeof item === 'object' && item !== null">
                  <div v-for="(value, prop) in getDisplayProps(item)" :key="prop" class="mb-1 text-base-content/80">
                    <strong class="text-primary">{{ formatKey(prop) }}:</strong> {{ formatValue(value) }}
                  </div>
                </div>
                <div v-else class="text-base-content/80">
                  <strong class="text-primary">Value:</strong> {{ formatValue(item) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Props -->
        <div v-for="(value, key) in additionalProps" :key="key" class="bg-base-100 p-3 rounded border border-base-300">
          <h4 class="font-semibold text-sm mb-2 text-base-content">{{ formatKey(key) }}:</h4>
          <div class="text-xs font-mono bg-base-200 p-2 rounded text-base-content">
            {{ formatValue(value) }}
          </div>
        </div>

        <!-- Custom Slots -->
        <slot name="additional-debug"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Main data to debug
  data: {
    type: [Object, Array, String, Number, Boolean],
    default: null
  },
  // Panel title
  title: {
    type: String,
    default: 'Debug Panel'
  },
  // Whether to show the panel
  show: {
    type: Boolean,
    default: false
  },
  // Whether to show individual items breakdown
  showIndividualItems: {
    type: Boolean,
    default: true
  },
  // Additional props to display
  additionalProps: {
    type: Object,
    default: () => ({})
  },
  // Properties to highlight in individual items
  highlightProps: {
    type: Array,
    default: () => ['id', 'title', 'name', 'type', 'description']
  }
})

// Helper methods
const getDataType = (data) => {
  if (data === null) return 'null'
  if (data === undefined) return 'undefined'
  if (typeof data === 'object') return 'Object'
  return typeof data
}

const formatKey = (key) => {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
}

const formatValue = (value) => {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (Array.isArray(value)) return `[${value.length} items]`
  if (typeof value === 'object') return '{object}'
  if (typeof value === 'string' && value.length > 50) {
    return value.substring(0, 50) + '...'
  }
  return String(value)
}

const getDisplayProps = (item) => {
  if (!item || typeof item !== 'object') return {}
  
  // First, get highlighted props
  const highlighted = {}
  props.highlightProps.forEach(prop => {
    if (item.hasOwnProperty(prop)) {
      highlighted[prop] = item[prop]
    }
  })
  
  // Then add other props (limited to avoid clutter)
  const otherProps = Object.keys(item)
    .filter(key => !props.highlightProps.includes(key))
    .slice(0, 5) // Limit to 5 additional props
    .reduce((acc, key) => {
      acc[key] = item[key]
      return acc
    }, {})
  
  return { ...highlighted, ...otherProps }
}
</script>