<template>
  <section id="contato">
    <h2>Entre em Contato</h2>
  <div class="contact-content">
    <div class="contact-info">
        <ContactItem id="whatsapp-link" iconName="whatsapp" label="WhatsApp" value="Agendar horário" href="https://wa.me/5511993602794?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20servi%C3%A7o%20para%20meu%20pet." target="_blank" :hideText="false" />
        <ContactItem id="instagram-link" iconName="instagram" label="Instagram" value="Visite nosso Instagram!" href="https://instagram.com/_pets_almeida" target="_blank" :hideText="false" />
        <AddressLocationPanel id="address-panel" />

        <div class="reviews-cta">
          <AgendeAgoraButton
            id="google-reviews-button"
            aria-label="Ver avaliações no Google"
            label="Ver Avaliações no Google"
            target="_blank"
            href="https://www.google.com/search?q=pets+almeida+inajar+de+souza&sca_esv=fd5333ef45dac276&sxsrf=AE3TifMt2sGce0ttF2Lo0BIpd63ilC2KOA%3A1763236430319&ei=TtoYabKpE67V1sQPuKy02Ac&ved=0ahUKEwiyiNbI9_SQAxWuqpUCHTgWDXsQ4dUDCBE&uact=5&oq=pets+almeida+inajar+de+souza&gs_lp=Egxnd3Mtd2l6LXNlcnAiHHBldHMgYWxtZWlkYSBpbmFqYXIgZGUgc291emEyAhAmMggQABiABBiiBDIIEAAYgAQYogQyBRAAGO8FMggQABiiBBiJBTIIEAAYgAQYogRIsCRQAFjyI3ABeACQAQCYAc8BoAGTI6oBBjAuMjcuMbgBA8gBAPgBAZgCHaACzCXCAgoQIxiABBgnGIoFwgIKEC4YgAQYJxiKBcICBBAjGCfCAhMQLhiABBhDGMcBGIoFGI4FGK8BwgILEAAYgAQYsQMYgwHCAgUQABiABMICCxAuGIAEGNEDGMcBwgIKEAAYgAQYQxiKBcICExAuGIAEGLEDGNEDGEMYxwEYigXCAgoQLhiABBhDGIoFwgIIEAAYgAQYkgPCAgsQABiABBiSAxiKBcICEhAuGIAEGLEDGNEDGMcBGAoYC8ICDBAAGIAEGJIDGAoYC8ICEhAuGIAEGMcBGAoYCxiOBRivAcICCBAuGIAEGNQCwgIQEC4YgAQY0QMYQxjHARiKBcICCxAuGIAEGLEDGNQCwgIOEC4YgAQYxwEYjgUYrwHCAggQABiABBixA8ICBRAuGIAEwgIQEC4YgAQYxwEYChiOBRivAcICDRAuGIAEGMcBGAoYrwHCAgYQABgWGB7CAggQABgWGAoYHsICBxAhGKABGAqYAwCSBwYxLjI0LjSgB63vAbIHBjAuMjQuNLgHxSXCBwowLjEuMTguOS4xyAf_AQ&sclient=gws-wiz-serp#lrd=0x94cef91ef0ec539b:0x9e6b6201b189b3f5,1,,,,"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ContactItem from '~/components/ContactItem.vue'
import AddressLocationPanel from '~/components/AddressLocationPanel.vue'
import AgendeAgoraButton from '~/components/AgendeAgoraButton.vue'
</script>

<style scoped>
#contato { background: var(--color-bg-2); }
.contact-content { max-width: 800px; margin: 0 auto; }
.contact-info { background: var(--color-surface); border: 1px solid var(--color-card-border); border-radius: var(--radius-lg); padding: var(--space-32); margin-bottom: var(--space-32); box-shadow: var(--shadow-sm); }
.reviews-cta { margin-top: var(--space-24); display: flex; justify-content: center; }
</style>