<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
          <button @click="closeModal" class="modal-close" aria-label="Fechar">
            <i class="fas fa-times"></i>
          </button>
          
          <div class="modal-content">
            <h2 class="modal-title">Agendar Serviço</h2>
            
            <PetInfoForm
              v-model:pet-size="petSize"
              v-model:fur-type="furType"
              :estimated-duration="estimatedDuration"
            />
            
            <CalendarPicker
              v-model="selectedDate"
              :min-date="minDate"
            />
            
            <button
              v-if="canSchedule"
              @click="handleSchedule"
              class="btn-schedule-final"
            >
              <i class="fab fa-whatsapp"></i>
              Agendar via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const petSize = ref('Pequeno')
const furType = ref('Pelo curto')
const selectedDate = ref<Date | null>(null)
const minDate = new Date()

const estimatedDuration = computed(() => {
  const base = {
    'Mini': 30,
    'Pequeno': 40,
    'Médio': 50,
    'Grande': 60
  }
  
  const multiplier = {
    'Pelo curto': 1.0,
    'Pelo médio': 1.2,
    'Pelo longo': 1.5,
    'Pelo cacheado': 1.3
  }
  
  return Math.round(base[petSize.value] * multiplier[furType.value])
})

const canSchedule = computed(() => {
  return petSize.value && furType.value && selectedDate.value !== null
})

const closeModal = () => {
  emit('close')
}

const handleSchedule = () => {
  if (!selectedDate.value) return
  
  const phone = '5511993602794'
  
  const dateStr = selectedDate.value.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
  
  const message = `Olá! Gostaria de agendar um serviço:

📅 Data: ${dateStr}
🐾 Porte: ${petSize.value}
✂️ Tipo de pelo: ${furType.value}
⏱️ Duração estimada: ${estimatedDuration.value} minutos

Aguardo confirmação!`
  
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
  
  closeModal()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
}

.modal-container {
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
  z-index: 1;
}

.modal-close:hover {
  background: #f0f0f0;
  color: #333;
}

.modal-content {
  padding: 24px;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 24px;
  text-align: center;
}

.btn-schedule-final {
  width: 100%;
  padding: 16px;
  background: #25D366;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}

.btn-schedule-final:hover {
  background: #20BA5A;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .modal-content {
    padding: 16px;
  }
  
  .modal-title {
    font-size: 20px;
  }
}
</style>
