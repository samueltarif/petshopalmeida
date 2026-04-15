<template>
  <div class="relative inline-block">
    <button
      type="button"
      class="inline-flex items-center gap-2 px-2 py-1 text-xs font-semibold rounded-md border transition-colors duration-200"
      :aria-label="`Agendar ${serviceLabel}`"
      data-testid="schedule-button"
      @click="onClick"
    >
      Agendar
    </button>

    <!-- Modal de Agendamento -->
    <div v-if="showScheduleModal" class="schedule-overlay fixed inset-0 bg-black/60 flex items-center justify-center z-[10000]" role="dialog" aria-modal="true" aria-label="Agendamento">
      <div class="schedule-content relative bg-[var(--color-surface)] border border-[var(--color-card-border)] rounded-lg p-6 w-[min(90vw,500px)] max-h-[80vh] overflow-auto text-sm text-[var(--color-text)]">
        <button type="button" class="schedule-close absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors" aria-label="Fechar" @click="closeScheduleModal">✕</button>
        
        <h3 class="text-lg font-semibold mb-4 text-[var(--color-text)]">📅 Agendar Serviço</h3>
        <p class="text-sm text-[var(--color-text-secondary)] mb-4">{{ serviceLabel }}</p>

        <!-- Informações do Pet -->
        <div class="mb-6 p-4 bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-lg">
          <h4 class="text-sm font-semibold mb-3 text-[var(--color-text)]">🐾 Informações do Pet</h4>
          
          <div class="grid grid-cols-1 gap-4">
            <!-- Porte do Pet -->
            <div>
              <label class="block text-xs font-medium mb-2 text-[var(--color-text)]">Porte:</label>
              <select 
                v-model="selectedPetSize" 
                class="w-full p-2 text-xs border border-[var(--color-card-border)] rounded-md bg-[var(--color-surface)] text-[var(--color-text)] focus:border-[var(--pet-primary)] focus:outline-none"
              >
                <option v-for="option in petSizeOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <!-- Tipo de Pelo -->
            <div>
              <label class="block text-xs font-medium mb-2 text-[var(--color-text)]">Tipo de pelo:</label>
              <select 
                v-model="selectedCoatType" 
                class="w-full p-2 text-xs border border-[var(--color-card-border)] rounded-md bg-[var(--color-surface)] text-[var(--color-text)] focus:border-[var(--pet-primary)] focus:outline-none"
              >
                <option v-for="option in coatTypeOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <!-- Remoção de Pelo (apenas para porte grande) -->
            <div v-if="selectedPetSize === 'grande'">
              <label class="flex items-center gap-2 text-xs text-[var(--color-text)]">
                <input 
                  type="checkbox" 
                  v-model="selectedHairRemoval"
                  class="rounded border-[var(--color-card-border)]"
                  :style="{ accentColor: 'var(--pet-primary)' }"
                >
                Com remoção de pelo
              </label>
            </div>
          </div>

          <!-- Duração Estimada -->
          <div class="mt-4 p-3 bg-[var(--pet-primary)]/10 border border-[var(--pet-primary)]/20 rounded-md">
            <div class="flex items-center gap-2">
              <span class="text-xs font-medium text-[var(--color-text)]">⏱️ Duração estimada:</span>
              <span class="text-xs font-semibold text-[var(--pet-primary)]">{{ formattedDuration }}</span>
            </div>
            <p class="text-xs text-[var(--color-text-secondary)] mt-1">
              + 15 minutos para limpeza e organização dos equipamentos
            </p>
          </div>
        </div>

        <!-- Seleção de Data -->
        <div class="mb-6">
          <label class="block text-sm font-medium mb-3 text-[var(--color-text)]">Selecione a data:</label>
          
          <!-- Navegação do calendário -->
          <div class="flex items-center justify-between mb-3">
            <button 
              type="button" 
              class="p-2 rounded-md border border-[var(--color-card-border)] text-[var(--color-text)] hover:border-[var(--pet-primary)] disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!canGoPrevious"
              @click="previousMonth"
              aria-label="Mês anterior"
            >
              ←
            </button>
            <h4 class="text-base font-semibold text-[var(--color-text)]">
              {{ monthNames[currentMonth] }} {{ currentYear }}
            </h4>
            <button 
              type="button" 
              class="p-2 rounded-md border border-[var(--color-card-border)] text-[var(--color-text)] hover:border-[var(--pet-primary)]"
              @click="nextMonth"
              aria-label="Próximo mês"
            >
              →
            </button>
          </div>

          <!-- Cabeçalho dos dias da semana -->
          <div class="grid grid-cols-7 gap-2 mb-2">
            <div v-for="day in ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']" :key="day" class="text-center text-xs font-medium text-[var(--color-text-secondary)] py-1">
              {{ day }}
            </div>
          </div>
          
          <!-- Grid do calendário -->
          <div class="grid grid-cols-7 gap-2">
            <button
              v-for="date in availableDates"
              :key="date.dateString"
              type="button"
              class="date-button p-2 text-xs rounded-md border transition-colors duration-200"
              :class="{
                'bg-[var(--pet-primary)] text-white border-[var(--pet-primary)]': selectedDate === date.dateString,
                'border-[var(--color-card-border)] text-[var(--color-text)] hover:border-[var(--pet-primary)]': selectedDate !== date.dateString && !date.isPast && !date.isOtherMonth,
                'opacity-30 cursor-not-allowed': date.isPast || date.isOtherMonth,
                'bg-blue-100 border-blue-300': date.isToday && selectedDate !== date.dateString,
                'text-[var(--color-text-secondary)]': date.isOtherMonth
              }"
              :disabled="date.isPast"
              @click="!date.isOtherMonth && !date.isPast ? selectDate(date.dateString) : null"
            >
              {{ date.day }}
            </button>
          </div>
        </div>

        <!-- Seleção de Horário -->
        <div class="mb-6" v-if="selectedDate">
          <label class="block text-sm font-medium mb-3 text-[var(--color-text)]">Selecione o horário:</label>
          <div class="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
            <button
              v-for="time in availableTimes"
              :key="time"
              type="button"
              class="time-button p-2 text-xs rounded-md border transition-colors duration-200"
              :class="{
                'bg-[var(--pet-primary)] text-white border-[var(--pet-primary)]': selectedTime === time,
                'border-[var(--color-card-border)] text-[var(--color-text)] hover:border-[var(--pet-primary)]': selectedTime !== time
              }"
              @click="selectTime(time)"
            >
              {{ time }}
            </button>
          </div>
        </div>

        <!-- Botões de Ação -->
        <div class="flex gap-3 justify-end pt-4 border-t border-[var(--color-card-border)]">
          <button type="button" class="px-4 py-2 rounded-md border border-[var(--color-card-border)] text-sm text-[var(--color-text)] hover:border-[var(--pet-primary)] transition-colors" @click="closeScheduleModal">
            Cancelar
          </button>
          <button 
            type="button" 
            class="px-4 py-2 rounded-md bg-[var(--pet-primary)] text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity" 
            :disabled="!selectedDate || !selectedTime"
            @click="proceedToExtras"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Extras (existente) -->
    <div v-if="showModal" class="extras-overlay fixed inset-0 bg-black/60 flex items-center justify-center z-[10000]" role="dialog" aria-modal="true" aria-label="Serviços adicionais">
      <div class="extras-content relative bg-[var(--color-surface)] border border-[var(--color-card-border)] rounded-lg p-4 w-[min(90vw,420px)] text-sm text-[var(--color-text)]">
        <button type="button" class="extras-close absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white" aria-label="Fechar" @click="closeModal">✕</button>
        <h3 class="text-base font-semibold mb-2 text-[var(--color-text)]">Gostaria de adicionar mais algum serviço?</h3>
        <p class="text-xs text-[var(--color-text-secondary)] mb-3">Selecione um ou mais extras opcionais para incluir no agendamento.</p>

        <div class="space-y-2 max-h-[40vh] overflow-auto mb-4">
          <label v-for="(item, i) in extras" :key="item" class="extras-item cursor-pointer text-[var(--color-text)]">
            <input type="checkbox" name="extra" :value="item" v-model="selectedExtras" :style="{ accentColor: 'var(--pet-primary)' }">
            <span>{{ item }}</span>
            <span class="image-cell" aria-hidden="true" v-show="!iconsHidden">
              <span v-if="i === 0" class="arrow-down"></span>
              <Image3DIcon
                :size="18"
                aria-label="Ícone de imagem"
                :popup-aria-label="item.includes('Hidratação') ? 'Fotos de Hidratação' : 'Janela de ajuda'"
                :images="item.includes('Hidratação') ? hidrataImages : undefined"
                @open="iconsHidden = true"
                @close="iconsHidden = false"
              />
            </span>
          </label>
        </div>

        <div class="flex gap-2 justify-end">
          <button type="button" class="px-3 py-1 rounded-md border text-xs" @click="schedule(false)">Agendar sem extras</button>
          <button type="button" class="px-3 py-1 rounded-md bg-[#25D366] text-white text-xs disabled:opacity-60" :disabled="!hasRealExtras" @click="schedule(true)">Agendar com extras</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Image3DIcon from './Image3DIcon.vue'

