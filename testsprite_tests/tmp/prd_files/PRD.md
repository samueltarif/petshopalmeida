# PRD — Pets Almeida (Landing Page)

## Visão Geral
- Projeto: Página institucional para Pets Almeida (banho, tosa e táxi pet).
- Objetivo: Apresentar serviços, preços, pagamentos e contato, com agendamento fácil via WhatsApp/telefone.
- Público: Tutores de pets na região do Limão – São Paulo.

## Objetivos do Produto
- Destacar serviços e preços com clareza.
- Facilitar conversão com CTAs para WhatsApp e telefone.
- Comunicar formas de pagamento aceitas.
- Reforçar credibilidade com seção “Sobre” e destaques.
- Garantir navegação simples, responsiva e performática.

## KPIs e Métricas
- Cliques no botão WhatsApp.
- Cliques em `tel:` para ligações.
- Tempo médio na página e taxa de rolagem até “Contato”.
- Taxa de conversão por origem (orgânico, social, direto).

## Escopo Funcional (v1)
- Header fixo com navegação por âncoras: `Home`, `Sobre`, `Serviços`, `Pagamentos`, `Contato`.
- Menu móvel com botão toggle que abre/fecha a navegação.
- Scroll suave com compensação do header fixo.
- CTA “Agende Agora” levando à seção de contato.
- Cartões de serviços com ícones, títulos e tabelas de preços.
- Seção de pagamento com métodos aceitos e observações.
- Seção de contato com telefone, Instagram, endereço e botão WhatsApp.
- Animação de entrada (fade-in) para cartões ao entrar na viewport.

## Fluxos Principais
- Usuário acessa a Home, visualiza serviços e preços, aciona CTA e converte via WhatsApp/telefone.
- No mobile, usa menu hamburguer, navega por âncoras e converte.

## Conteúdo
- Identidade: “Pets Almeida — Cuidado e carinho para seu pet”.
- Localização: Av. Inajar de Souza, 3823 — Limão, São Paulo — SP.
- Contatos: Telefone `(11) 99360-2794`, Instagram `@_pets_almeida`, WhatsApp com mensagem pré-preenchida.
- Serviços (exemplos):
  - Táxi Dog (somente sábado) com preços por distância.
  - Táxi Pet para Consulta (Hospitais/Clínicas/Exames/Castrações).
  - Banho e Tosa Higiênica com tabela por porte.
  - Somente Banho; Banho Spitz; Tosa na Tesoura; Banho Felinos (inclui corte de unha);
    Tosa Padrão; Tosa Zero — com respectivas tabelas por porte.
- Pagamentos: Crédito, Débito (taxa de maquininha R$ 5,00), Pix, Dinheiro.

## Requisitos Funcionais
- Header fixo sempre visível.
- Menu móvel alterna entre abrir/fechar e atualiza ícone/rotulação.
- Navegação por âncoras com scroll suave e offset de header.
- CTA do hero direciona para contato.
- Cartões de serviços exibem preços e observações conforme regras de negócio.
- Botão WhatsApp abre conversa com mensagem padrão.
- Animações por IntersectionObserver ao entrar na viewport.

## Requisitos Não Funcionais
- Performance: carregamento rápido, assets otimizados, imagens comprimidas.
- Segurança: sem exposição de chaves; links externos seguros.
- Manutenibilidade: componentes reutilizáveis, estilos consistentes.
- Compatibilidade: suportar navegadores modernos e dispositivos móveis.

## UI/UX
- Paleta amigável e consistente com a marca.
- Tipografia legível e hierarquia clara.
- Layout responsivo com grids adaptáveis.
- Modo claro/escuro suportado.
- Foco visível e estados de interação claros.

## Acessibilidade
- Contraste adequado.
- Navegação por teclado; foco indicado.
- Botões e links com rótulos descritivos.
- Links `tel:` e WhatsApp utilizáveis por leitores de tela.

## SEO
- `lang="pt-BR"`, título e meta description descritivos.
- Estrutura semântica nas seções.
- Robots.txt e favicon presentes.

## Desempenho e Técnicos
- Framework: Nuxt 3 com componentes Vue e Tailwind CSS.
- Imagens em `public/images` otimizadas.
- IntersectionObserver com threshold moderado para animações.

## Regras de Negócio
- Táxi Dog disponível somente aos sábados.
- Débito com taxa fixa de R$ 5,00.
- Tabelas de preços por porte/tipo conforme serviço.

## Critérios de Aceite
- Navbar fixa funciona em desktop e mobile.
- Menu mobile abre/fecha e atualiza ícone/rotulação.
- Scroll suave com offset adequado ao header.
- CTA do hero leva à seção de contato.
- Serviços listados com preços e observações corretas.
- Pagamentos exibem quatro métodos e nota de taxa no débito.
- Contato exibe telefone clicável, Instagram e endereço.
- Botão WhatsApp abre chat com mensagem pré-preenchida.
- Cartões/destaques entram com animação ao rolar.
- Layout responsivo sem quebras; modo claro/escuro funciona.

## Fora de Escopo (v1)
- Agendamento online com calendário e pagamentos.
- Painel administrativo para edição de preços.
- Integração com mapas e cálculo automático de distância.
- CMS para conteúdo dinâmico.

## Riscos e Dependências
- Mudança frequente de preços/disponibilidade requer revisão.
- Conversão depende de WhatsApp/telefone.
- Desempenho pode variar com fontes/recursos externos.

## Entregáveis
- Landing page funcional com seções: Home, Sobre, Serviços, Pagamentos, Contato.
- Assets de imagens e ícones.
- Configurações de SEO básicas.

## Cronograma (exemplo)
- Semana 1: Estrutura, Hero, Header, Navegação e Responsividade.
- Semana 2: Serviços, Pagamentos, Contato, SEO e performance.

## Evoluções Futuras
- Formulário de agendamento com API.
- Integração com Google Maps.
- Galeria de fotos e depoimentos.
- Metadados sociais e Schema.org; analytics de eventos.