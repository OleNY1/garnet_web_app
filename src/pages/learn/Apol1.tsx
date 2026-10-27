import { ExternalLink } from 'lucide-react'
import { Cite } from '../../components/Cite'
import { LearnLink } from '../../components/learn/LearnLink'
import { TopicIntro } from '../../components/learn/TopicIntro'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'
import { numbered } from '../../lib/citations'

const MORE_INFO = [
  {
    label: 'National Kidney Foundation: APOL1-Mediated Kidney Disease (AMKD)',
    href: 'https://www.kidney.org/kidney-topics/apol1-mediated-kidney-disease-amkd',
  },
  {
    label: 'American Association of Kidney Patients (AAKP): APOL1',
    href: 'https://aakp.org/center-for-patient-research-and-education/causes-of-kidney-disease/apol/',
  },
  {
    label: 'American Kidney Fund: APOL1-mediated kidney disease (AMKD)',
    href: 'https://www.kidneyfund.org/apol1-mediated-kidney-disease-amkd',
  },
  {
    label: 'NephCure: genetic testing',
    href: 'https://nephcure.org/managing-rkd/genetic-testing/',
  },
]

const linkClasses = 'text-brand underline underline-offset-2 hover:text-brand-strong'

export function Apol1() {
  return (
    <>
      <Section id="apol1">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 type-copy text-body">
          <figure className="flex flex-col items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}learn-figures/apol1-variants-and-trypanosome-protection.png`}
              alt="Three people side by side. Left: no variant in APOL1, where trypanosome infection can be lethal. Middle: 1 variant (heterozygote, G1 or G2) in APOL1, protected against trypanosome infection. Right: 2 variants (G1/G2) in APOL1, protected against trypanosome infection, shown with worried-looking kidneys holding a 'help' sign."
              className="w-full rounded-xl border border-line bg-white"
            />
            <figcaption className="text-center type-support leading-snug text-muted">
              <a
                href="https://www.sciencedirect.com/topics/pharmacology-toxicology-and-pharmaceutical-science/trypanosoma"
                target="_blank"
                rel="noreferrer"
                className={linkClasses}
              >
                Learn more about trypanosome
              </a>
            </figcaption>
          </figure>

          <TopicIntro path="/learn/apol1" />
          <p>
            Everyone has two copies of the <em>APOL1</em> gene (one from dad and one from mom), which normally helps
            the body fight off certain infections. Specific variations (called G1 and G2) evolved long ago in Western
            and Central Africa to protect people from a parasite named Trypanosome that causes African sleeping
            sickness. Therefore, the G1 and G2 variants are more common in people with ancestors from those regions.
          </p>

          <p>
            People with 2 variants (one on each copy of the gene) are at risk of developing APOL1-Mediated Kidney
            Disease (AMKD). Having 2 variants is also called the <em>APOL1</em> high-risk genotype. AMKD is considered a
            recessive disease.
          </p>

          <p className="rounded-2xl border border-line bg-brand-soft px-6 py-5 type-copy font-semibold text-ink">
            Most (~80%) people with 2 variants do{' '}
            <strong className="underline underline-offset-2">NOT</strong> develop kidney disease.
          </p>

          <div className="rounded-2xl border border-line bg-surface px-6 py-5 shadow-soft">
            <p className="mb-3 type-support font-bold tracking-[0.12em] text-plum uppercase">Definitions</p>
            <dl>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
              <dt className="font-semibold text-ink">Genotype</dt>
              <dd>= genetic information</dd>
            </div>
            <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:gap-3">
              <dt className="font-semibold text-ink">
                <em>APOL1</em> high-risk genotype
              </dt>
              <dd>= G1/G1 or G2/G2 or G1/G2</dd>
            </div>
            </dl>
          </div>
        </div>
      </Section>

      <Section id="apol1-transplant" tone="wash" title="A note on kidney transplantation">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 type-copy text-body">
          <p>
            Having 2 <em>APOL1</em> variants doesn't automatically rule someone out as a donor — it's a factor to weigh
            together with the transplant team, not a mandatory test or an automatic disqualifier.
            <Cite n={1} />
          </p>
          <p>
            See <LearnLink to="/learn/kidney-donation">Support living donor decisions</LearnLink> for how specialists
            usually decide whether — and how — to test a donor candidate.
          </p>
        </div>
      </Section>

      <Section id="apol1-more" title="For more information">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 type-copy text-body">
          <ul className="flex flex-col gap-3">
            {MORE_INFO.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noreferrer" className={`inline-flex items-start gap-2 ${linkClasses}`}>
                  <ExternalLink aria-hidden="true" className="mt-1.5 size-4 shrink-0" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="rounded-2xl border border-line bg-surface px-6 py-5 shadow-soft">
            Basketball legend and Hall-of-Famer Alonzo Mourning has APOL1-mediated kidney disease (AMKD).{' '}
            <a href="https://www.powerforwardtogether.com/" target="_blank" rel="noreferrer" className={`font-semibold ${linkClasses}`}>
              Hear his story
            </a>
            .
          </p>
        </div>

        <Sources sources={numbered('thomas2023')} />
      </Section>
    </>
  )
}
