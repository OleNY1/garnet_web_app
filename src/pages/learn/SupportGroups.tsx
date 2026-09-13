import { HeartHandshake } from 'lucide-react'
import { GroupedLinkListCard } from '../../components/learn/LinkCards'
import { CTARow } from '../../components/learn/CTARow'
import { Section } from '../../components/Section'
import { GENERAL_SUPPORT_RESOURCE, SUPPORT_GROUP_LINKS } from '../../lib/supportLinks'

export function SupportGroups() {
  return (
    <>
      <Section id="support-groups" title="Find a support group">
        <p className="mx-auto mb-10 max-w-2xl text-center text-lg leading-relaxed text-body">
          These outside patient organizations aren't part of GARNET, but they're a good next stop
          for talking with people who understand what it's like to live with a specific kidney
          condition.
        </p>
        <div className="mx-auto max-w-4xl">
          <GroupedLinkListCard
            icon={HeartHandshake}
            tint="accent"
            title="Patient support groups by condition"
            intro="Pick the condition closest to your own diagnosis."
            groups={SUPPORT_GROUP_LINKS}
            generalResource={GENERAL_SUPPORT_RESOURCE}
          />
        </div>

        <div className="mx-auto max-w-3xl">
          <CTARow tint="accent" />
        </div>
      </Section>
    </>
  )
}
