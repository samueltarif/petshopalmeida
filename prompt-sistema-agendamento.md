# Prompt: Sistema de Agendamento de Serviços para Pets

## Objetivo
Implementar um sistema completo de agendamento de serviços para pets com seleção de características do animal, cálculo automático de duração e calendário interativo, exatamente como mostrado na referência visual.

---

## Especificações Visuais e Funcionais

### Layout Geral
- Design clean e moderno
- Fundo branco com bordas arredondadas
- Espaçamento generoso entre elementos
- Responsivo (mobile-first)

---

## Componente 1: Informações do Pet

### Estrutura Visual
```
┌─────────────────────────────────────┐
│ 🐾 Informações do Pet               │
│                                     │
│ Porte:                              │
│ ┌─────────────────────────────┐    │
│ │ Pequeno                  ▼  │    │
│ └─────────────────────────────┘    │
│                                     │
│ Tipo de pelo:                       │
│ ┌─────────────────────────────┐    │
│ │ Pelo curto               ▼  │    │
│ └─────────────────────────────┘    │
│                                     │
│ ┌─────────────────────────────┐    │
│ │ ⏱️ Duração estimada: 40 min │    │
│ │ + 15 minutos para limpeza   │    │
│ │   e organização             │    │
│ └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### Requisitos Técnicos

#### Campo: Porte
**Tipo:** Select dropdown  
**Opções:**
- Mini
- Pequeno
- Médio
- Grande

**Estilo:**
- Largura: 100%
- Padding: 12px 16px
- Border: 1px solid #E0E0E0
- Border-radius: 8px
- Font-size: 16px
- Background: white
- Ícone dropdown: seta para baixo (▼)

#### Campo: Tipo de Pelo
**Tipo:** Select dropdown  
**Opções:**
- Pelo curto
- Pelo médio
- Pelo longo
- Pelo cacheado

**Estilo:** Idêntico ao campo Porte

#### Box de Duração Estimada
**Características:**
- Background: #F0F4FF (azul muito claro)
- Border-radius: 8px
- Padding: 16px
- Margin-top: 16px

**Conteúdo:**
- Ícone: ⏱️ (relógio)
- Texto principal: "Duração estimada: **[X] minutos**" (negrito no número)
- Cor do texto principal: #4A90E2 (azul)
- Texto secundário: "+ 15 minutos para limpeza e organização dos equipamentos"
- Cor do texto secundário: #999999 (cinza claro)
- Font-size texto principal: 16px
- Font-size texto secundário: 14px

### Lógica de Cálculo de Duração

```typescript
// Duração base por porte (em minutos)
const baseDuration = {
  'Mini': 30,
  'Pequeno': 40,
  'Médio': 50,
  'Grande': 60
}

// Multiplicador por tipo de pelo
const furMultiplier = {
  'Pelo curto': 1.0,
  'Pelo médio': 1.2,
  'Pelo longo': 1.5,
  'Pelo cacheado': 1.3
}

