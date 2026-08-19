import { Cite } from '../../components/Cite'
import { CTARow } from '../../components/learn/CTARow'
import { ProtectionGrid } from '../../components/learn/ProtectionGrid'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'

export function YourRights() {
  return (
    <>
      <Section id="your-rights" title="Making an informed, personal choice">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <p>
            Whether to learn your genetic results — from a research study or from clinical testing
            — is a personal choice. Ethicists increasingly agree that being offered that choice,
            with real information about what a result could mean, is a basic part of respecting
            patients' autonomy.
            <Cite n={1} />
          </p>
          <p>
            A common worry is what happens to your DNA after testing — whether it's stored,
            shared, or used without your knowledge. Before any research or clinical test, you
            should be told in plain terms who will see your results, whether your sample is kept
            or destroyed, and whether you can withdraw your consent later. Asking your genetic
            counselor or study coordinator these questions directly is a normal, expected part of
            the process — not an imposition.
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
            Research also shows that people from communities that have historically been
            underserved or mistreated by the medical system are sometimes less interested in
            getting research results back — often tied to distrust or to limited access to
            follow-up care rather than a lack of interest in the information itself. That context
            matters, and no one should assume how a person feels about testing based on their
            background.
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

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            Family planning options
          </h3>
          <p>
            For people with a known genetic kidney condition in the family, testing embryos before
            pregnancy — called preimplantation genetic diagnosis — is one option that can be
            discussed with a care team. It lets people avoid passing on a specific known genetic
            variant without facing a decision about an existing pregnancy.
            <Cite n={1} />
          </p>
          <p>
            Cost is a real barrier here: this kind of testing, combined with fertility treatment,
            can run into the tens of thousands of dollars, and it's often only partly covered by
            insurance, unlike dialysis, which is generally covered by government programs despite
            being far more expensive over time.
            <Cite n={1} />
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <CTARow tint="plum" />
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