const props = withDefaults(defineProps<{
  service: string
  variant?: string
  price?: string
  phone?: string
  extras?: string[]
  greetingPrefix?: string
  petSize?: 'mini' | 'pequeno' | 'medio' | 'grande'
  coatType?: 'curto' | 'longo' | 'embolado'
  withHairRemoval?: boolean
}>(), {
  phone: '5511993602794',
  extras: () => [],
  greetingPrefix: '',
  petSize: 'pequeno',
  coatType: 'curto',
  withHairRemoval: false
})

// Função para obter data/hora atual em Brasília
const getBrasiliaDate = () => {
  return new Date(new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}))
}

// Nomes dos meses em português
const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const showModal = ref(false)
const showScheduleModal = ref(false)
const selectedExtras = ref<string[]>([])
const selectedDate = ref<string>('')
const selectedTime = ref<string>('')
const selectedPetSize = ref<string>(props.petSize || 'pequeno')
const selectedCoatType = ref<string>(props.coatType || 'curto')
const selectedHairRemoval = ref<boolean>(props.withHairRemoval || false)
const currentMonth = ref(getBrasiliaDate().getMonth())
const currentYear = ref(getBrasiliaDate().getFullYear())
const iconsHidden = ref(false)
const hidrataImages = ['/images/hidratação.jpg', '/images/hidratação1.jpg', '/images/Hidratação2.jpg']
const hasExtras = computed(() => (props.extras?.length || 0) > 0)
const hasRealExtras = computed(() => selectedExtras.value.length > 0)

