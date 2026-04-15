---
inclusion: always
---

# Tech Stack & Build System

## Core Technologies

- **Framework**: Nuxt 4 (latest stable)
- **UI Framework**: Vue 3 with Composition API
- **Styling**: Tailwind CSS v6 + custom CSS variables
- **Language**: TypeScript (strict mode enabled)
- **Runtime**: Node.js (see `.node-version` and `.nvmrc`)
- **Package Manager**: npm

## Key Dependencies

### Production
- `nuxt` - Framework core
- `vue` - Reactive UI framework
- `vue-router` - Client-side routing
- `@nuxtjs/tailwindcss` - Tailwind integration
- `@vercel/analytics` - Analytics tracking
- `nuxt-purgecss` - CSS optimization

### Development
- `typescript` - Type checking
- `vue-tsc` - Vue TypeScript compiler
- `eslint` - Code linting
- `@typescript-eslint/*` - TypeScript ESLint rules
- `eslint-plugin-vue` - Vue-specific linting

## Build & Development Commands

### Development
```bash
npm run dev              # Start dev server (http://localhost:3000)
npm run typecheck        # Run TypeScript type checking
npm run lint             # Lint code with ESLint
```

### Production
```bash
npm run build            # Build for production (SSR)
npm run generate         # Generate static site (SSG)
npm run preview          # Preview production build locally
```

### Testing
```bash
npm run test             # Run all tests
npm run test:health      # System health checks
npm run test:functional  # Functional tests
npm run test:performance # Performance tests
npm run test:quick       # Quick validation
npm run security-test    # Security audit suite
```

### Post-Install
```bash
npm run postinstall      # Auto-runs after npm install (nuxt prepare)
```

## Deployment

- **Platform**: Vercel (configured via `vercel.json`)
- **Preset**: `vercel` (configured in `nuxt.config.ts`)
- **Build Command**: `npm run build`
- **Output Directory**: `.output`
- **Node Version**: Specified in `.node-version` and `.nvmrc`

## Configuration Files

- `nuxt.config.ts` - Nuxt configuration (modules, build, nitro)
- `tailwind.config.ts` - Tailwind customization
- `eslint.config.cjs` - ESLint rules
- `tsconfig.json` - TypeScript compiler options
- `vercel.json` - Vercel deployment settings

## Security Headers

Configured in `nuxt.config.ts` under `nitro.routeRules`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: no-referrer
- Permissions-Policy: restrictive
- Strict-Transport-Security: HSTS enabled
- Cross-Origin-Opener-Policy: same-origin
- Content-Security-Policy: production only

## Environment-Specific Behavior

- **Development**: Cache disabled, CSP relaxed, analytics disabled on localhost
- **Production**: Full security headers, CSP enforced, analytics enabled

## Font Loading

- Google Fonts (Inter, Plus Jakarta Sans) with preconnect optimization
- Custom font (FKGroteskNeue) loaded from CDN with woff2 format

## CSS Architecture

- Design tokens in `app/assets/css/theme.css` (CSS variables)
- Tailwind utilities in `assets/css/tailwind.css`
- Vercel-specific fixes in `assets/css/vercel-fixes.css`
- Component-scoped styles in `.vue` files
