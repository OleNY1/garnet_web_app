# garnet_web_app

Merged GARNET web application for the patient-facing and doctor-facing experiences.

GARNET (Genetic indicators Assessment Referral Note and Education Tool) helps people with kidney disease and clinicians navigate education, genetic testing resources, referral workflows, and practical nephrology tools. It does not provide diagnosis, medical advice, genetic counseling, or test results.

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 with shared GARNET design tokens
- lucide-react icons
- Inter + Lora fonts via Fontsource

## Getting started

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Entry flow

The landing page at `/` is the shared entry point.

- `I am a patient` opens the patient-facing branch at `/learn`.
- `I am a doctor` opens the clinician-facing branch at `/doctor/dashboard`.

The doctor-facing branch is fully internal to this same app, so deployment only needs one website and one GitHub repo.

## Main routes

- `/` - shared Garnet landing page
- `/learn` - patient education
- `/check` - patient testing readiness check
- `/next-steps` - patient next steps
- `/doctor/dashboard` - doctor dashboard
- `/doctor/dashboard/educational` - clinician educational resources
- `/doctor/dashboard/practical` - clinician practical resources
- `/doctor/dashboard/resource/:resourceId` - clinician resource detail pages

## Project structure

```text
src/
  App.tsx                Shared route tree for patient and doctor branches
  index.css              GARNET design tokens, dark mode, base styles
  components/            Patient-facing shared components
  pages/                 Patient-facing pages
  doctor/                Doctor-facing pages, data, and components
public/
  medical-art/           Doctor decorative background illustrations
  resources/             Doctor downloadable resource files
  resource-graphics/     Doctor resource page graphics
  posters/               Doctor poster assets
  costs/                 Doctor cost/billing handouts
```

Dark mode follows the visitor's system preference by default; the header toggle saves an explicit choice in `localStorage`.
