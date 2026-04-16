<template>
  <div class="calendar-section">
    <h3>Selecione a data:</h3>
    
    <div class="calendar-header">
      <button 
        @click="previousMonth"
        class="nav-button"
        aria-label="Mês anterior"
      >
        ←
      </button>
      <h4 class="month-year">{{ currentMonthName }} {{ currentYear }}</h4>
      <button 
        @click="nextMonth"
        class="nav-button"
        aria-label="Próximo mês"
      >
        →
      </button>
    </div>
    
    <div class="calendar-grid">
      <div class="weekdays">
        <span>Dom</span>
        <span>Seg</span>
        <span>Ter</span>
        <span>Qua</span>
        <span>Qui</span>
        <span>Sex</span>
        <span>Sáb</span>
      </div>
      
      <div class="days-grid">
        <button
          v-for="day in calendarDays"
          :key="`${day.year}-${day.month}-${day.day}`"
          :class="getDayClasses(day)"
          :disabled="!day.isAvailable"
          @click="selectDay(day)"
        >
          {{ day.day }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface DayInfo {
  day: number
  month: number
  year: number
  isCurrentMonth: boolean
  isToday: boolean
  isAvailable: boolean
  date: Date
}

interface Props {
  modelValue: Date | null
  minDate?: Date
}

interface Emits {
  (e: 'update:modelValue', value: Date | null): void
}

const props = withDefaults(defineProps<Props>(), {
  minDate: () => new Date()
})

const emit = defineEmits<Emits>()

const currentDate = ref(new Date())
const selectedDate = ref<Date | null>(props.modelValue)

const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())

const currentMonthName = computed(() => {
  return currentDate.value.toLocaleDateString('pt-BR', { month: 'long' })
    .replace(/^\w/, c => c.toUpperCase())
})

const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const firstDayWeek = firstDay.getDay()
  const totalDays = lastDay.getDate()
  
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  
  const days: DayInfo[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Dias do mês anterior
  for (let i = firstDayWeek - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i
    const date = new Date(year, month - 1, day)
    days.push({
      day,
      month: month - 1,
      year: month === 0 ? year - 1 : year,
      isCurrentMonth: false,
      isToday: false,
      isAvailable: false,
      date
    })
  }
  
  // Dias do mês atual
  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month, day)
    date.setHours(0, 0, 0, 0)
    
    const isToday = date.getTime() === today.getTime()
    const isAvailable = isDateAvailable(date)
    
    days.push({
      day,
      month,
      year,
      isCurrentMonth: true,
      isToday,
      isAvailable,
      date
    })
  }
  
  // Dias do próximo mês
  const remainingDays = 42 - days.length
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day)
    days.push({
      day,
      month: month + 1,
      year: month === 11 ? year + 1 : year,
      isCurrentMonth: false,
      isToday: false,
      isAvailable: false,
      date
    })
  }
  
  return days
})

const isDateAvailable = (date: Date): boolean => {
  const checkDate = new Date(date)
  checkDate.setHours(0, 0, 0, 0)
  
  const minDate = new Date(props.minDate)
  minDate.setHours(0, 0, 0, 0)
  
  // Não permitir datas passadas
  if (checkDate < minDate) return false
  
  // Não permitir domingos
  if (checkDate.getDay() === 0) return false
  
  return true
}

const getDayClasses = (day: DayInfo) => {
  const classes = []
  
  if (!day.isCurrentMonth) {
    classes.push('other-month')
  }
  
  if (day.isToday) {
    classes.push('today')
  }
  
  if (selectedDate.value && isSameDay(day.date, selectedDate.value)) {
    classes.push('selected')
  }
  
  return classes.join(' ')
}

const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate()
}

const selectDay = (day: DayInfo) => {
  if (!day.isAvailable) return
  
  selectedDate.value = day.date
  emit('update:modelValue', day.date)
}

const previousMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
}
</script>

<style scoped>
.calendar-section {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #E0E0E0;
}

.calendar-section h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.nav-button {
  background: none;
  border: none;
  font-size: 24px;
  color: #4A90E2;
  cursor: pointer;
  padding: 8px;
  transition: opacity 0.2s;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.nav-button:hover {
  background: #F0F4FF;
}

.month-year {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
  text-align: center;
  font-weight: 600;
  color: #666;
  font-size: 14px;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.days-grid button {
  aspect-ratio: 1;
  border: 1px solid #E0E0E0;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  color: #333;
  font-weight: 500;
}

.days-grid button:hover:not(:disabled) {
  background: #F0F4FF;
  border-color: #4A90E2;
}

.days-grid button.selected {
  background: #4A90E2;
  color: white;
  border-color: #4A90E2;
  font-weight: 600;
}

.days-grid button.today {
  border: 2px solid #4A90E2;
  font-weight: 700;
}

.days-grid button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.days-grid button.other-month {
  opacity: 0.4;
  color: #999;
}

@media (max-width: 768px) {
  .days-grid button {
    font-size: 12px;
  }
  
  .weekdays {
    font-size: 12px;
  }
  
  .month-year {
    font-size: 16px;
  }
}
</style>
