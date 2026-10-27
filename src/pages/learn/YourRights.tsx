import { Cite } from '../../components/Cite'
import { Illustration } from '../../components/learn/Illustration'
import { LearnLink } from '../../components/learn/LearnLink'
import { TopicIntro } from '../../components/learn/TopicIntro'
import { ProtectionGrid } from '../../components/learn/ProtectionGrid'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'

export function YourRights() {
  return (
    <>
      <Section id="legal-protections" title="Legal protections">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 type-copy text-body">
          <Illustration src="ethics-law-scales.png" alt="Balance scales, representing law and ethics." size="sm" />

          <TopicIntro path="/learn/your-rights" />
          <p>
            In the United States, a federal law called the Genetic Information Nondiscrimination
            Act (GINA) stops health insurers and most employers from discriminating against you
            based on genetic test results. It has real gaps, though:
            <Cite n={1} />
          </p>

          <ProtectionGrid />
        </div>
      </Section>

      <Section id="your-rights" tone="wash" title="Making an informed, personal choice">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 type-copy text-body">
          <p>
            Whether to learn your genetic results is a personal choice. Ethicists increasingly
            agree that being offered that choice, with real information about what a result could
            mean, is a basic part of respecting patients' autonomy.
            <Cite n={2} />
          </p>
          <p>
            A common worry is what happens to your DNA after testing — whether it's stored,
            shared, or used without your knowledge. Before any genetic test, you should request
            answers to all your questions. Asking your doctor or a genetic counselor these
            questions directly is a normal, expected part of the process — not an imposition. See{' '}
            <LearnLink to="/how-to-get-tested">How to get tested</LearnLink>.
            <Cite n={2} />
          </p>
          <p>
            Genetic counselors are best equipped to walk patients through what a result means. If
            your result feels confusing, it's reasonable to ask for a referral to a{' '}
            <LearnLink to="/learn/genetic-counselors">genetic counselor</LearnLink>.
            <Cite n={2} />
          </p>

          <p>
            For cost and insurance, see{' '}
            <LearnLink to="/how-to-get-tested#cost-insurance">Is genetic testing covered by insurance?</LearnLink>
          </p>

          <p>
            For family planning options before and during pregnancy, see{' '}
            <LearnLink to="/learn/help-your-family">Help your family</LearnLink>.
          </p>
        </div>

        <Sources
          sources={[
            {
              n: 1,
              citation:
                'Thomas, C.P. et al. Genetic evaluation of living kidney donor candidates: a review and recommendations for best practices. American Journal of Transplantation 23, 597-607 (2023).',
              url: 'https://doi.org/10.1016/j.ajt.2023.02.020',
            },
            {
              n: 2,
              citation:
                'Sabatello, M. & Milo Rasouly, H. The ethics of genetic testing for kidney diseases. Nature Reviews Nephrology 16, 615-616 (2020).',
              url: 'https://doi.org/10.1038/s41581-020-0294-5',
            },
          ]}
        />
      </Section>
    </>
  )
}
