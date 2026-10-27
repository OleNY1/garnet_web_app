import { HeartHandshake } from 'lucide-react'
import { GroupedLinkListCard } from '../../components/learn/LinkCards'
import { TopicIntro } from '../../components/learn/TopicIntro'
import { Section } from '../../components/Section'
import { SUPPORT_GROUP_LINKS } from '../../lib/supportLinks'

export function SupportGroups() {
  return (
    <>
      <Section id="support-groups">
        <div className="mx-auto mb-4 max-w-2xl text-center type-copy">
          <TopicIntro path="/learn/support-groups" />
        </div>
        <p className="mx-auto mb-10 max-w-2xl text-center type-copy text-body">
          These outside patient organizations aren't part of GARNET, but they're a good next stop
          for talking with people who understand what it's like to live with a specific kidney
          condition.
        </p>
        <div className="mx-auto max-w-4xl">
          <GroupedLinkListCard
            icon={HeartHandshake}
            tint="accent"
            title="Patient support groups by condition"
            groups={SUPPORT_GROUP_LINKS}
          />
        </div>
      </Section>
    </>
  )
}
