<template>
  <div>
    <HeaderBar />
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <PaymentsSection />
    <ContactSection />
    <FooterBar />
  </div>
</template>

<script setup lang="ts">
const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Pets Almeida",
  "description": "Banho, tosa e táxi dog em São Paulo",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Inajar de Souza, 3823",
    "addressLocality": "São Paulo",
    "addressRegion": "SP",
    "postalCode": "02717-000",
    "addressCountry": "BR"
  },
  "telephone": "+55-11-99360-2794",
  "url": "https://www.petsalmeida.com.br",
  "priceRange": "$$",
  "openingHours": "Mo-Sa 08:00-18:00"
}

useHead({
  title: 'Pets Almeida - Banho e Tosa em São Paulo Zona Norte',
  meta: [
    { name: 'description', content: 'Banho, tosa e táxi dog na Zona Norte de São Paulo. Atendimento profissional e carinhoso para seu pet em Cachoeirinha, Casa Verde e região.' },
    { name: 'keywords', content: 'banho e tosa, pet shop, zona norte, são paulo, cachoeirinha, casa verde, limão, vila penteado' },
    { property: 'og:title', content: 'Pets Almeida - Banho e Tosa' },
    { property: 'og:description', content: 'Cuidado profissional para seu pet na Zona Norte de SP' },
    { property: 'og:type', content: 'website' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(schemaOrg)
    }
  ]
})
</script>
