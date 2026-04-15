---
inclusion: fileMatch
fileMatchPattern: "**/*.vue"
---

# Padrões de Componentes Vue

## Template de Componente Base

```vue
<script setup lang="ts">
// Imports
import { ref, computed } from 'vue'

// Props
interface Props {
  title: string
  description?: string
}

const props = defineProps<Props>()

// Emits
interface Emits {
  (e: 'click', value: string): void
}

const emit = defineEmits<Emits>()

// State & Logic
const isActive = ref(false)

const handleClick = () => {
  emit('click', props.title)
}
</script>

<template>
  <div class="component-wrapper">
    <h2>{{ title }}</h2>
    <p v-if="description">{{ description }}</p>
  </div>
</template>

<style scoped>
/* Apenas se necessário CSS específico */
</style>
```

## Boas Práticas

### Nomenclatura
- Componentes de serviço: `Service*.vue` (ex: `ServiceBanhoFelinos.vue`)
- Ícones 3D: `*3DIcon.vue` (ex: `Dog3DIcon.vue`)
- Seções: `*Section.vue` (ex: `HeroSection.vue`)
- Componentes de UI: Nomes descritivos (ex: `MenuToggle.vue`)

### Organização
- Agrupe componentes relacionados em subpastas (ex: `components/services/`)
- Mantenha componentes pequenos e focados
- Extraia lógica complexa para composables

### Props
- Sempre defina tipos TypeScript
- Use valores padrão quando apropriado
- Documente props complexas com comentários

### Emits
- Declare todos os eventos explicitamente
- Use nomes descritivos (ex: `update:modelValue`, `submit`, `close`)
- Passe dados relevantes com o evento

### Acessibilidade
- Use tags semânticas HTML
- Adicione `aria-label` quando necessário
- Garanta navegação por teclado
- Teste com leitores de tela

### Performance
- Use `v-once` para conteúdo estático
- Use `v-memo` para listas grandes
- Lazy load componentes pesados com `defineAsyncComponent`
- Otimize imagens com atributos `loading="lazy"`

## Componentes de Serviço

Para componentes em `app/components/services/`:
- Devem exibir informações sobre um serviço específico
- Incluir imagens, descrição e preço
- Ter botão de agendamento via WhatsApp
- Seguir layout consistente com outros serviços
