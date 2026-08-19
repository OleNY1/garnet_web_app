import { BadgeCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const EXPLORE_LINKS = [
  { label: 'Learn', href: '/learn' },
  { label: 'Check if testing may help', href: '/check' },
  { label: 'How to get tested', href: '/next-steps' },
  { label: 'FAQ', href: '/next-steps#cost-privacy' },
]

/* Placeholder routes; replace when these pages are built. */
const ABOUT_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Contact', href: '/contact' },
]

const footerLinkClasses =
  'inline-block scale-100 rounded-md py-1.5 text-[1.02rem] text-footer-muted underline-offset-4 transition-all duration-150 hover:scale-105 hover:text-footer-ink hover:underline'

export function Footer() {
  return (
    <footer className="on-dark bg-footer text-footer-muted">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr] lg:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={`${import.meta.env.BASE_URL}garnet-mark.png`}
                alt=""
                className="size-10 shrink-0 object-contain"
              />
              <div className="leading-tight">
                <p className="text-xl font-bold tracking-[0.18em] text-footer-ink">GARNET</p>
                <p className="text-[0.95rem]">
                  Genetic indicators Assessment Referral Note and Education Tool
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md leading-relaxed">
              A patient education website created as part of a research project at Columbia
              University Irving Medical Center, supported by the National Kidney Foundation.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-footer-line px-4 py-2 text-[0.95rem] font-medium text-footer-ink">
              <BadgeCheck aria-hidden="true" className="size-4.5 shrink-0 text-[#8fd0df]" />
              For educational purposes only
            </p>
          </div>

          <nav aria-label="Explore GARNET">
            <h3 className="text-[0.95rem] font-bold tracking-[0.14em] uppercase text-footer-ink">
              Explore
            </h3>
            <ul className="mt-4 space-y-1.5">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className={footerLinkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="About this site">
            <h3 className="text-[0.95rem] font-bold tracking-[0.14em] uppercase text-footer-ink">
              About
            </h3>
            <ul className="mt-4 space-y-1.5">
              {ABOUT_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={footerLinkClasses}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-footer-line pt-8">
          <p className="max-w-3xl text-[0.98rem] leading-relaxed">
            <strong className="font-semibold text-footer-ink">Medical disclaimer: </strong>
            GARNET does not provide medical advice, diagnosis, risk estimates, genetic counseling,
            or treatment recommendations. Please speak with a qualified healthcare professional.
          </p>
          <p className="mt-5 text-[0.95rem]">
            © {new Date().getFullYear()} GARNET · A Columbia medical research project
          </p>
        </div>
      </div>
    </footer>
  )
}
