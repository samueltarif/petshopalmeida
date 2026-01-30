<template>
  <section id="pagamento">
    <h2>Formas de Pagamento</h2>
    <div class="payment-grid">
      <div class="payment-card">
        <div class="payment-icon"><CreditCard3DIcon /></div>
        <div class="payment-method">Cartão de Crédito</div>
      </div>
      <div class="payment-card">
        <div class="payment-icon"><CreditCard3DIcon /></div>
        <div class="payment-method">Cartão de Débito</div>
        <div class="payment-note">Taxa de maquininha: R$ 5,00</div>
      </div>
      <div class="payment-card">
        <div class="payment-icon"><PixIcon /></div>
        <div class="payment-method">Pix</div>
      </div>
      <div class="payment-card">
        <div class="payment-icon"><Dollar3DIcon /></div>
        <div class="payment-method">Dinheiro</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import CreditCard3DIcon from '~/components/CreditCard3DIcon.vue'
import Dollar3DIcon from '~/components/Dollar3DIcon.vue'
import PixIcon from '~/components/PixIcon.vue'
</script>

<style scoped>
.payment-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--space-20); max-width: 900px; margin: 0 auto; }
.payment-card { background: var(--color-surface); border: 1px solid var(--color-card-border); border-radius: var(--radius-lg); padding: var(--space-24); text-align: center; box-shadow: var(--shadow-sm); transition: all var(--duration-normal) var(--ease-standard); }
.payment-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.payment-icon { font-size: 48px; margin-bottom: var(--space-12); }
.payment-method { font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); margin-bottom: var(--space-8); color: var(--color-text); }
.payment-note { font-size: var(--font-size-sm); color: var(--color-text-secondary); font-style: italic; }
@media (max-width: 640px) {
  .payment-grid { grid-template-columns: 1fr; }
}
</style>