// Configuração de durações dos serviços
const serviceDurations = {
  mini: {
    curto: 30, // 30 minutos
    longo: 40  // 40 minutos
  },
  pequeno: {
    curto: 40,     // 40 minutos
    longo: 60,     // 1 hora
    embolado: 90   // 1h30
  },
  medio: {
    curto: 60,     // 1 hora
    longo: 110     // 1h50
  },
  grande: {
    curto: 140,           // 2h20 (sem remoção)
    longo: 170,           // 2h50 (com remoção)
    comRemocao: 180       // 3h (com remoção máxima)
  }
}

// Calcular duração estimada do serviço
const estimatedDuration = computed(() => {
  const size = selectedPetSize.value as keyof typeof serviceDurations
  const coat = selectedCoatType.value as string
  
  if (!serviceDurations[size]) return 60 // default 1 hora
  
  let duration = 60 // default
  
  if (size === 'grande') {
    if (selectedHairRemoval.value) {
      duration = serviceDurations[size].comRemocao || serviceDurations[size].longo || 170
    } else {
      duration = serviceDurations[size].curto || 140
    }
  } else {
    const sizeConfig = serviceDurations[size] as any
    duration = sizeConfig[coat] || sizeConfig.curto || 60
  }
  
  return duration
})

// Formatar duração em texto legível
const formattedDuration = computed(() => {
  const minutes = estimatedDuration.value
  if (minutes < 60) {
    return `${minutes} minutos`
  } else {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    if (remainingMinutes === 0) {
      return `${hours}h`
    } else {
      return `${hours}h${remainingMinutes.toString().padStart(2, '0')}`
    }
  }
})

// Opções para seleção
const petSizeOptions = [
  { value: 'mini', label: 'Mini (de acordo com a raça)' },
  { value: 'pequeno', label: 'Pequeno' },
  { value: 'medio', label: 'Médio' },
  { value: 'grande', label: 'Grande (de acordo com a raça)' }
]

const coatTypeOptions = computed(() => {
  const base = [
    { value: 'curto', label: 'Pelo curto' },
    { value: 'longo', label: 'Pelo longo' }
  ]
  
  if (selectedPetSize.value === 'pequeno') {
    base.push({ value: 'embolado', label: 'Embolado' })
  }
  
  return base
})

