/**
 * Superscript-style citation marker. Links to the matching numbered
 * entry in that page's <Sources> list (id="source-N").
 */
export function Cite({ n }: { n: number }) {
  return (
    <a
      href={`#source-${n}`}
      className="ml-0.5 align-super text-[0.7em] font-semibold text-brand no-underline hover:underline"
    >
      [{n}]
    </a>
  )
}
