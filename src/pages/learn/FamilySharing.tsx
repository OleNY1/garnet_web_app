import { Cite } from '../../components/Cite'
import { BarCompare } from '../../components/learn/BarCompare'
import { CTARow } from '../../components/learn/CTARow'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'

const SHARING_ROWS = [
  { label: 'Told all close relatives within 6 months', percent: 34, display: '34%' },
  { label: 'Close relatives who were never told at all', percent: 39, display: '39%' },
  { label: 'Shared with all relatives — told by a genetics specialist', percent: 50, display: '~50%' },
  { label: 'Shared with all relatives — told by a non-genetics doctor', percent: 10, display: '~10%' },
]

export function FamilySharing() {
  return (
    <>
      <Section id="family-sharing" title="How families actually share results">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <p>
            A genetic result doesn't only affect you — close relatives share some of the same DNA,
            so a finding can matter for them too. But research shows that sharing results within
            families is inconsistent.
            <Cite n={1} />
          </p>

          <BarCompare tint="accent" rows={SHARING_ROWS} />

          <p>
            Sharing wasn't even across relatives. People were more likely to tell their siblings
            and children than their parents.
            <Cite n={1} />
          </p>
          <p>
            Who explains the result seems to matter: people who received their results from a
            genetics specialist were far more likely to share with all their relatives than people
            who heard from a doctor without genetics training.
            <Cite n={1} />
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            Why people do — and don't — share
          </h3>
          <p>
            The most common reasons people gave for sharing were a sense of obligation and a belief
            that the information could help relatives make their own medical decisions — each
            cited by about 7 in 10 people.
            <Cite n={1} />
          </p>
          <p>
            The most common reasons for not sharing were that a relative seemed too young for the
            information to matter yet, or that the person simply wasn't in close contact with that
            relative.
            <Cite n={1} />
          </p>
          <p>
            Because the stakes are personal on both sides, doctors and genetic counselors are
            expected to actively encourage patients to talk with relatives about shared risk — and
            can help coordinate that conversation, especially when a relative doesn't yet know they
            might be at risk.
            <Cite n={2} />
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <CTARow tint="accent" />
        </div>

        <Sources
          sources={[
            {
              n: 1,
              citation:
                'Wynn, J. et al. Do research participants share genomic screening results with family members? Journal of Genetic Counseling 00, 1-12 (2021).',
              url: 'https://doi.org/10.1002/jgc4.1511',
            },
            {
              n: 2,
              citation:
                'Bogyo, K., Vena, N. & Milo Rasouly, H. The art and science of genetic counseling in nephrology. Kidney360 6, 1230-1244 (2025).',
              url: 'https://doi.org/10.34067/KID.0000000825',
            },
          ]}
        />
      </Section>
    </>
  )
}
