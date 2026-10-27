import type { ReactNode } from 'react'
import { useEffect, useId, useRef, useState } from 'react'

/** Plain-language definitions shown when a reader hovers over or taps a term. */
const DEFINITIONS = {
  /* Same wording as the family-members note in the Genetic Risk Check. */
  relatives:
    'People related by blood: parents, children, siblings, grandparents, and grandchildren. This does not include step-parents, step-siblings, step-children, in-laws, or spouses who are not blood-related.',
  /* MedlinePlus Genetics (U.S. National Library of Medicine), "What is DNA?". */
  dna: 'DNA, or deoxyribonucleic acid, is the hereditary material in humans and almost all other organisms. Nearly every cell in a person’s body has the same DNA.',
} as const

/**
 * A word with a dotted underline that shows its definition on hover, on
 * keyboard focus, or on tap (phones have no hover).
 */
export function Term({ term, children }: { term: keyof typeof DEFINITIONS; children: ReactNode }) {
  // Hover and keyboard focus show the definition through CSS; a tap pins it open.
  const [pinned, setPinned] = useState(false)
  const id = useId()
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!pinned) return
    const close = (event: PointerEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent ? event.key === 'Escape' : !ref.current?.contains(event.target as Node)) {
        setPinned(false)
      }
    }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', close)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', close)
    }
  }, [pinned])

  return (
    <span ref={ref} className="group relative inline-block">
      <button
        type="button"
        aria-describedby={id}
        aria-expanded={pinned}
        onClick={() => setPinned((v) => !v)}
        className="cursor-help font-[inherit] text-inherit underline decoration-brand decoration-dotted decoration-2 underline-offset-4"
      >
        {children}
      </button>
      <span
        id={id}
        role="tooltip"
        className={`absolute top-full left-1/2 z-30 mt-2 w-72 max-w-[80vw] -translate-x-1/2 rounded-xl border border-line bg-surface p-4 text-left type-support leading-snug font-normal text-body shadow-lift group-hover:block group-focus-within:block ${
          pinned ? 'block' : 'hidden'
        }`}
      >
        {DEFINITIONS[term]}
      </span>
    </span>
  )
}