// Gerar datas disponíveis para o mês atual
const availableDates = computed(() => {
  const dates = []
  const today = getBrasiliaDate()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  
  // Primeiro dia do mês atual sendo exibido
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1)
  const lastDayOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0)
  
  // Primeiro dia da semana (domingo = 0)
  const startDay = firstDayOfMonth.getDay()
  
  // Adicionar dias do mês anterior para completar a primeira semana
  for (let i = startDay - 1; i >= 0; i--) {
    const date = new Date(firstDayOfMonth)
    date.setDate(date.getDate() - (i + 1))
    dates.push({
      dateString: date.toISOString().split('T')[0],
      day: date.getDate(),
      isPast: date < startOfToday,
      isOtherMonth: true,
      fullDate: date
    })
  }
  
  // Adicionar todos os dias do mês atual
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    const date = new Date(currentYear.value, currentMonth.value, day)
    const isPast = date < startOfToday
    const isToday = date.getTime() === startOfToday.getTime()
    
    dates.push({
      dateString: date.toISOString().split('T')[0],
      day: day,
      isPast: isPast,
      isOtherMonth: false,
      isToday: isToday,
      fullDate: date
    })
  }
  
  // Completar com dias do próximo mês até ter 42 dias (6 semanas)
  const remainingDays = 42 - dates.length
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(currentYear.value, currentMonth.value + 1, day)
    dates.push({
      dateString: date.toISOString().split('T')[0],
      day: day,
      isPast: false,
      isOtherMonth: true,
      fullDate: date
    })
  }
  
  return dates
})

// Horários disponíveis com intervalos de 15 minutos
const availableTimes = computed(() => {
  const times = []
  const startHour = 8 // 8:00
  const endHour = 18 // 18:00
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      // Pular horário de almoço (12:00 às 13:00)
      if (hour === 12) continue
      
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      times.push(timeString)
    }
  }
  
  return times
})

// Navegação do calendário
const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

// Verificar se pode navegar para mês anterior
const canGoPrevious = computed(() => {
  const today = getBrasiliaDate()
  const currentDisplayMonth = new Date(currentYear.value, currentMonth.value, 1)
  const currentRealMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  return currentDisplayMonth >= currentRealMonth
})

const selectDate = (dateString: string) => {
  selectedDate.value = dateString
  selectedTime.value = '' // Reset time when date changes
}

const selectTime = (time: string) => {
  selectedTime.value = time
}

// Util: extrair valor em R$ de textos como "Hidratação – R$ 20,00" ou "a partir de R$15,00"
const parseCurrencyBr = (text: string): number | null => {
  const m = text.match(/R\$\s*([0-9]{1,3}(?:\.[0-9]{3})*(?:,[0-9]{2})|[0-9]+(?:,[0-9]{2})?)/)
  if (!m) return null
  const br = m[1]
  // remover pontos de milhar e trocar vírgula por ponto
  const normalized = br.replace(/\./g, '').replace(',', '.')
  const n = parseFloat(normalized)
  return isNaN(n) ? null : n
}
const formatCurrencyBr = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const extrasTotal = computed(() => selectedExtras.value.reduce((sum, item) => {
  const v = parseCurrencyBr(item)
  return sum + (v ?? 0)
}, 0))

const serviceLabel = computed(() => [props.service, props.variant, props.price].filter(Boolean).join(' – '))

