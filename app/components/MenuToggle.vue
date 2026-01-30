<template>
  <button
    class="menu-toggle"
    :aria-expanded="active ? 'true' : 'false'"
    aria-label="Abrir menu"
    aria-controls="mainNav"
    type="button"
    data-testid="menu-toggle"
    @click="$emit('toggle')"
  >
    <div class="hamburger" :class="{ active }" aria-hidden="true">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps<{ active?: boolean }>()
</script>

<style scoped>
.menu-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.hamburger { 
  display: inline-flex; 
  flex-direction: column; 
  gap: 6px; 
  align-items: center; 
  justify-content: center; 
}

.line { 
  width: 24px; 
  height: 2px; 
  background: var(--color-text); 
  border-radius: var(--radius-full); 
  transition: transform var(--duration-fast) var(--ease-standard), opacity var(--duration-fast) var(--ease-standard); 
}

.hamburger.active .line:nth-child(1) { 
  transform: translateY(8px) rotate(45deg); 
}

.hamburger.active .line:nth-child(2) { 
  opacity: 0; 
}

.hamburger.active .line:nth-child(3) { 
  transform: translateY(-8px) rotate(-45deg); 
}

/* MOBILE: Linhas do hamburger brancas */
@media (max-width: 768px) {
  .line {
    background: #FFFFFF !important; /* LINHAS BRANCAS no mobile */
  }
}
</style>