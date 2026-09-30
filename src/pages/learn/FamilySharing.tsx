import { Cite } from '../../components/Cite'
import { BarCompare } from '../../components/learn/BarCompare'
import { LearnLink } from '../../components/learn/LearnLink'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'
import { numbered } from '../../lib/citations'

const SHARING_ROWS = [
  { label: 'Told all close relatives within 6 months', percent: 34, display: '34%' },
  { label: 'Close relatives who were never told at all', percent: 39, display: '39%' },
  { label: 'Shared with all relatives — told by a genetics specialist', percent: 50, display: '~50%' },
  { label: 'Shared with all relatives — told by a non-genetics doctor', percent: 10, display: '~10%' },
]

export function FamilySharing() {
  return (
    <>
      <Section id="family-sharing" title="Why sharing your result matters">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <p>
            A genetic result doesn't only affect you. Close relatives share some of the same DNA,
            so a finding can matter for them too.
            <Cite n={1} />
          </p>
          <p>
            When relatives know about your result, they can choose to be tested for the same
            genetic cause. Those who share it can be diagnosed and treated early, and those who
            didn't inherit it may be able to donate a kidney. See{' '}
            <LearnLink to="/learn/help-your-family">Help your family</LearnLink> for what this can
            mean.
          </p>
          <p>
            But research shows that sharing results within families is inconsistent. Many close
            relatives are never told.
            <Cite n={1} />
          </p>

          <BarCompare tint="accent" rows={SHARING_ROWS} />

          <p>
            The most common reasons people gave for sharing were a sense of obligation and a belief
            that the information could help relatives make their own medical decisions — each
            cited by about 7 in 10 people. The most common reasons for not sharing were that a
            relative seemed too young for the information to matter yet, or that the person simply
            wasn't in close contact with that relative.
            <Cite n={1} />
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            How a genetic counselor can help you share
          </h3>
          <p>
            Who explains the result seems to matter: people who received their results from a
            genetics specialist were far more likely to share with all their relatives than people
            who heard from a doctor without genetics training.
            <Cite n={1} />
          </p>
          <p>
            Doctors and genetic counselors are expected to encourage patients to talk with
            relatives about shared risk. A genetic counselor can help you plan those conversations
            and help coordinate them, especially when a relative doesn't yet know they might be at
            risk.
            <Cite n={2} />
          </p>
          <p>
            Learn more about <LearnLink to="/learn/genetic-counselors">genetic counselors</LearnLink>{' '}
            and what a session looks like.
          </p>
        </div>

        <Sources sources={numbered('wynn2021', 'bogyo2025')} />
      </Section>
    </>
  )
}
