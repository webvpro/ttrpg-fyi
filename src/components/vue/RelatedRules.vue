<template>
  <!-- Rules content in collapsible sections (always show if rules available) -->
  <div v-if="Array.isArray(rules) && rules.length > 0" class="space-y-4 mb-4">
    <!-- Header Alert as Toggle -->
    <div class="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="checkbox" :id="`rules-toggle-${tabKey}`" />
      <div class="collapse-title">
        <div class="alert alert-info flex items-center gap-3 m-0 cursor-pointer rounded-none border-none">
          <Icon icon="mdi:book-open-variant" class="w-5 h-5" />
          <span class="text-sm font-semibold">Related Rules ({{ rules.length }})</span>
        </div>
      </div>
      <div class="collapse-content">
        <!-- DaisyUI Tabs for Rules -->
        <div class="pt-4">
          <!-- Tab buttons -->
          <div class="tabs tabs-boxed">
            <button 
              v-for="(rule, index) in reversedRules" 
              :key="`tab-${rule.id || index}`"
              @click="activeTabIndex = index"
              class="tab"
              :class="{ 'tab-active': activeTabIndex === index }"
            >
              {{ formatTitle(rule.data?.title || rule.id) || `Rule ${index + 1}` }}
            </button>
          </div>
          
          <!-- Tab Content - Only show the active tab -->
          <div class="mt-4 bg-base-200 rounded-lg p-4 min-h-32">
            <template v-for="(rule, index) in reversedRules" :key="`content-${rule.id || index}`">
              <div 
                v-if="activeTabIndex === index"
              >
                <div 
                  v-if="rule.rendered?.html" 
                  class="prose prose-sm md:prose-base max-w-none" 
                  v-html="rule.rendered.html"
                ></div>
                <div v-else class="text-gray-500 italic">
                  No content available for this rule.
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Single rule content (if single rule object) -->
  <div v-else-if="rules?.rendered?.html" class="mb-4">
    <div class="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="checkbox" :id="`single-rule-toggle-${tabKey}`" />
      <div class="collapse-title">
        <div class="alert alert-info flex items-center gap-3 m-0 cursor-pointer rounded-none border-none">
          <Icon icon="mdi:book-open-variant" class="w-5 h-5" />
          <span class="text-sm font-semibold">Rule: {{ formatTitle(rules.data?.title || collectionName) }}</span>
        </div>
      </div>
      <div class="collapse-content">
        <div class="prose prose-sm md:prose-base lg:prose-lg max-w-none pt-4" v-html="rules.rendered.html"></div>
      </div>
    </div>
  </div>

  <!-- Debug info for rules (only in development) -->
  <div v-if="showDebug" class="alert alert-warning text-warning-content mb-4">
    <Icon icon="mdi:alert-outline" class="w-6 h-6 shrink-0" />
    <div>
      <h3 class="font-bold">Rules Debug Info</h3>
      <div v-if="Array.isArray(rules) && rules.length > 0" class="text-xs mt-2">
        <strong>Rules:</strong> {{ rules.length }} rule(s) available
        <div class="text-xs text-success">✓ Rule content available for tabs</div>
        <div class="text-xs mt-1">Active tab: {{ activeTabIndex + 1 }} - {{ formatTitle(reversedRules[activeTabIndex]?.data?.title) || 'No title' }}</div>
        <div class="text-xs mt-1">Total reversed rules: {{ reversedRules.length }}</div>
        <div class="text-xs mt-1">Has rendered HTML: {{ !!reversedRules[activeTabIndex]?.rendered?.html }}</div>
      </div>
      <div v-else-if="rules?.rendered?.html" class="text-xs mt-2">
        <strong>Rule:</strong> {{ formatTitle(rules.data?.title) || 'Single rule' }}
        <div class="text-xs text-success">✓ Rule content available</div>
      </div>
      <div v-else class="text-xs mt-2 text-warning">⚠ No rule content</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'

// Props
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
    default: 'rules'
  }
})

// Reactive data
const activeTabIndex = ref(0)

// Computed properties
const formattedCollectionName = computed(() => {
  return props.collectionName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
})

// Reverse the rules array
const reversedRules = computed(() => {
  if (Array.isArray(props.rules)) {
    return [...props.rules].reverse()
  }
  return []
})

// Methods
const formatTitle = (title) => {
  if (!title) return ''
  return title.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

// Reset active tab when rules change
watch(() => props.rules, () => {
  activeTabIndex.value = 0
}, { immediate: true })
</script>

<style>
/* Hide all tab content by default */
.tab-content {
  display: none;
}

/* Show content based on which radio button is checked */
#rule-tab-rules-0:checked ~ .mt-4 #content-rules-0,
#rule-tab-rules-1:checked ~ .mt-4 #content-rules-1,
#rule-tab-rules-2:checked ~ .mt-4 #content-rules-2,
#rule-tab-rules-3:checked ~ .mt-4 #content-rules-3,
#rule-tab-rules-4:checked ~ .mt-4 #content-rules-4,
#rule-tab-rules-5:checked ~ .mt-4 #content-rules-5 {
  display: block !important;
}

/* Generic fallback for any tab key */
input[id^="rule-tab-"]:checked ~ .mt-4 .tab-content:first-child {
  display: block;
}
</style>