// Cálculo final
duration = Math.round(baseDuration[porte] * furMultiplier[tipoPelo])
```

**Exemplos de cálculo:**
- Pequeno + Pelo curto = 40 minutos
- Médio + Pelo longo = 75 minutos (50 × 1.5)
- Grande + Pelo cacheado = 78 minutos (60 × 1.3)

---

## Componente 2: Calendário de Agendamento

### Estrutura Visual
```
┌─────────────────────────────────────┐
│ Selecione a data:                   │
│                                     │
│  ←      Abril 2026        →        │
│                                     │
│ Dom Seg Ter Qua Qui Sex Sáb        │
│                                     │
│ [29][30][31][ 1][ 2][ 3][ 4]       │
│ [ 5][ 6][ 7][ 8][ 9][10][11]       │
│ [12][13][14][15][16][17][18]       │
│ [19][20][21][22][23][24][25]       │
│ [26][27][28][29][30][ 1][ 2]       │
│ [ 3][ 4][ 5][ 6][ 7][ 8][ 9]       │
└─────────────────────────────────────┘
```

### Requisitos do Calendário

#### Header do Calendário
**Elementos:**
- Botão "←" (mês anterior)
- Texto central: "[Mês] [Ano]" (ex: "Abril 2026")
- Botão "→" (próximo mês)

**Estilo:**
- Display: flex, justify-content: space-between
- Botões: sem borda, apenas ícone
- Cor dos botões: #4A90E2
- Font-size botões: 24px
- Font-size mês/ano: 18px
- Font-weight mês/ano: 600
- Margin-bottom: 16px

#### Grid de Dias da Semana
**Elementos:**
- Dom, Seg, Ter, Qua, Qui, Sex, Sáb

**Estilo:**
- Display: grid
- Grid-template-columns: repeat(7, 1fr)
- Text-align: center
- Font-weight: 600
- Color: #666666
- Font-size: 14px
- Margin-bottom: 8px

#### Grid de Dias do Mês
**Layout:**
- Display: grid
- Grid-template-columns: repeat(7, 1fr)
- Gap: 4px
- 6 linhas (42 células) para cobrir todos os casos

**Cada célula (botão de dia):**
- Aspect-ratio: 1 (quadrado)
- Border: 1px solid #E0E0E0
- Border-radius: 8px
- Background: white
- Font-size: 14px
- Cursor: pointer
- Transition: all 0.2s ease

**Estados dos botões:**

1. **Normal (disponível):**
   - Background: white
   - Border: 1px solid #E0E0E0
   - Color: #333333

2. **Hover:**
   - Background: #F0F4FF
   - Border: 1px solid #4A90E2

3. **Selecionado:**
   - Background: #4A90E2
   - Color: white
   - Border: 1px solid #4A90E2

4. **Hoje (dia atual):**
   - Border: 2px solid #4A90E2
   - Font-weight: 700

5. **Desabilitado:**
   - Opacity: 0.3
   - Cursor: not-allowed
   - Não responde a hover

6. **Mês anterior/próximo:**
   - Opacity: 0.4
   - Color: #999999

### Regras de Disponibilidade

**Dias DESABILITADOS:**
- Datas passadas (antes de hoje)
- Domingos (dia da semana = 0)
- Dias que não pertencem ao mês atual (opcional: pode mostrar mas desabilitar)

**Dias HABILITADOS:**
- Data >= hoje
- Segunda a Sábado
- Pertence ao mês atual

### Lógica do Calendário

```typescript
// Gerar calendário do mês
function generateCalendar(year: number, month: number) {
  // 1. Primeiro dia do mês
  const firstDay = new Date(year, month, 1)
  const firstDayWeek = firstDay.getDay() // 0-6 (Dom-Sáb)
  
  // 2. Último dia do mês
  const lastDay = new Date(year, month + 1, 0)
  const totalDays = lastDay.getDate()
  
  // 3. Dias do mês anterior (para preencher início)
  const prevMonthDays = firstDayWeek
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  
  // 4. Dias do próximo mês (para preencher final)
  const totalCells = 42 // 6 semanas
  const nextMonthDays = totalCells - prevMonthDays - totalDays
  
  return {
    prevMonthDays,
    currentMonthDays: totalDays,
    nextMonthDays
  }
}

