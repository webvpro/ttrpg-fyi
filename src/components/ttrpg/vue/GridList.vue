<template>
  <div class="grid-list">
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
        v-for="entry in entries" 
        :key="entry.id"
        class="card bg-base-100 shadow hover:shadow-lg transition-shadow cursor-pointer"
        :class="{ 
          'ring-2 ring-primary': selectedEntry?.id === entry.id,
          'hover:ring-1 hover:ring-primary/50': selectedEntry?.id !== entry.id
        }"
        @click="handleCardClick(entry)"
      >
        <div class="card-body p-4">
          <h3 class="card-title text-base">{{ entry.title || entry.id }}</h3>
          <p v-if="entry.description" class="text-sm text-base-content/70 line-clamp-3">
            {{ entry.description }}
          </p>
          
          <!-- Optional slot for additional card content -->
          <slot name="card-content" :entry="entry"></slot>
          
          <!-- Card footer with metadata -->
          <div v-if="showMetadata" class="card-actions justify-between items-center mt-2">
            <div class="text-xs text-base-content/50">
              <slot name="card-metadata" :entry="entry">
                ID: {{ entry.id }}
              </slot>
            </div>
            <div class="badge badge-outline badge-xs">
              {{ getEntryType(entry) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  // Array of entries to display
  entries: {
    type: Array,
    required: true,
    default: () => []
  },
  // Currently selected entry
  selectedEntry: {
    type: Object,
    default: null
  },
  // Collection name for formatting
  collectionName: {
    type: String,
    default: ''
  },
  // Whether to show metadata in cards
  showMetadata: {
    type: Boolean,
    default: false
  },
  // Custom grid classes
  gridClasses: {
    type: String,
    default: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
  },
  // Custom card classes
  cardClasses: {
    type: String,
    default: 'card bg-base-100 shadow hover:shadow-lg transition-shadow cursor-pointer'
  }
})

const emit = defineEmits(['select-entry', 'card-click'])

// Computed properties
const formattedCollectionName = computed(() => {
  if (!props.collectionName) return 'Items'
  return props.collectionName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
})

// Methods
const handleCardClick = (entry) => {
  emit('select-entry', entry)
  emit('card-click', entry)
}

const getEntryType = (entry) => {
  // Try to determine entry type from various properties
  if (entry.type) return entry.type
  if (entry.category) return entry.category
  if (entry.level) return `Level ${entry.level}`
  return 'Item'
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