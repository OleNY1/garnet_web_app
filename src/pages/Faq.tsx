import { useId, useState, type ReactNode } from 'react'
import { ArrowRight, ChevronDown, DollarSign, HelpCircle, ShieldCheck, Signpost, Stethoscope } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../components/Card'
import { IconChip } from '../components/IconChip'
import type { Tint } from '../components/IconChip'
import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { LEARN_TOPICS } from '../lib/learnTopics'

/** `heading` scrolls to that section of the page when the link is opened. */
type FaqLink = { to: string; label: string; heading?: string }

type FaqItem = {
  icon: LucideIcon
  tint?: Tint
  title: string
  answer: ReactNode
  /** Pages that explain more, shown as "Read more" links under the answer. */
  links?: FaqLink[]
}

/**
 * A question whose short answer is the Learn page's own intro, so the FAQ
 * points to the page instead of repeating it (and stays in sync with it).
 */
function learnQuestion(path: string, title: string, answer?: string, extraLinks: FaqLink[] = []): FaqItem {
  const topic = LEARN_TOPICS.find((t) => t.to === path)
  if (!topic) throw new Error(`Unknown Learn page: ${path}`)
  return {
    icon: topic.icon,
    tint: topic.tint,
    title,
    answer: <p>{answer ?? topic.intro}</p>,
    links: [{ to: topic.to, label: topic.label }, ...extraLinks],
  }
}

