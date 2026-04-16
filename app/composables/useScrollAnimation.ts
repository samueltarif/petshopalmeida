import { onMounted, onUnmounted } from 'vue'

export const useScrollAnimation = () => {
  let observer: IntersectionObserver | null = null

  const observeElements = () => {
    // Adiciona classe ao body para indicar que JS está carregado
    document.body.classList.add('js-loaded')
    
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            entry.target.classList.remove('animate-out')
          }
        })
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )
    
    // Observar todos os elementos com a classe animate-on-scroll
    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer?.observe(el))
    
    return observer
  }
  
  onMounted(() => {
    // Pequeno delay para garantir que o DOM está pronto
    setTimeout(() => {
      observeElements()
    }, 100)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return { observeElements }
}
