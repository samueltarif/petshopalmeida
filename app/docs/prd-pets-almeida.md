# PRD — Landing Page Pets Almeida

## Visão Geral
- Projeto: Página institucional para Pets Almeida (banho, tosa e táxi dog).
- Objetivo: Informar serviços, preços e formas de contato, facilitando o agendamento via WhatsApp/telefone.
- Fonte: `index (1).html` (landing estática em português, Brasil).

## Objetivos do Produto
- Exibir serviços com preços e observações de disponibilidade de forma clara.
- Destacar CTA de agendamento e contato rápido (telefone e WhatsApp).
- Descrever formas de pagamento aceitas.
- Reforçar credibilidade com seção “Sobre” e destaques.
- Garantir navegação simples, responsiva e suave entre seções.

## Escopo Funcional
- Navbar fixa com links âncora para seções: `#home`, `#sobre`, `#servicos`, `#pagamento`, `#contato`.
- Menu móvel com botão toggle (`☰` ↔ `✕`) que abre/fecha a navegação.
- Scroll suave com compensação do header fixo.
- CTA “Agende Agora” apontando para `#contato`.
- Interações de fade-in (entrada animada) em cartões quando entram na viewport.

## Usuários e Cenários
- Proprietários de pets na região do Limão – São Paulo.
- Cenários principais:
  - Ver rapidamente serviços e preços antes de agendar.
  - Abrir WhatsApp com mensagem pré-preenchida.
  - Ligar direto no número exibido.
  - Consultar formas de pagamento.

## Arquitetura de Informação
- Header (logo, botão menu mobile, navegação âncora).
- Home (Hero): título, tagline, CTA de agendamento, telefone.
- Sobre: texto institucional, destaques (Profissionais, Táxi Dog, Localização).
- Serviços: grid com múltiplos cards, cada um com ícone, título, descrição/tabela.
- Pagamento: grid com métodos (Crédito, Débito, Pix, Dinheiro) e nota de taxa.
- Contato: telefone, Instagram, endereço, botão WhatsApp.
- Footer: direitos e assinatura.

## Conteúdo (texto e dados)
- Hero:
  - Título: “🐾 Pets Almeida”.
  - Tagline: “Cuidado e carinho para seu pet”.
  - CTA: “Agende Agora” → `#contato`.
  - Telefone: `tel:+5511993602794` (exibição: `(11) 99360-2794`).
- Sobre:
  - Localização: “Av. Inajar de Souza, 3823 — Limão, São Paulo”.
  - Destaques: Profissionais Experientes; Táxi Dog; Localização.
- Serviços (cards):
  1) Taxi Dog
     - Ícone: 🚗
     - Descrição: “Fazemos TAXI DOG”
     - Disponibilidade: SOMENTE SÁBADO
     - Preços por distância:
       - 1–2 km: R$ 10,00; 2–4 km: R$ 20,00; 4–6 km: R$ 40,00; 6–10 km: R$ 60,00; 10–15 km: R$ 80,00.
  2) Táxi Pet para Consulta
     - Ícone: 🏥
     - Lista: Hospitais, Clínicas Veterinárias, Consultas/Exames, Castrações.
  3) Banho e Tosa Higiênica
     - Ícone: 🛁
     - Tabela por porte: Mini (Banho R$ 35; Tosa Hig. R$ 10), Pequeno (R$ 45; R$ 20), Médio (R$ 60; R$ 30), Grande (R$ 75; R$ 40).
  4) Somente Banho
     - Ícone: 🚿
     - Tabela por porte: Mini R$ 35, Pequeno R$ 45, Médio R$ 60, Grande R$ 75.
  5) Banho Spitz (Lulu da Pomerânia)
     - Ícone: ✨
     - Tabela por porte: Mini R$ 45, Pequeno R$ 60, Médio R$ 75, Grande R$ 85.
  6) Tosa na Tesoura
     - Ícone: ✂️
     - Tabela por porte: Mini R$ 50, Pequeno R$ 65, Médio R$ 80, Grande R$ 95.
  7) Banho Felinos
     - Ícone: 🐱
     - Nota: INCLUSO CORTE DE UNHA
     - Tabela: Banho a Seco (Filhote R$ 60; Adulto R$ 100), Banho Molhado (Filhote R$ 80; Adulto R$ 120).
  8) Tosa Padrão
     - Ícone: 🐕
     - Tabela por porte: Mini R$ 40, Pequeno R$ 50, Médio R$ 60, Grande R$ 80.
  9) Tosa Zero
     - Ícone: 🪒
     - Tabela por porte: Mini R$ 45, Pequeno R$ 55, Médio R$ 65, Grande R$ 90.
