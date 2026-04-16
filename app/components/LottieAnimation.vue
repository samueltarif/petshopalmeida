<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

interface Props {
  animationUrl: string
  loop?: boolean
  autoplay?: boolean
}

withDefaults(defineProps<Props>(), {
  loop: true,
  autoplay: true
})
</script>

<template>
  <DotLottieVue 
    :src="animationUrl"
    :autoplay="autoplay"
    :loop="loop"
    class="lottie-animation"
  />
</template>

<style scoped>
.lottie-animation {
  width: 100% !important;
  height: 100% !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(canvas),
:deep(svg) {
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: contain;
}
</style>
