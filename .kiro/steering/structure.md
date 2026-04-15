---
inclusion: always
---

# Project Structure

## Root Directory Layout

```
petshopalmeida-master/
├── .kiro/                    # Kiro AI configuration
│   └── steering/             # AI steering rules
├── .trae/                    # Documentation artifacts
│   └── documents/            # Security audit docs
├── app/                      # Nuxt application root
│   ├── components/           # Vue components
│   ├── pages/                # Route pages
│   ├── assets/               # Processed assets
│   ├── docs/                 # Product documentation
│   └── app.vue               # Root app component
├── assets/                   # Global assets
│   └── css/                  # Global stylesheets
├── public/                   # Static files (served as-is)
│   ├── images/               # Service images
│   ├── robots.txt            # SEO crawler rules
│   └── sitemap.xml           # SEO sitemap
├── security-tests/           # Security test suite
│   ├── tests/                # Individual test files
│   ├── reports/              # Test results
│   └── run_all.js            # Test runner
├── tests/                    # Application tests
├── nuxt.config.ts            # Nuxt configuration
├── package.json              # Dependencies & scripts
└── vercel.json               # Vercel deployment config
```

## App Directory (`app/`)

### Components (`app/components/`)

Component organization follows a flat structure with semantic naming:

**Layout Components**
- `HeaderBar.vue` - Site header with navigation
- `FooterBar.vue` - Site footer
- `NavMenu.vue` - Navigation menu
- `MenuToggle.vue` - Mobile menu toggle

**Section Components**
- `HeroSection.vue` - Hero/banner section
- `ServicesSection.vue` - Services grid section
- `PaymentsSection.vue` - Payment methods section
- `ContactSection.vue` - Contact information section
- `HighlightsSection.vue` - Feature highlights

**Service Components** (`app/components/services/`)
- Individual service detail components
- Naming: `Service*.vue` (e.g., `ServiceBanhoFelinos.vue`)
- Each represents a specific service offering

**Icon Components**
- 3D icons: `*3DIcon.vue` (e.g., `Dog3DIcon.vue`, `Bath3DIcon.vue`)
- Fallback: `IconFallback.vue`
- Utility: `ThreeDIcon.vue`

**UI Components**
- `ServiceCard.vue` - Service display card
- `ContactItem.vue` - Contact info item
- `ScheduleButton.vue` - CTA button
- `AgendeAgoraButton.vue` - Schedule now button

**Special Components**
- `LocalBusinessSchema.vue` - SEO structured data
- `AddressLocationPanel.vue` - Location display
- `HoloDog.vue`, `HeroPaws.vue`, `AnimePaw.vue` - Decorative elements

### Pages (`app/pages/`)

Nuxt file-based routing structure:

```
pages/
├── index.vue                 # Homepage (/)
├── bairros.vue              # Neighborhoods listing (/bairros)
└── bairro/                  # Neighborhood pages (/bairro/*)
    ├── index.vue            # Neighborhoods index
    ├── [slug].vue           # Dynamic neighborhood page
    ├── brasilandia.vue      # Specific neighborhoods
    ├── cachoeirinha.vue
    ├── casa-verde.vue
    ├── eliza-maria.vue
    ├── limao.vue
    └── vila-penteado.vue
```

**Routing Conventions**
- `index.vue` = route root
- `[slug].vue` = dynamic route parameter
- Folder name = route segment

### Assets (`app/assets/css/`)

- `theme.css` - Design system tokens (CSS variables)

## Global Assets (`assets/css/`)

- `tailwind.css` - Tailwind imports and base styles
- `vercel-fixes.css` - Platform-specific fixes

## Public Directory (`public/`)

Static files served directly without processing:

### Images (`public/images/`)
- Service photos (e.g., `Banho Felinos.jpg`, `Tosa Padrão.jpg`)
- Multiple variants per service (numbered: `1.jpg`, `2.jpg`, etc.)
- Cover image: `foto_capa.png`
- Pet photos: `dog.jpg`, `toby.jpg`, `splitz.png`

**Image Naming Convention**
- Service images: `[Service Name].jpg` or `[Service Name][number].jpg`
- Lowercase for generic: `dog.jpg`, `hidratação.jpg`
- Title case for services: `Somente Banho.jpg`

### SEO Files
- `robots.txt` - Search engine crawler directives
- `sitemap.xml` - Site structure for search engines

## Security Tests (`security-tests/`)

Standalone security audit suite:

```
security-tests/
├── tests/                   # Test implementations
│   ├── test_xss.js
│   ├── test_sql_injection.js
│   ├── test_csrf.js
│   ├── test_bruteforce.js
│   └── ... (10 total tests)
├── reports/                 # Test results (JSON + MD)
├── config.json             # Test configuration
├── utils.js                # Shared utilities
├── run_all.js              # Main test runner
└── package.json            # Separate dependencies
```

## Configuration Files (Root)

- `nuxt.config.ts` - Nuxt framework config
- `tailwind.config.ts` - Tailwind CSS config
- `eslint.config.cjs` - ESLint rules
- `.eslintrc.cjs` - ESLint legacy config
- `tsconfig.json` - TypeScript compiler options
- `vercel.json` - Vercel deployment settings
- `.node-version` - Node version for tooling
- `.nvmrc` - Node version for nvm
- `.gitignore` - Git ignore patterns

## Key Patterns

### Component Location
- Reusable UI components → `app/components/`
- Service-specific → `app/components/services/`
- Icons → `app/components/*Icon.vue`

### Page Location
- Main pages → `app/pages/*.vue`
- Nested routes → `app/pages/[folder]/`
- Dynamic routes → `app/pages/[folder]/[slug].vue`

### Asset Location
- Processed CSS → `app/assets/css/` or `assets/css/`
- Static images → `public/images/`
- Static files → `public/`

### Import Paths
- Components: `~/components/ComponentName.vue`
- Assets: `~/assets/path/to/file`
- Public: `/path/to/file` (no prefix)
- Composables: `#imports` (auto-imported)
