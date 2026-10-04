import { useId, useState, type ReactNode } from 'react'
import { ChevronDown, HelpCircle, ShieldCheck, Stethoscope, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card } from '../components/Card'
import { IconChip } from '../components/IconChip'
import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'

const FAQ_ITEMS: Array<{
  icon: LucideIcon
  title: string
  answer: ReactNode
}> = [
  {
    icon: Stethoscope,
    title: 'Referral to Genetic Counseling',
    answer: (
      <p>
        In some states and with some health insurance, you will need your nephrologist or primary
        care doctor to refer you to a genetic counselor or a genetics clinic. In others, you can
        simply schedule a meeting with a genetic counselor directly.
      </p>
    ),
  },
  {
    icon: Wallet,
    title: 'Cost and insurance',
    answer: (
      <p>
        Health insurance often covers genetic testing, and many laboratories offer financial
        assistance if not. Costs vary by test type and laboratory. Some tests could be free, but
        others could cost several thousand dollars, so ask before testing. Genetic counselors have
        experience managing insurance costs and can help you navigate the system. Some genetic
        counselors work with insurance; others offer a maximum out-of-pocket cost. The information
        should be provided before meeting with a genetic counselor (
        <a
          href="https://findageneticcounselor.nsgc.org/?reload=timezone"
          target="_blank"
          rel="noreferrer"
          className="text-brand underline underline-offset-2 hover:text-brand-strong"
        >
          find a genetic counselor
        </a>
        ).
      </p>
    ),
  },
  {
    icon: ShieldCheck,
    title: 'Privacy and legal protections',
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
  },
]

function FaqCard({
  icon,
  title,
  answer,
  defaultOpen = false,
}: {
  icon: LucideIcon
  title: string
  answer: ReactNode
  defaultOpen?: boolean
}) {
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
        <IconChip icon={icon} tint="plum" className="size-12 shrink-0" />
        <h3 className="flex-1 font-display text-[1.25rem] leading-snug font-semibold text-ink sm:text-[1.3rem]">
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
            className={`px-6 pb-6 text-[1.02rem] leading-relaxed text-body transition-opacity duration-300 ease-in-out motion-reduce:transition-none sm:px-7 sm:pb-7 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {answer}
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
        title="Cost, referrals, and privacy"
        intro="The practical questions patients ask about most."
      />

      <Section id="cost-privacy" className="!pt-10 sm:!pt-14">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {FAQ_ITEMS.map((item, index) => (
            <FaqCard key={item.title} {...item} defaultOpen={index === 0} />
          ))}
        </div>
      </Section>
    </>
  )
}
