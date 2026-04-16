<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div v-if="isOpen" class="lightbox-overlay" @click="close">
        <button @click="close" class="lightbox-close" aria-label="Fechar">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="lightbox-content" @click.stop>
          <img 
            :src="imageSrc" 
            :alt="imageAlt"
            class="lightbox-image"
          />
          
          <div v-if="totalImages > 1" class="lightbox-nav">
            <button 
              @click.stop="$emit('prev')"
              class="nav-btn nav-prev"
              aria-label="Imagem anterior"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            
            <span class="image-counter">{{ currentIndex + 1 }} / {{ totalImages }}</span>
            
            <button 
              @click.stop="$emit('next')"
              class="nav-btn nav-next"
              aria-label="Próxima imagem"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
  imageSrc: string
  imageAlt: string
  currentIndex: number
  totalImages: number
}

interface Emits {
  (e: 'close'): void
  (e: 'prev'): void
  (e: 'next'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const close = () => {
  emit('close')
}
</script>

<style scoped>
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 28px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 10001;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.lightbox-content {
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.lightbox-image {
  max-width: 100%;
  max-height: calc(90vh - 80px);
  object-fit: contain;
  border-radius: 8px;
}

.lightbox-nav {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 24px;
  border-radius: 50px;
  backdrop-filter: blur(10px);
}

.nav-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.image-counter {
  color: white;
  font-size: 16px;
  font-weight: 600;
  min-width: 60px;
  text-align: center;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-active .lightbox-content,
.lightbox-leave-active .lightbox-content {
  transition: transform 0.3s ease;
}

.lightbox-enter-from .lightbox-content,
.lightbox-leave-to .lightbox-content {
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .lightbox-close {
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    font-size: 24px;
  }
  
  .lightbox-image {
    max-height: calc(90vh - 100px);
  }
  
  .nav-btn {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }
  
  .image-counter {
    font-size: 14px;
  }
}
</style>
