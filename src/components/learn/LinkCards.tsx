import { ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card } from '../Card'
import type { Tint } from '../IconChip'
import { IconChip } from '../IconChip'
import type { ConditionLinkGroup, ExternalLink } from '../../lib/supportLinks'

/**
 * Shared building blocks for "browse a list of outside links" pages:
 * the flat Research & Clinical Trials tab, and the condition-grouped
 * Support Groups tab. Kept in one file so both stay visually consistent.
 */

export function LinkRow({ link }: { link: ExternalLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-start justify-between gap-3 rounded-xl p-2 -m-2 transition-colors duration-150 hover:bg-wash"
    >
      <span>
        <span className="block text-[1rem] leading-snug font-semibold text-ink group-hover:text-brand-strong">
          {link.label}
        </span>
        <span className="mt-0.5 block text-[0.92rem] leading-snug text-muted">{link.text}</span>
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="mt-1 size-4.5 shrink-0 text-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
      />
    </a>
  )
}

/** Flat list of links inside a single card — used for the Research tab. */
export function LinkListCard({
  icon,
  tint,
  title,
  intro,
  links,
}: {
  icon: LucideIcon
  tint: Tint
  title: string
  intro: string
  links: ExternalLink[]
}) {
  return (
    <Card className="flex h-full flex-col p-6 sm:p-7">
      <IconChip icon={icon} tint={tint} />
      <h3 className="mt-4 text-[1.22rem] leading-snug font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-[1.02rem] leading-relaxed text-body">{intro}</p>
      <ul className="mt-5 flex flex-col gap-3 border-t border-line pt-5">
        {links.map((link) => (
          <li key={link.href}>
            <LinkRow link={link} />
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[0.85rem] leading-snug text-muted">
        These are outside organizations, not part of GARNET. Ask your care team which ones fit
        your situation.
      </p>
    </Card>
  )
}

/**
 * Links grouped by condition (Alport, Fabry, PKD, etc.) so a visitor can
 * scan to the disease that matches their own diagnosis. Ends with one
 * condition-agnostic resource (Global Genes) that doesn't belong to any
 * single group. Used for the Support Groups tab.
 */
export function GroupedLinkListCard({
  icon,
  tint,
  title,
  intro,
  groups,
  generalResource,
}: {
  icon: LucideIcon
  tint: Tint
  title: string
  intro: string
  groups: ConditionLinkGroup[]
  generalResource: ExternalLink
}) {
  return (
    <Card className="flex h-full flex-col p-6 sm:p-7">
      <IconChip icon={icon} tint={tint} />
      <h3 className="mt-4 text-[1.22rem] leading-snug font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-[1.02rem] leading-relaxed text-body">{intro}</p>
      <div className="mt-5 grid gap-5 border-t border-line pt-5 sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group.condition}>
            <p className="text-[0.8rem] font-bold tracking-[0.1em] text-muted uppercase">
              {group.condition}
            </p>
            <ul className="mt-2 flex flex-col gap-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <LinkRow link={link} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-5 border-t border-line pt-5">
        <p className="text-[0.8rem] font-bold tracking-[0.1em] text-muted uppercase">
          General resource
        </p>
        <ul className="mt-2 flex flex-col gap-2.5">
          <li>
            <LinkRow link={generalResource} />
          </li>
        </ul>
      </div>
      <p className="mt-4 text-[0.85rem] leading-snug text-muted">
        These are outside organizations, not part of GARNET. Ask your care team which ones fit
        your situation.
      </p>
    </Card>
  )
}
