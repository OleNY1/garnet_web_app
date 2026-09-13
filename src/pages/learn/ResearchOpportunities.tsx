import { FlaskConical } from 'lucide-react'
import { LinkListCard } from '../../components/learn/LinkCards'
import { CTARow } from '../../components/learn/CTARow'
import { Section } from '../../components/Section'
import { RESEARCH_LINKS } from '../../lib/supportLinks'

export function ResearchOpportunities() {
  return (
    <>
      <Section id="research-opportunities" title="Explore research opportunities">
        <p className="mx-auto mb-10 max-w-2xl text-center text-lg leading-relaxed text-body">
          See whether a relevant clinical trial or research study is currently open to join.
          GARNET doesn't run these studies — the links below take you to outside registries.
        </p>
        <div className="mx-auto max-w-2xl">
          <LinkListCard
            icon={FlaskConical}
            tint="plum"
            title="Research and clinical trials"
            intro="Search or browse studies related to kidney disease."
            links={RESEARCH_LINKS}
          />
        </div>

        <div className="mx-auto max-w-3xl">
          <CTARow tint="plum" />
        </div>
      </Section>
    </>
  )
}
