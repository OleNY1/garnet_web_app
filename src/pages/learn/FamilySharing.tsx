import { Cite } from '../../components/Cite'
import { LearnLink } from '../../components/learn/LearnLink'
import { TopicIntro } from '../../components/learn/TopicIntro'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'
import { numbered } from '../../lib/citations'

export function FamilySharing() {
  return (
    <>
      <Section id="family-sharing" title="Why sharing your result matters">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 type-copy text-body">
          <TopicIntro path="/learn/family-sharing" />
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

          <h3 className="mt-2 font-display type-sub font-semibold text-ink">
            How a genetic counselor can help you share
          </h3>
          <p>
            A genetic counselor can help you plan those conversations and help coordinate them,
            especially when your relative doesn't yet know they might be at risk.
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
