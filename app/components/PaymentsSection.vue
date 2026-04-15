<template>
  <section id="pagamento">
    <h2>Formas de Pagamento</h2>
    <div class="payment-grid">
      <div class="payment-card">
        <div class="payment-icon">💳</div>
        <div class="payment-method">Cartão de Crédito</div>
      </div>
      <div class="payment-card">
        <div class="payment-icon">💳</div>
        <div class="payment-method">Cartão de Débito</div>
        <div class="payment-note">Taxa de maquininha: R$ 5,00</div>
      </div>
      <div class="payment-card">
        <div class="payment-icon">💰</div>
        <div class="payment-method">Pix</div>
      </div>
      <div class="payment-card">
        <div class="payment-icon">💵</div>
        <div class="payment-method">Dinheiro</div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Usando emojis simples para melhor compatibilidade no Vercel
</script>

<style scoped>
.payment-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
  gap: 20px; 
  max-width: 900px; 
  margin: 0 auto; 
}

.payment-card { 
  background: #FFFFFF; 
  border: 1px solid #E5E7EB; 
  border-radius: 12px; 
  padding: 24px; 
  text-align: center; 
  box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
  transition: all 0.3s ease; 
}

.payment-card:hover { 
  transform: translateY(-2px); 
  box-shadow: 0 4px 12px rgba(0,0,0,0.15); 
}

.payment-icon { 
  font-size: 48px; 
  margin-bottom: 12px; 
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
}

.payment-method { 
  font-size: 18px; 
  font-weight: 600; 
  margin-bottom: 8px; 
  color: #1F2937; 
}

.payment-note { 
  font-size: 14px; 
  color: #6B7280; 
  font-style: italic; 
}

@media (max-width: 640px) {
  .payment-grid { 
    grid-template-columns: 1fr; 
    gap: 16px;
  }
  
  .payment-card {
    padding: 20px;
  }
}
</style>