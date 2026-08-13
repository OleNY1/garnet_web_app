import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { LandingPage } from './pages/LandingPage'

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:border focus:border-line focus:bg-surface focus:px-5 focus:py-3 focus:font-semibold focus:text-ink focus:shadow-lift"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <LandingPage />
      </main>
      <Footer />
    </div>
  )
}