- Pagamento:
  - Métodos: Cartão de Crédito 💳, Cartão de Débito 💳 (Taxa de maquininha: R$ 5,00), Pix 📱, Dinheiro 💵.
- Contato:
  - Telefone: `tel:+5511993602794`.
  - Instagram: `https://instagram.com/_pets_almeida` (exibição: `@_pets_almeida`).
  - Endereço: “Av. Inajar de Souza, 3823 — Limão, São Paulo — SP”.
  - WhatsApp: `https://wa.me/5511993602794?text=Olá!%20Gostaria%20de%20agendar%20um%20serviço%20para%20meu%20pet.`.

## Requisitos Funcionais (detalhados)
- Header fixo no topo; mantém navegação sempre disponível.
- Menu móvel:
  - Botão `#menuToggle` alterna classe `active` em `#mainNav`.
  - Texto do botão alterna entre `☰` e `✕`.
  - Ao clicar em qualquer link do `nav`, o menu fecha.
- Navegação âncora:
  - Todos os links internos `a[href^="#"]` realizam scroll suave.
  - Compensação automática da altura do header para posicionar início da seção corretamente.
- Animações:
  - IntersectionObserver adiciona classe `fade-in` em `.service-card`, `.payment-card`, `.highlight-item` quando entram na viewport.

## Requisitos de UI/UX
- Identidade visual:
  - Paleta customizada com tokens: `--pet-primary: #2B5F8D`, `--pet-secondary: #87CEEB`, `--pet-accent: #FFD700`.
  - CSS variables para cores, tipografia, espaçamento, sombras, raios, etc.
- Tipografia:
  - Fonte base: `FKGroteskNeue`, fallback modernos (ex.: Geist/Inter/Segoe UI).
- Modo escuro:
  - Suporte via `prefers-color-scheme: dark` com tokens ajustados.
- Layout responsivo:
  - Breakpoints: até 768px (menu móvel em overlay; grids 1 coluna), até 480px (redução de paddings e tipografia).
- Hero:
  - CTA destacado e telefone visível.
- Serviços:
  - Cards com ícones grandes, títulos e preços em tabela.
- Pagamento:
  - Grid com ícones e texto; exibir nota de taxa no débito.
- Contato:
  - Botão WhatsApp com rótulo “Agendar pelo WhatsApp”.

## Acessibilidade
- Contraste de cores adequado entre texto e superfícies.
- Foco visível com `focus-ring` e `focus-outline` definidos.
- Botão do menu com rótulo textual que muda (acompanhando estado).
- Links `tel:` e `target="_blank"` usados apropriadamente.

## SEO
- `lang="pt-BR"`, título “Pets Almeida — Cuidado e carinho para seu pet”.
- Meta description presente: “Pets Almeida — Banho, tosa e taxi dog em São Paulo...”.
- URLs consistentes e âncoras sem hashes quebrados.

## Desempenho e Técnicos
- JS leve e sem dependências externas.
- Fonte remota (`FKGroteskNeue.woff2`); avaliar preload se necessário.
- Animações e IntersectionObserver usam thresholds moderados (`0.1`).

## Regras de Negócio
- Táxi Dog: “SOMENTE SÁBADO”.
- Débito: aplicar “Taxa de maquininha: R$ 5,00”.
- Tabelas de preços conforme porte/tipo do serviço.

## Critérios de Aceite
- Navbar fixa, menu mobile abre/fecha e atualiza ícone.
- Clique em links do `nav` fecha menu e realiza scroll suave com offset.
- CTA do hero leva a `#contato`.
- Seção Serviços exibe todos os 9 cards e suas tabelas/listas.
- Seção Pagamento lista 4 métodos e a nota de taxa no débito.
- Seção Contato exibe telefone clicável, Instagram e endereço.
- Botão WhatsApp abre chat com mensagem pré-preenchida.
- Cards e destaques entram com animação `fade-in` ao rolar.
- Layout responsivo (desktop, tablet, mobile) sem quebra visual.
- Modo claro/escuro ajusta tokens de cor corretamente.

## Fora de Escopo (nesta versão)
- Agenda/checkout online com datas e pagamentos.
- Painel administrativo para atualização de preços.
- Integração com mapas e cálculo automático de distância para Táxi Dog.
- CMS para conteúdo dinâmico.

## Riscos e Dependências
- Preços e disponibilidade podem mudar; exigir revisão periódica.
- Dependência de WhatsApp e telefone para conversão.
- Fonte externa pode impactar performance se CDN estiver lento.

## Evoluções Futuras
- Formulário de agendamento com validação e API.
- Integração com Google Maps (rota e cálculo de distância).
- Galeria de fotos e depoimentos.
- Metadados sociais (Open Graph/Twitter) e Schema.org.
- Monitoramento de conversões (ex.: Google Analytics) e eventos de clique.