const buildWhatsUrl = (includeExtra: boolean) => {
  const base = `https://wa.me/${props.phone}`
  const prefix = props.greetingPrefix ? `${props.greetingPrefix}. ` : 'Olá! '

  const lines: string[] = []
  lines.push(`${prefix}📅 Gostaria de agendar ${serviceLabel.value}.`)
  
  // Adicionar informações do pet
  const sizeLabels = {
    mini: 'Mini',
    pequeno: 'Pequeno', 
    medio: 'Médio',
    grande: 'Grande'
  }
  
  const coatLabels = {
    curto: 'pelo curto',
    longo: 'pelo longo', 
    embolado: 'embolado'
  }
  
  lines.push(`🐾 Pet: Porte ${sizeLabels[selectedPetSize.value as keyof typeof sizeLabels]}, ${coatLabels[selectedCoatType.value as keyof typeof coatLabels]}`)
  
  if (selectedPetSize.value === 'grande' && selectedHairRemoval.value) {
    lines.push(`✂️ Com remoção de pelo`)
  }
  
  lines.push(`⏱️ Duração estimada: ${formattedDuration.value} (+ 15min para limpeza)`)
  
  // Adicionar informações de data e horário
  if (selectedDate.value && selectedTime.value) {
    const dateObj = new Date(selectedDate.value + 'T00:00:00')
    // Ajustar para fuso horário de Brasília
    const brasiliaDate = new Date(dateObj.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}))
    const formattedDate = brasiliaDate.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'America/Sao_Paulo'
    })
    lines.push(`🗓️ Data: ${formattedDate}`)
    lines.push(`🕐 Horário: ${selectedTime.value}`)
  }

  if (includeExtra && hasRealExtras.value) {
    lines.push('🧩 Extras selecionados:')
    for (const item of selectedExtras.value) {
      lines.push(`• ${item} ✅`)
    }
    if (extrasTotal.value > 0) {
      lines.push(`\n💰 Total dos extras: ${formatCurrencyBr(extrasTotal.value)}`)
    }

    // Mensagem especial para itens sem preço
    const missing = selectedExtras.value.filter((item) => parseCurrencyBr(item) == null)
    if (missing.length > 0) {
      const nomes = missing.map(n => `'${n}'`).join(', ')
      const phrase = props.greetingPrefix
        ? `No site não há informações de preço para este(s) serviço(s) ${nomes} e tenho interesse em agendar, poderia me ajudar?`
        : `Olá, vim do seu site, e no site nao tem informações de preço para este tipo de serviço ${nomes} e tenho interesse em agendar, poderia me ajudar?`
      lines.push(`\nℹ️ ${phrase}`)
    }
  }

  // Total geral com serviço principal caso tenha preço
  const servicePriceText = props.price ?? serviceLabel.value
  const servicePrice = parseCurrencyBr(servicePriceText)
  if (servicePrice != null && (servicePrice > 0 || extrasTotal.value > 0)) {
    const grandTotal = servicePrice + extrasTotal.value
    lines.push(`\n💵 Total geral (serviço + extras): ${formatCurrencyBr(grandTotal)}`)
  }

  lines.push('\nPor favor, poderia confirmar a disponibilidade? Obrigado! 🙏')

  const q = encodeURIComponent(lines.join('\n'))
  return `${base}?text=${q}`
}

const onClick = (e: Event) => {
  e.preventDefault()
  showScheduleModal.value = true
}

const closeScheduleModal = () => {
  showScheduleModal.value = false
  selectedDate.value = ''
  selectedTime.value = ''
  // Reset informações do pet para valores padrão
  selectedPetSize.value = props.petSize || 'pequeno'
  selectedCoatType.value = props.coatType || 'curto'
  selectedHairRemoval.value = props.withHairRemoval || false
  // Reset para mês atual
  const today = getBrasiliaDate()
  currentMonth.value = today.getMonth()
  currentYear.value = today.getFullYear()
}

const proceedToExtras = () => {
  showScheduleModal.value = false
  if (hasExtras.value) {
    showModal.value = true
  } else {
    schedule(false)
  }
}

const closeModal = () => { showModal.value = false }
const schedule = (includeExtra: boolean) => {
  const url = buildWhatsUrl(includeExtra)
  const win = window.open(url, '_blank')
  if (!win || win.closed || typeof win.closed === 'undefined') {
    const fallback = document.createElement('div')
    fallback.setAttribute('role', 'alert')
    fallback.setAttribute('aria-live', 'assertive')
    fallback.textContent = 'Não foi possível abrir o WhatsApp. Redirecionando…'
    fallback.className = 'sr-only'
    document.body.appendChild(fallback)
    window.location.href = url
  }
  closeModal()
}
</script>

<style scoped>
button { border-color: var(--color-card-border); color: var(--color-text); background: transparent; }
button:hover { border-color: var(--pet-primary); color: var(--pet-primary); }
.extras-overlay, .schedule-overlay { z-index: 10000; }
.extras-content, .schedule-content { box-shadow: var(--shadow-lg); }
.extras-close, .schedule-close { transition: background-color 0.2s; }
.extras-close:hover, .schedule-close:hover { background: rgba(0,0,0,0.7); }

.date-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.date-button:not(:disabled):hover {
  border-color: var(--pet-primary);
  color: var(--pet-primary);
}

.time-button:hover {
  border-color: var(--pet-primary);
  color: var(--pet-primary);
}

@media (prefers-reduced-motion: reduce) {
  .date-button, .time-button {
    transition: none;
  }
}

.extras-item { display: grid; grid-template-columns: auto 1fr 18px; align-items: center; column-gap: 8px; width: 100%; }
.extras-item > .image-cell { justify-self: end; position: relative; width: 18px; height: 18px; overflow: visible; z-index: 2; }
.arrow-down { position: absolute; left: 50%; transform: translateX(-50%); top: -16px; width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 12px solid var(--pet-primary); filter: drop-shadow(0 1px 1px rgba(0,0,0,0.3)); animation: nudge 1.6s ease-in-out infinite; }
@keyframes nudge { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(2px); } }
</style>
