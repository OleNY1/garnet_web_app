import { Cite } from '../../components/Cite'
import { LearnLink } from '../../components/learn/LearnLink'
import { ProtectionGrid } from '../../components/learn/ProtectionGrid'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'

export function YourRights() {
  return (
    <>
      <Section id="your-rights" title="Making an informed, personal choice">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <p>
            Whether to learn your genetic results is a personal choice. Ethicists increasingly
            agree that being offered that choice, with real information about what a result could
            mean, is a basic part of respecting patients' autonomy.
            <Cite n={1} />
          </p>
          <p>
            A common worry is what happens to your DNA after testing — whether it's stored,
            shared, or used without your knowledge. Before any genetic test, you should be told in
            plain terms who will see your results, whether your sample is kept or destroyed, and
            whether you can withdraw your consent later. Asking your doctor or a genetic counselor
            these questions directly is a normal, expected part of the process — not an imposition.
            <Cite n={1} />
          </p>
          <p>
            Genetic counselors are best equipped to walk patients through what a result means, but
            there currently aren't enough of them to meet demand, so other clinicians are often
            asked to help explain results too. If your result feels confusing, it's reasonable to
            ask for a referral to a genetic counselor.
            <Cite n={1} />
          </p>
          <p>
            People from communities that have historically been underserved or mistreated by the
            medical system are sometimes less interested in getting genetic results — often tied to
            distrust or to limited access to follow-up care rather than a lack of interest in the
            information itself. That context matters, and no one should assume how a person feels
            about testing based on their background.
            <Cite n={1} />
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">Legal protections</h3>
          <p>
            In the United States, a federal law called the Genetic Information Nondiscrimination
            Act (GINA) stops health insurers and most employers from discriminating against you
            based on genetic test results. It has real gaps, though:
            <Cite n={2} />
          </p>

          <ProtectionGrid />

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
                'Sabatello, M. & Milo Rasouly, H. The ethics of genetic testing for kidney diseases. Nature Reviews Nephrology 16, 615-616 (2020).',
              url: 'https://doi.org/10.1038/s41581-020-0294-5',
            },
            {
              n: 2,
              citation:
                'Thomas, C.P. et al. Genetic evaluation of living kidney donor candidates: a review and recommendations for best practices. American Journal of Transplantation 23, 597-607 (2023).',
              url: 'https://doi.org/10.1016/j.ajt.2023.02.020',
            },
          ]}
        />
      </Section>
    </>
  )
}
