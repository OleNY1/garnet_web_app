import { ArrowUpRight } from 'lucide-react'
import { Card } from '../../components/Card'
import { Cite } from '../../components/Cite'
import { LearnLink } from '../../components/learn/LearnLink'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'
import { numbered } from '../../lib/citations'

const FIND_A_COUNSELOR_URL = 'https://findageneticcounselor.nsgc.org/'

/* Patient-facing version of the doctor side's informed-consent talking points. */
const BEFORE_TESTING = [
  {
    title: 'Why test',
    text: 'What testing could do in your case — for example, clarify your diagnosis, guide treatment, help your family, support family planning, or inform kidney donation.',
  },
  {
    title: 'Your family history',
    text: 'Questions about the health of your relatives, which can point to an inherited cause and shape which test to choose.',
  },
  {
    title: 'What the test involves',
    text: 'How the sample is collected, who orders the test, and when and how you will get your result.',
  },
  {
    title: 'What a result can and can’t tell you',
    text: 'Results can be uncertain. And unless the test looks for a cause already known in your family, not finding a genetic cause does not mean there isn’t one.',
  },
  {
    title: 'Privacy and your rights',
    text: 'Who will see your result, and the legal protections against genetic discrimination.',
  },
  {
    title: 'What it means for your family',
    text: 'A result can show which relatives may be at risk and could be tested too.',
  },
]

export function GeneticCounselors() {
  return (
    <>
      <Section id="genetic-counselors" tone="wash" title="Who genetic counselors are">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <p>
            Genetic counselors are health professionals trained to explain genetic testing and what
            a result means. They are best equipped to walk you through a result, though there
            currently aren't enough of them to meet demand, so other clinicians often help explain
            results too. If your result feels confusing, it's reasonable to ask for a referral to a
            genetic counselor.
            <Cite n={1} />
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            What a session looks like before testing
          </h3>
          <p>
            Before a test, you'll talk through what testing could mean for you. A session often
            covers:
            <Cite n={2} />
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {BEFORE_TESTING.map((item) => (
              <Card key={item.title} className="p-5">
                <p className="text-[1.05rem] leading-snug font-semibold text-ink">{item.title}</p>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-body">{item.text}</p>
              </Card>
            ))}
          </div>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            What happens after testing
          </h3>
          <p>
            After testing, your result is reviewed and explained with you. Your care may be adjusted,
            and you may be referred to other specialists or offered another genetic test.
            <Cite n={2} />
          </p>
          <p>
            A genetic counselor can also help you tell relatives about your result. See{' '}
            <LearnLink to="/learn/family-sharing">Sharing with family</LearnLink>.
          </p>

          <a
            href={FIND_A_COUNSELOR_URL}
            target="_blank"
            rel="noreferrer"
            className="group mt-2 flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-5 shadow-soft transition-colors hover:bg-brand-soft"
          >
            <span>
              <span className="block font-semibold text-ink">Find a genetic counselor</span>
              <span className="mt-0.5 block text-[0.95rem] text-muted">
                Search the National Society of Genetic Counselors directory.
              </span>
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
            />
          </a>
        </div>

        <Sources sources={numbered('sabatello2020', 'bogyo2025')} />
      </Section>
    </>
  )
}
