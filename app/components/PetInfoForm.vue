<template>
  <div class="pet-info-section">
    <h3>🐾 Informações do Pet</h3>
    
    <div class="form-group">
      <label for="pet-size">Porte:</label>
      <select 
        id="pet-size"
        :value="petSize"
        @change="$emit('update:petSize', ($event.target as HTMLSelectElement).value)"
        class="form-select"
      >
        <option value="Mini">Mini</option>
        <option value="Pequeno">Pequeno</option>
        <option value="Médio">Médio</option>
        <option value="Grande">Grande</option>
      </select>
    </div>
    
    <div class="form-group">
      <label for="fur-type">Tipo de pelo:</label>
      <select 
        id="fur-type"
        :value="furType"
        @change="$emit('update:furType', ($event.target as HTMLSelectElement).value)"
        class="form-select"
      >
        <option value="Pelo curto">Pelo curto</option>
        <option value="Pelo médio">Pelo médio</option>
        <option value="Pelo longo">Pelo longo</option>
        <option value="Pelo cacheado">Pelo cacheado</option>
      </select>
    </div>
    
    <div class="duration-box">
      <div class="duration-main">
        <span class="clock-icon">⏱️</span>
        <span class="duration-text">
          Duração estimada: <strong>{{ estimatedDuration }} minutos</strong>
        </span>
      </div>
      <p class="duration-extra">
        + 15 minutos para limpeza e organização dos equipamentos
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  petSize: string
  furType: string
  estimatedDuration: number
}

interface Emits {
  (e: 'update:petSize', value: string): void
  (e: 'update:furType', value: string): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.pet-info-section {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid #E0E0E0;
}

.pet-info-section h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
  font-size: 14px;
}

.form-select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
  transition: border-color 0.2s;
}

.form-select:focus {
  outline: none;
  border-color: #4A90E2;
}

.form-select:hover {
  border-color: #4A90E2;
}

.duration-box {
  background: #F0F4FF;
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
}

.duration-main {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4A90E2;
  font-size: 16px;
}

.clock-icon {
  font-size: 20px;
}

.duration-text strong {
  font-weight: 700;
}

.duration-extra {
  color: #999;
  font-size: 14px;
  margin: 8px 0 0 28px;
  line-height: 1.4;
}
</style>
