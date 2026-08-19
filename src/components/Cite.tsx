/**
 * Superscript-style citation marker. Links to the matching numbered
 * entry in that page's <Sources> list (id="source-N").
 */
export function Cite({ n }: { n: number }) {
  return (
    <a
      href={`#source-${n}`}
      className="ml-0.5 inline-block scale-100 align-super text-[0.7em] font-semibold text-brand no-underline transition-transform duration-150 hover:scale-125 hover:underline"
    >
      [{n}]
    </a>
  )
}