const PRACTICAL_ITEMS: FaqItem[] = [
  {
    icon: Stethoscope,
    title: 'Do I need a referral to genetic counseling?',
    answer: (
      <p>
        In many states in the US, you can simply schedule an appointment with a genetic counselor directly. Some
        insurance plans require a referral to a genetic counselor to cover the appointment costs.
      </p>
    ),
    links: [
      {
        to: '/how-to-get-tested',
        heading: 'What do I need to do to meet with a genetic counselor?',
        label: 'Meeting with a genetic counselor',
      },
    ],
  },
  {
    icon: DollarSign,
    title: 'How much does testing cost, and does insurance cover it?',
    answer: (
      <p>
        Health insurance often covers genetic testing, and many laboratories offer financial assistance if not. Costs
        vary by test type and laboratory.
      </p>
    ),
    links: [
      {
        to: '/how-to-get-tested',
        heading: 'Is genetic testing covered by insurance?',
        label: 'Cost and insurance',
      },
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Is my genetic information kept private?',
    answer: (
      <p>
        Genetic information is protected like any other clinical information, and your doctor needs
        your agreement to share it with other doctors and family members. For healthy individuals
        who have a genetic risk to develop disease, there is a law to protect them from genetic
        discrimination called{' '}
        <a
          href="https://www.genome.gov/about-genomics/policy-issues/Genetic-Discrimination"
          target="_blank"
          rel="noreferrer"
          className="text-brand underline underline-offset-2 hover:text-brand-strong"
        >
          GINA
        </a>
        .
      </p>
    ),
    links: [{ to: '/learn/your-rights', label: 'Your rights & choices' }],
  },
]

const FAQ_GROUPS: Array<{ id: string; title: string; items: FaqItem[] }> = [
  {
    id: 'cost-privacy',
    title: 'Referrals, cost, and privacy',
    items: PRACTICAL_ITEMS,
  },
  {
    id: 'about-testing',
    title: 'About genetic testing',
    items: [
      learnQuestion(
        '/learn/how-common',
        'How common is a genetic cause of kidney disease?',
        'Studies suggest a genetic cause explains roughly 10% to 15% of kidney disease in adults, and as many as 7 in 10 cases in some groups of children.',
      ),
      learnQuestion('/learn/how-testing-helps', 'Why would I get genetic testing for kidney disease?'),
      learnQuestion(
        '/learn/signs-testing-may-help',
        'How do I know if testing might find something?',
        'Some signs make it more likely that testing will find a genetic cause. They do not guarantee a result.',
        [{ to: '/check', label: 'Take the Genetic Risk Check' }],
      ),
      learnQuestion('/learn/testing-basics', 'How is the test done?'),
      learnQuestion(
        '/learn/types-of-tests',
        'Which genetic test will I get?',
        'Different tests look at different amounts of DNA. Your doctor or a genetic counselor can help choose the test that fits your situation.',
      ),
      learnQuestion('/learn/genetic-counselors', 'What does a genetic counselor do?'),
      {
        icon: Signpost,
        tint: 'plum',
        title: 'How do I get tested?',
        answer: (
          <p>Learn how to talk with your doctor or a genetic counselor, ask about cost, and prepare for testing.</p>
        ),
        links: [{ to: '/how-to-get-tested', label: 'How to get tested' }],
      },
    ],
  },
  {
    id: 'results',
    title: 'Understanding results',
    items: [
      learnQuestion(
        '/learn/vus',
        'What if my result is uncertain?',
        'Variants of Uncertain Significance (VUS) are changes that geneticists do not know whether to classify as harmful (pathogenic) or harmless (benign). A VUS should NOT be used to make medical decisions.',
      ),
      learnQuestion('/learn/guide-care', 'Can a genetic result change my treatment?'),
      learnQuestion(
        '/learn/apol1',
        'What is APOL1?',
        'Everyone has two copies of the APOL1 gene, which normally helps the body fight off certain infections. People with 2 variants (one on each copy of the gene) are at risk of developing APOL1-Mediated Kidney Disease (AMKD). Most (~80%) people with 2 variants do NOT develop kidney disease.',
      ),
    ],
  },
  {
    id: 'family',
    title: 'Your family',
    items: [
      learnQuestion('/learn/help-your-family', 'Can my result help my relatives?'),
      learnQuestion('/learn/family-sharing', 'Should I share my result with my family?'),
      learnQuestion('/learn/kidney-donation', 'A relative wants to donate a kidney to me. Can testing help?'),
    ],
  },
  {
    id: 'support-research',
    title: 'Support and research',
    items: [
      learnQuestion('/learn/support-groups', 'Where can I find a support group?'),
      learnQuestion('/learn/research-opportunities', 'Can I join a research study?'),
    ],
  },
]

function FaqCard({
  icon,
  tint = 'plum',
  title,
  answer,
  links,
  defaultOpen = false,
}: FaqItem & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()

  return (
    <Card>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full cursor-pointer items-center gap-4 p-6 text-left sm:p-7"
      >
        <IconChip icon={icon} tint={tint} className="size-12 shrink-0" />
        <h3 className="flex-1 font-display type-sub font-semibold text-ink">
          {title}
        </h3>
        <ChevronDown
          aria-hidden="true"
          className={`size-5 shrink-0 text-muted transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`px-6 pb-6 type-copy text-body transition-opacity duration-300 ease-in-out motion-reduce:transition-none sm:px-7 sm:pb-7 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {answer}
            {links?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    state={link.heading ? { searchHeading: link.heading } : undefined}
                    tabIndex={open ? undefined : -1}
                    className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-brand/40 bg-surface px-4 py-2 type-support font-semibold text-brand transition-colors duration-150 hover:border-brand/70 hover:bg-brand-soft"
                  >
                    {link.to === '/check' ? '' : 'Read more: '}
                    {link.label}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  )
}

export function Faq() {
  return (
    <>
      <PageHero
        icon={HelpCircle}
        tint="plum"
        eyebrow="FAQ"
        title="Frequently asked questions"
        intro="Short answers to the questions patients ask most, with links to the pages that explain more."
      />

      <div className="pt-4 pb-10 sm:pb-14">
        {FAQ_GROUPS.map((group, groupIndex) => (
          <Section
            key={group.id}
            id={group.id}
            title={group.title}
            align="left"
            className="!py-6 sm:!py-8"
            headerClassName="mx-auto !mb-5 sm:!mb-6"
          >
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
              {group.items.map((item, index) => (
                <FaqCard key={item.title} {...item} defaultOpen={groupIndex === 0 && index === 0} />
              ))}
            </div>
          </Section>
        ))}
      </div>
    </>
  )
}
