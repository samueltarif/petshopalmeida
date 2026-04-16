<template>
  <div class="carousel-container">
    <div 
      class="carousel-track" 
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      @click="openLightbox"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="carousel-slide"
      >
        <img 
          :src="image" 
          :alt="`${alt} - Imagem ${index + 1}`"
          class="carousel-image"
          loading="lazy"
        />
      </div>
    </div>
    
    <button
      v-if="images.length > 1"
      @click.stop="prevSlide"
      class="carousel-nav carousel-prev"
      aria-label="Imagem anterior"
    >
      <i class="fas fa-chevron-left"></i>
    </button>
    
    <button
      v-if="images.length > 1"
      @click.stop="nextSlide"
      class="carousel-nav carousel-next"
      aria-label="Próxima imagem"
    >
      <i class="fas fa-chevron-right"></i>
    </button>
    
    <div v-if="images.length > 1" class="carousel-indicators">
      <button
        v-for="(_, index) in images"
        :key="index"
        :class="['indicator', { active: currentIndex === index }]"
        @click.stop="goToSlide(index)"
        :aria-label="`Ir para imagem ${index + 1}`"
      />
    </div>
    
    <ImageLightbox
      :is-open="lightboxOpen"
      :image-src="images[currentIndex]"
      :image-alt="`${alt} - Imagem ${currentIndex + 1}`"
      :current-index="currentIndex"
      :total-images="images.length"
      @close="closeLightbox"
      @prev="prevImage"
      @next="nextImage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  images: string[]
  alt: string
  interval?: number
}

const props = withDefaults(defineProps<Props>(), {
  interval: 3000
})

const currentIndex = ref(0)
const lightboxOpen = ref(false)
let intervalId: number | null = null

const goToSlide = (index: number) => {
  currentIndex.value = index
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 
    ? props.images.length - 1 
    : currentIndex.value - 1
}

const prevImage = () => {
  prevSlide()
}

const nextImage = () => {
  nextSlide()
}

const openLightbox = () => {
  lightboxOpen.value = true
  if (intervalId) {
    clearInterval(intervalId)
  }
}

const closeLightbox = () => {
  lightboxOpen.value = false
  if (props.images.length > 1) {
    intervalId = window.setInterval(nextSlide, props.interval)
  }
}

onMounted(() => {
  if (props.images.length > 1) {
    intervalId = window.setInterval(nextSlide, props.interval)
  }
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}

.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.3s;
  z-index: 10;
}

.carousel-nav:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-50%) scale(1.1);
}

.carousel-prev {
  left: 12px;
}

.carousel-next {
  right: 12px;
}

.carousel-indicators {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.8);
}

.indicator.active {
  background: white;
  width: 24px;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .carousel-nav {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  
  .carousel-prev {
    left: 8px;
  }
  
  .carousel-next {
    right: 8px;
  }
}
</style>
