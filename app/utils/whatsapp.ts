export const sendWhatsAppMessage = (message: string) => {
  const phone = '5511993602794'
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}

export const whatsappMessages = {
  agendar: 'Olá! Gostaria de agendar um serviço para meu pet.',
  informacoes: 'Olá! Gostaria de mais informações sobre os serviços.',
  precos: 'Olá! Gostaria de saber os preços dos serviços.'
}