// Verificar se dia está disponível
function isAvailable(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const checkDate = new Date(date)
  checkDate.setHours(0, 0, 0, 0)
  
  // Não permitir datas passadas
  if (checkDate < today) return false
  
  // Não permitir domingos
  if (checkDate.getDay() === 0) return false
  
  return true
}
```

---

## Integração dos Componentes

### Fluxo de Dados

```typescript
interface ScheduleData {
  petSize: 'Mini' | 'Pequeno' | 'Médio' | 'Grande'
  furType: 'Pelo curto' | 'Pelo médio' | 'Pelo longo' | 'Pelo cacheado'
  estimatedDuration: number
  selectedDate: Date | null
  selectedTime?: string // Para implementação futura
}
```

### Validação

**Antes de permitir agendamento:**
1. ✅ Porte selecionado
2. ✅ Tipo de pelo selecionado
3. ✅ Data selecionada
4. ✅ Data é válida (não passada, não domingo)

### Ação de Agendamento

Quando todos os campos estiverem preenchidos e válidos:

```typescript
function handleSchedule(data: ScheduleData) {
  const phone = '5511993602794'
  
  // Formatar data
  const dateStr = data.selectedDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
  
  // Montar mensagem
  const message = `Olá! Gostaria de agendar um serviço:

📅 Data: ${dateStr}
🐾 Porte: ${data.petSize}
✂️ Tipo de pelo: ${data.furType}
⏱️ Duração estimada: ${data.estimatedDuration} minutos

Aguardo confirmação!`
  
  // Abrir WhatsApp
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}
```

---

## Implementação Vue 3 + TypeScript

### Estrutura de Arquivos

```
app/components/
├── ScheduleButton.vue          # Botão que abre modal
├── ScheduleModal.vue            # Modal container
├── PetInfoForm.vue              # Formulário de info do pet
├── CalendarPicker.vue           # Calendário
└── ScheduleConfirmation.vue     # Confirmação final
```

### Componente Principal

```vue
<template>
  <div class="schedule-system">
    <!-- Informações do Pet -->
    <div class="pet-info-section">
      <h3>🐾 Informações do Pet</h3>
      
      <div class="form-group">
        <label for="pet-size">Porte:</label>
        <select 
          id="pet-size"
          v-model="petSize"
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
          v-model="furType"
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
    
    <!-- Calendário -->
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
    
    <!-- Botão de Agendar -->
    <button
      v-if="canSchedule"
      @click="handleSchedule"
      class="btn-schedule-final"
    >
      Agendar via WhatsApp
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Estado
const petSize = ref('Pequeno')
const furType = ref('Pelo curto')
const selectedDate = ref<Date | null>(null)
const currentDate = ref(new Date())

// Cálculo de duração
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

// Validação
const canSchedule = computed(() => {
  return petSize.value && furType.value && selectedDate.value !== null
})

// Implementar funções do calendário...
</script>
```

---

## CSS Completo

```css
.schedule-system {
  max-width: 600px;
  margin: 0 auto;
}

.pet-info-section,
.calendar-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pet-info-section h3,
.calendar-section h3 {
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
}

.form-select:focus {
  outline: none;
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
}

.nav-button:hover {
  opacity: 0.7;
}

.month-year {
  font-size: 18px;
  font-weight: 600;
  color: #333;
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
}

.days-grid button:hover:not(:disabled) {
  background: #F0F4FF;
  border-color: #4A90E2;
}

.days-grid button.selected {
  background: #4A90E2;
  color: white;
  border-color: #4A90E2;
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
}

.btn-schedule-final:hover {
  background: #20BA5A;
}

@media (max-width: 768px) {
  .schedule-system {
    padding: 16px;
  }
  
  .pet-info-section,
  .calendar-section {
    padding: 16px;
  }
  
  .days-grid button {
    font-size: 12px;
  }
}
```

---

## Checklist de Implementação

- [ ] Criar estrutura de componentes
- [ ] Implementar seleção de porte do pet
- [ ] Implementar seleção de tipo de pelo
- [ ] Implementar cálculo de duração
- [ ] Criar lógica do calendário (geração de dias)
- [ ] Implementar navegação entre meses
- [ ] Implementar regras de disponibilidade
- [ ] Adicionar estados visuais (hover, selected, disabled, today)
- [ ] Implementar seleção de data
- [ ] Criar validação de formulário completo
- [ ] Implementar integração com WhatsApp
- [ ] Adicionar responsividade mobile
- [ ] Testar em diferentes navegadores
- [ ] Adicionar acessibilidade (ARIA labels, navegação por teclado)

---

## Resultado Esperado

Um sistema de agendamento completo e funcional que:
1. Permite selecionar características do pet
2. Calcula automaticamente a duração do serviço
3. Exibe calendário interativo com navegação
4. Desabilita datas inválidas (passadas e domingos)
5. Envia dados formatados via WhatsApp
6. É totalmente responsivo
7. Tem design limpo e profissional

**Tempo estimado de implementação:** 8-12 horas
