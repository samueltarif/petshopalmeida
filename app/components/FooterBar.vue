<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="brand-row" aria-label="Identidade visual">
        <svg class="paw-logo" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g fill="currentColor">
            <circle cx="18" cy="20" r="6" />
            <circle cx="30" cy="14" r="6" />
            <circle cx="42" cy="18" r="6" />
            <circle cx="50" cy="28" r="6" />
            <path d="M32 30c-8 0-16 6-16 14 0 6 4 10 10 10h12c6 0 10-4 10-10 0-8-8-14-16-14z" />
          </g>
        </svg>
        <span class="brand-name">Banho, Tosa e Táxi Dog em São Paulo</span>
      </div>
      <p class="footer-tagline">Cuidados especiais para seu melhor amigo</p>
      <div class="social-row" aria-label="Redes sociais">
        <a class="social-link" href="https://wa.me/5511993602794?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20servi%C3%A7o%20para%20meu%20pet." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="currentColor" d="M12 2a10 10 0 0 0-8.66 15.27L2 22l4.86-1.28A10 10 0 1 0 12 2Zm5.26 14.35c-.22.63-1.28 1.19-1.77 1.22-.47.03-1.06.07-3.69-1.16-3.12-1.51-5.13-4.44-5.29-4.64-.15-.2-1.27-1.69-1.27-3.24 0-1.55.8-2.3 1.08-2.62.28-.33.6-.41.8-.41h.58c.19 0 .44-.07.69.53.26.63.9 2.18.98 2.34.08.16.13.34.02.54-.1.2-.16.33-.31.51-.15.17-.33.38-.47.51-.15.12-.3.26-.13.52.16.26.71 1.17 1.52 1.9 1.05.93 1.93 1.23 2.2 1.37.27.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.28.37-.23.62-.14.25.1 1.57.74 1.84.87.27.13.45.2.52.31.07.11.07.64-.15 1.27Z"/>
          </svg>
        </a>
        <a class="social-link" href="https://instagram.com/_pets_almeida" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm6.5-.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z"/>
          </svg>
        </a>
      </div>
      <div class="legal-row" aria-label="Links legais">
        <a href="#termos" class="legal-link">Termos de Uso</a>
      </div>
      <p class="copyright">© 2025 Banho, Tosa e Táxi Dog em São Paulo. Todos os direitos reservados.</p>
      <p class="made-with">Desenvolvido com <span class="heart">❤</span> para pets</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer { background: var(--color-surface); border-top: 1px solid var(--color-card-border); padding: var(--space-32) var(--space-20); text-align: center; }
.site-footer .footer-inner { max-width: 800px; margin: 0 auto; }
.brand-row { display: flex; align-items: center; justify-content: center; gap: var(--space-12); margin-bottom: var(--space-12); }
.paw-logo { width: 28px; height: 28px; color: var(--pet-primary); }
.brand-name { font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-text); }
.footer-tagline { color: var(--color-text-secondary); margin-bottom: var(--space-16); font-size: var(--font-size-base); }
.social-row { display: flex; align-items: center; justify-content: center; gap: var(--space-16); margin: var(--space-16) 0; }
.social-link { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--color-secondary); border: 1px solid var(--color-card-border); transition: all var(--duration-fast) var(--ease-standard); }
.social-link:hover { background: var(--color-secondary-hover); border-color: var(--pet-primary); transform: translateY(-2px); }
.social-link svg { width: 20px; height: 20px; color: var(--color-text); }
.legal-row { display: flex; align-items: center; justify-content: center; gap: var(--space-16); margin: var(--space-8) 0 var(--space-12); }
.legal-link { color: var(--color-text-secondary); font-size: var(--font-size-sm); text-decoration: none; }
.legal-link:hover { color: var(--pet-primary); text-decoration: underline; }
.copyright { color: var(--color-text-secondary); font-size: var(--font-size-sm); }
.made-with { color: var(--color-text-secondary); font-size: var(--font-size-sm); }
.made-with .heart { color: var(--pet-primary); }
</style>