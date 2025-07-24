<template>
  <div class="related-rules">
    <!-- Debug Panel -->
    <DebugPanel 
      :data="rules"
      :show="showDebug"
      title="Rules Collection Debug"
      :additional-props="{
        'Collection Name': collectionName,
        'Tab Key': tabKey,
        'Rules Array Length': rulesArray.length
      }"
      :highlight-props="['id', 'title', 'rendered', 'description', 'rulesRef']"
    >
      <template #additional-debug>
        <!-- Custom debug info specific to rules -->
        <div class="bg-base-100 p-3 rounded border border-base-300">
          <h4 class="font-semibold text-sm mb-2 text-base-content">Rules Array Status:</h4>
          <div class="text-xs font-mono bg-base-200 p-2 rounded text-base-content">
            Converted to array: {{ rulesArray.length }} items
          </div>
        </div>
      </template>
    </DebugPanel>

    <!-- Related Rules Section with DaisyUI Collapse -->
    <div v-if="rulesArray.length > 0" class="collapse collapse-plus bg-base-100 border border-base-300 mb-4">
      <input type="checkbox" class="collapse-toggle" checked /> 
      <div class="collapse-title text-lg font-semibold text-base-content hover:bg-base-200 cursor-pointer">
        Related Rules ({{ rulesArray.length }})
      </div>
      <div class="collapse-content bg-base-50"> 
        <div class="pt-4">
          <GridList 
            :entries="rulesArray"
            :selected-entry="selectedRule"
            collection-name="rules"
            :show-metadata="false"
            grid-classes="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            card-classes="card bg-base-100 shadow hover:shadow-lg transition-shadow cursor-pointer"
            @select-entry="handleRuleSelect"
          >
            <!-- Custom card content for rules (simplified like entries) -->
            <template #card-content="{ entry }">
              <div v-if="showDebug" class="text-xs text-base-content/50 mt-2">
                <div>Type: Rule</div>
                <div v-if="entry.rendered?.html">Has Content: ✅</div>
                <div v-if="entry.rulesRef?.length">Refs: {{ entry.rulesRef.length }}</div>
              </div>
            </template>
            
            <!-- Custom metadata for rules -->
            <template #card-metadata="{ entry }">
              <span>{{ entry.id }}</span>
              <span v-if="entry.rulesRef?.length" class="ml-2">{{ entry.rulesRef.length }} refs</span>
            </template>
          </GridList>
        </div>
      </div>
    </div>

    <!-- No rules found -->
    <div v-else class="alert alert-info">
      <Icon icon="mdi:information-outline" class="w-6 h-6 shrink-0" />
      <span>No related rules found for this collection.</span>
    </div>

    <!-- Rule Details Drawer -->
    <div 
      v-show="selectedRule && isRuleDrawerOpen"
      class="fixed top-0 left-0 w-96 h-full bg-base-200 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out"
    >
      <!-- Backdrop/overlay for mobile -->
      <div 
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        @click="closeRuleDrawer"
      ></div>
      
      <!-- Sidebar content -->
      <div class="relative h-full flex flex-col z-50">
        <!-- Header -->
        <div class="p-4 border-b border-base-300 bg-base-300">
          <div class="flex justify-between items-start">
            <h2 class="text-lg font-semibold">{{ selectedRule?.title || selectedRule?.id }}</h2>
            <button @click="closeRuleDrawer" class="btn btn-sm btn-ghost">
              <Icon icon="mdi:close" class="w-4 h-4" />
            </button>
          </div>
          <div class="text-sm text-base-content/70 mt-1">Rule</div>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-4">
          <!-- Debug Panel for Selected Rule -->
          <DebugPanel 
            v-if="selectedRule"
            :data="selectedRule"
            :show="showDebug"
            title="Selected Rule Debug"
            :additional-props="{
              'Rule ID': selectedRule.id,
              'Has Rendered Content': !!selectedRule.rendered?.html,
              'Rules References': selectedRule.rulesRef?.length || 0
            }"
            :highlight-props="['id', 'title', 'description', 'rendered', 'rulesRef']"
          />

          <!-- Rule content -->
          <div class="mb-4" v-if="selectedRule">
            <!-- Markdown content from the rule itself -->
            <div 
              v-if="selectedRule.rendered?.html" 
              class="prose prose-sm max-w-none" 
              v-html="selectedRule.rendered.html"
            ></div>
            <!-- Fallback to description if no rendered content -->
            <div v-else-if="selectedRule.description" class="mb-4">
              <p class="text-base-content/70">{{ selectedRule.description }}</p>
            </div>
            <div v-else class="text-base-content/50 italic">No content available for this rule.</div>
          </div>

          <!-- Rule References (if any) -->
          <div v-if="selectedRule?.rulesRef?.length > 0" class="mb-4">
            <h3 class="font-bold text-base mb-3">Referenced Rules</h3>
            <div class="space-y-2">
              <div v-for="ref in selectedRule.rulesRef" :key="ref" class="flex items-center p-2 bg-base-100 rounded">
                <Icon icon="mdi:link" class="w-4 h-4 mr-2 text-primary" />
                <span class="text-sm">{{ ref }}</span>
              </div>
            </div>
          </div>

          <!-- Additional Rule Properties (if any) -->
          <div v-if="additionalRuleProperties.length > 0" class="mb-4">
            <h3 class="font-bold text-base mb-3">Properties</h3>
            <div class="space-y-2">
              <div v-for="prop in additionalRuleProperties" :key="prop.key" class="flex flex-col p-3 bg-base-100 rounded">
                <span class="font-medium text-sm">{{ formatKey(prop.key) }}</span>
                <span class="text-sm mt-1">{{ formatValue(prop.value) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="p-4 border-t border-base-300 bg-base-300" v-if="selectedRule">
          <div class="flex flex-col gap-2">
            <a 
              :href="`/compendium/csrd/rules/${selectedRule.id.toLowerCase()}`" 
              class="btn btn-primary btn-sm"
            >
              <Icon icon="mdi:file-document-outline" class="w-4 h-4 mr-2" />
              View Full Rule Page
            </a>
            <button @click="closeRuleDrawer" class="btn btn-outline btn-sm">
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
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import DebugPanel from './DebugPanel.vue'
import GridList from './GridList.vue'

const props = defineProps({
  rules: {
    type: [Object, Array],
    default: () => ({})
  },
  collectionName: {
    type: String,
    default: ''
  },
  showDebug: {
    type: Boolean,
    default: false
  },
  tabKey: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['rule-select'])

// Reactive data for rule drawer
const selectedRule = ref(null)
const isRuleDrawerOpen = ref(false)

// Convert rules to array format for easier iteration
const rulesArray = computed(() => {
  if (Array.isArray(props.rules)) {
    return props.rules
  }
  
  if (typeof props.rules === 'object' && props.rules !== null) {
    return Object.values(props.rules)
  }
  
  return []
})

// Additional rule properties (excluding common ones)
const additionalRuleProperties = computed(() => {
  if (!selectedRule.value) return []
  
  const excludeKeys = ['id', 'title', 'description', 'rendered', 'rulesRef']
  return Object.entries(selectedRule.value)
    .filter(([key, value]) => !excludeKeys.includes(key) && value !== null && value !== undefined)
    .map(([key, value]) => ({ key, value }))
})

// Handle rule selection
const handleRuleSelect = (rule) => {
  console.log('Rule selected:', rule.id)
  emit('rule-select', rule)
  
  // If drawer is open, close it first
  if (isRuleDrawerOpen.value) {
    console.log('Closing rule drawer first...')
    isRuleDrawerOpen.value = false
    selectedRule.value = null
    
    // Wait for the close animation, then select new rule
    setTimeout(() => {
      console.log('Opening rule drawer with new rule:', rule.id)
      selectedRule.value = rule
      isRuleDrawerOpen.value = true
    }, 300)
  } else {
    // If drawer is closed, select rule and open immediately
    selectedRule.value = rule
    isRuleDrawerOpen.value = true
  }
}

const closeRuleDrawer = () => {
  console.log('Closing rule drawer')
  isRuleDrawerOpen.value = false
  
  // Clear selection after a short delay
  setTimeout(() => {
    selectedRule.value = null
  }, 300)
}

// Helper methods
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