<template>
  <nav :id="id" :class="{ active }" data-testid="mobile-nav">
    <ul>
      <li v-for="item in items" :key="item.href">
        <a :href="item.href" @click="$emit('click-link', item)">{{ item.label }}</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
type NavItem = { label: string; href: string }
defineProps<{ items: NavItem[]; active?: boolean; id?: string }>()
</script>