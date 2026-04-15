<template>
  <!-- Schema será injetado via useHead -->
</template>

<script setup>
const props = defineProps({
  businessName: String,
  description: String,
  neighborhood: String
})

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://banho-tosa-taxi-dog-sp.vercel.app",
  "name": props.businessName || "Banho, Tosa e Táxi Dog em São Paulo",
  "description": props.description || "Serviços especializados de banho, tosa e táxi dog em São Paulo. Atendimento domiciliar e transporte para pets.",
  "url": "https://banho-tosa-taxi-dog-sp.vercel.app",
  "telephone": "+5511993602794",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Inajar de Souza, 3823",
    "addressLocality": props.neighborhood || "Cachoeirinha",
    "addressRegion": "SP",
    "postalCode": "02717-000",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-23.4894",
    "longitude": "-46.7358"
  },
  "openingHours": [
    "Mo-Fr 08:00-18:00",
    "Sa 08:00-16:00"
  ],
  "priceRange": "$$",
  "servesCuisine": [],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços Pet",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Banho Completo",
          "description": "Banho, secagem e perfumação para pets"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Tosa Profissional",
          "description": "Tosa higiênica e estética especializada"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Táxi Dog",
          "description": "Transporte especializado para pets"
        }
      }
    ]
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "São Paulo",
      "containsPlace": [
        { "@type": "Neighborhood", "name": "Limão" },
        { "@type": "Neighborhood", "name": "Cachoeirinha" },
        { "@type": "Neighborhood", "name": "Vila Penteado" },
        { "@type": "Neighborhood", "name": "Brasilândia" },
        { "@type": "Neighborhood", "name": "Eliza Maria" },
        { "@type": "Neighborhood", "name": "Casa Verde" }
      ]
    }
  ],
  "sameAs": [
    "https://instagram.com/_pets_almeida"
  ]
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd)
    }
  ]
})
</script>