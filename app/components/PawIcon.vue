<template>
  <svg 
    :width="size" 
    :height="size" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    class="paw-icon"
  >
    <!-- Almofadas dos dedos -->
    <ellipse cx="8" cy="6" rx="2" ry="3" />
    <ellipse cx="16" cy="6" rx="2" ry="3" />
    <ellipse cx="6" cy="12" rx="1.5" ry="2" />
    <ellipse cx="18" cy="12" rx="1.5" ry="2" />
    <!-- Almofada principal -->
    <ellipse cx="12" cy="16" rx="4" ry="3" />
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 24
  }
})
</script>

<style scoped>
.paw-icon {
  transition: transform 0.2s ease;
}

.paw-icon:hover {
  transform: scale(1.1);
}
</style>