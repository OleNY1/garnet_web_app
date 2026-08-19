import { Cite } from '../../components/Cite'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'

export function TestingBasics() {
  return (
    <>
      <Section id="testing-basics" title="What genetic testing can and can't tell you">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <p>
            Genetic causes explain a meaningful share of kidney disease. Studies suggest a genetic
            cause is behind kidney failure in roughly 10% to 15% of adults, and in as many as 7 in
            10 children.
            <Cite n={1} />
          </p>
          <p>
            Not every genetic test looks at the same amount of DNA. A single-gene test checks one
            gene already suspected from a family history or symptoms. A gene panel checks a larger
            group of genes linked to a category of kidney disease, such as cystic kidney disease.
            Exome sequencing reads the protein-making parts of nearly all genes, and genome
            sequencing reads essentially all of a person's DNA. Broader tests can find more, but
            they also take longer to process and can turn up findings unrelated to your kidneys.
            <Cite n={1} />
          </p>
          <p>
            Testing itself is simple: most labs need only a blood draw or a cheek swab.
            <Cite n={2} />
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            Signs that testing is more likely to find an answer
          </h3>
          <p>
            Researchers have identified patterns that raise the odds a genetic cause will be
            found. None of these guarantee a result, and people without them can still benefit from
            testing, but doctors are more likely to recommend it when someone has:
            <Cite n={2} />
          </p>
          <ul className="list-disc space-y-2 pl-6 marker:text-brand">
            <li>Kidney disease that started young, progressed unusually fast, or was unusually severe</li>
            <li>Other organs affected alongside the kidneys, not just as a result of kidney failure</li>
            <li>A family history of kidney disease</li>
            <li>
              A kidney disease type known to often have a genetic cause, such as cystic kidney
              disease, certain scarring diseases, or kidney disease with no clear cause
            </li>
            <li>Specific clues on a biopsy or blood work that point toward a known genetic condition</li>
          </ul>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            Understanding an unclear result
          </h3>
          <p>
            Sometimes a test finds a change in a gene, but scientists don't yet know whether that
            change actually causes disease. This is called a "variant of uncertain significance."
            It isn't a diagnosis, and it shouldn't change your care on its own — but it can
            sometimes be resolved later as more research comes in, or if other family members are
            tested.
            <Cite n={1} />
          </p>
          <p>
            Before testing, it's normal to talk through your personal and family medical history
            with your doctor or a genetic counselor, so the right test can be chosen and you know
            what each possible result would mean.
            <Cite n={2} />
          </p>
        </div>

        <Sources
          sources={[
            {
              n: 1,
              citation:
                'Groopman, E. & Milo Rasouly, H. Navigating genetic testing in nephrology: options and decision-making strategies. Kidney International Reports 10, 673-695 (2025).',
              url: 'https://doi.org/10.1016/j.ekir.2024.12.020',
            },
            {
              n: 2,
              citation:
                'Bogyo, K., Vena, N. & Milo Rasouly, H. The art and science of genetic counseling in nephrology. Kidney360 6, 1230-1244 (2025).',
              url: 'https://doi.org/10.34067/KID.0000000825',
            },
          ]}
        />
      </Section>
    </>
  )
}
