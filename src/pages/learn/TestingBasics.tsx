import { Cite } from '../../components/Cite'
import { CTARow } from '../../components/learn/CTARow'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'

export function TestingBasics() {
  return (
    <>
      <Section id="testing-basics" title="How DNA is collected">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <p>
            Testing itself is simple: many labs only need a cheek swab or a saliva test, not a blood draw.
            <Cite n={1} />
          </p>

          <img
            src={`${import.meta.env.BASE_URL}medical-art/cheek-swab-test.png`}
            alt="How a DNA sample can be collected: a cheek swab, a collection kit, or a saliva sample."
            className="mx-auto w-full"
          />

          <p>
            After the sample is collected, it is sent to a lab. The lab looks at DNA for changes
            in genes that can be linked to kidney disease.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <CTARow tint="accent" />
        </div>

        <Sources
          sources={[
            {
              n: 1,
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
