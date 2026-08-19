import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ScrollToTop } from './components/ScrollToTop'
import { Check } from './pages/Check'
import { Home } from './pages/Home'
import { Learn } from './pages/Learn'
import { NextSteps } from './pages/NextSteps'

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:border focus:border-line focus:bg-surface focus:px-5 focus:py-3 focus:font-semibold focus:text-ink focus:shadow-lift"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/check" element={<Check />} />
          <Route path="/next-steps" element={<NextSteps />} />
          {/* Placeholder routes (privacy, terms, contact) aren't built yet;
              send visitors home instead of a dead page. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
