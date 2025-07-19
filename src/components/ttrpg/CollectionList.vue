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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div> 
        <div class="flex-1">
          <h1 class="text-xl font-bold">{{ computedPageTitle }}</h1>
        </div>
      </div>
      
      <!-- Main content area -->
      <div class="flex-1 p-4">
        <!-- Debug info (only in development) -->
        <div v-if="showDebug" class="alert alert-warning mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.98-.833-2.75 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <h3 class="font-bold">Debug Info</h3>
            <div class="text-xs">Found {{ entries.length }} {{ collectionName }}</div>
            <div v-if="entries.length === 0" class="text-xs text-error">
              No {{ collectionName }} found! Check collection configuration.
            </div>
          </div>
        </div>

        <!-- Selected item details -->
        <div v-if="selectedEntry" class="card bg-base-100 shadow-xl mb-4">
          <div class="card-body">
            <h2 class="card-title">{{ selectedEntry.title || selectedEntry.id }}</h2>
            
            <!-- Markdown content -->
            <div v-if="selectedEntry.rendered?.html" class="prose prose-sm md:prose-base lg:prose-lg max-w-none mt-4" v-html="selectedEntry.rendered.html"></div>
            
            <!-- Fallback to description if no rendered content -->
            <div v-else-if="selectedEntry.description" class="mt-4">
              <p class="text-gray-600 opacity-70">{{ selectedEntry.description }}</p>
            </div>
            
            <!-- Additional properties -->
            <div v-if="additionalProperties.length > 0" class="mt-6 pt-4 border-t border-base-300">
              <h3 class="font-semibold mb-2">Properties:</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div v-for="prop in additionalProperties" :key="prop.key" class="flex justify-between">
                  <span class="font-medium">{{ formatKey(prop.key) }}:</span>
                  <span class="text-right">{{ formatValue(prop.value) }}</span>
                </div>
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
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 class="font-bold">No {{ collectionName }} found!</h3>
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
          <h2 class="text-lg font-semibold">{{ collectionName }} List</h2>
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
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    entries: {
      type: Array,
      required: true,
      default: () => []
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
  },
  data() {
    return {
      selectedEntry: null,
      searchTerm: ''
    }
  },
  computed: {
    computedPageTitle() {
      return this.pageTitle || this.collectionName.charAt(0).toUpperCase() + this.collectionName.slice(1);
    },
    computedPageDescription() {
      return this.pageDescription || `A complete list of all ${this.collectionName.replace(/-/g, ' ')}`;
    },
    filteredEntries() {
      if (!this.searchTerm) return this.entries;
      
      return this.entries.filter(entry => {
        const title = entry.title || entry.id;
        return title.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    },
    additionalProperties() {
      if (!this.selectedEntry) return [];
      
      const excludeKeys = ['id', 'title', 'description', 'rendered'];
      return Object.entries(this.selectedEntry)
        .filter(([key, value]) => !excludeKeys.includes(key) && value !== null && value !== undefined)
        .map(([key, value]) => ({ key, value }));
    }
  },
  methods: {
    selectEntry(entry) {
      this.selectedEntry = entry;
      // Close drawer on mobile after selection
      if (window.innerWidth < 1024) {
        document.getElementById('collection-drawer').checked = false;
      }
    },
    clearSelection() {
      this.selectedEntry = null;
    },
    formatKey(key) {
      return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
    },
    formatValue(value) {
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      if (typeof value === 'object') {
        return JSON.stringify(value, null, 2);
      }
      return String(value);
    }
  }
}
</script>

<style>
/* No custom styles needed - use classes in template instead */
</style>