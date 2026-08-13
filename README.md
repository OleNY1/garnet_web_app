# garnet_web_app

Patient-facing web application prototype for the GARNET research project.

GARNET (Genetic indicators Assessment Referral Note and Education Tool) is an educational
website that helps people with kidney disease learn about genetic testing. It does not
provide diagnosis, medical advice, genetic counseling, or test results.

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (design tokens as CSS variables, class-based dark mode)
- lucide-react icons, Inter + Lora fonts (self-hosted via Fontsource)

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run preview  # preview the production build
```

## Project structure

```
src/
  index.css              Design system: color tokens, dark mode, base styles
  App.tsx                Page shell: skip link, header, main, footer
  pages/
    LandingPage.tsx      All landing page sections (hero, paths, benefits, ...)
  components/
    Header.tsx           Sticky nav with mobile menu and theme toggle
    Footer.tsx           Affiliation, links, medical disclaimer
    Button.tsx           Accessible button/link with variants
    Card.tsx             Rounded surface card
    Section.tsx          Page section with consistent width and headings
    StepCard.tsx         Numbered step for "How it works"
    TrustBadge.tsx       Credibility pill
    ThemeToggle.tsx      Light/dark mode switch (respects system preference)
```

Dark mode follows the visitor's system preference by default; the header toggle
saves an explicit choice in `localStorage`.
