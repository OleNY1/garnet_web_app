export type Source = {
  n: number
  citation: string
  url: string
}

/** Numbered reference list. IDs (source-N) match the <Cite> markers in the page body. */
export function Sources({ sources }: { sources: Source[] }) {
  return (
    <div className="mt-14 border-t border-line pt-8">
      <h2 className="font-display text-lg font-semibold text-ink">Sources</h2>
      <ol className="mt-4 flex flex-col gap-3 text-[0.92rem] leading-relaxed text-muted">
        {sources.map((source) => (
          <li key={source.n} id={`source-${source.n}`} className="scroll-mt-28">
            <span className="font-semibold text-body">[{source.n}]</span>{' '}
            {source.citation}{' '}
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="text-brand underline underline-offset-2 hover:text-brand-strong"
            >
              {source.url.replace('https://doi.org/', 'doi.org/')}
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}
