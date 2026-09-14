import { Cite } from '../../components/Cite'
import { CTARow } from '../../components/learn/CTARow'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'
import { LearnLink } from '../../components/learn/LearnLink'

export function TestingBasics() {
  return (
    <>
      <Section id="testing-basics" title="How DNA is collected">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <p>
            To get genetic testing, you need to provide a DNA sample. DNA is in all our cells, so
            labs can use a blood, cheek swab, or saliva sample.
            <Cite n={1} />
          </p>

          <img
            src={`${import.meta.env.BASE_URL}medical-art/cheek-swab-test.png`}
            alt="How a DNA sample can be collected: a cheek swab, a collection kit, or a saliva sample."
            className="mx-auto w-full"
          />
          <div className="mx-auto -mt-2 grid max-w-2xl grid-cols-3 gap-4 text-center text-[0.9rem] font-medium text-muted">
            <span>Cheek swab</span>
            <span>Collection kit</span>
            <span>Saliva sample</span>
          </div>

          <p>
            The test needs to be ordered by a doctor or a genetic counselor. Ask all your
            questions before getting tested, including how much it will cost, how the results
            will help you, and what types of results you may receive.
            <Cite n={1} />
          </p>

          <p>
            You can collect the sample at the doctor's office or at home. If you collect your
            saliva or cheek swab, you will send it to the lab in a pre-paid package.
            <Cite n={1} />
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            What the tests look for
          </h3>
          <p>
            For most people, testing means a quick cheek swab — not a blood draw or a procedure.
            <Cite n={1} />
          </p>
          <p>
            Tests also differ in how much DNA they check, from a single gene your doctor already
            suspects to nearly all of it. See <LearnLink to="/learn/types-of-tests">Types of tests</LearnLink> for
            what each option involves, and how doctors weigh cost, turnaround time, and the chance
            of an uncertain result when choosing between them.
          </p>

          <figure className="mx-auto mt-4 flex max-w-3xl flex-col items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}learn-figures/testing-recommendations-symptomatic.png`}
              alt="Flowchart of general recommendations for when genetic testing is indicated in symptomatic adult and pediatric kidney patients."
              className="w-full rounded-xl border border-line"
            />
            <figcaption className="text-center text-[0.9rem] leading-snug text-muted">
              When genetic testing is generally recommended for people who already have kidney
              disease.
              <Cite n={2} />
            </figcaption>
          </figure>
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
            {
              n: 2,
              citation:
                'Franceschini, N. et al. Advancing Genetic Testing in Kidney Diseases: Report From a National Kidney Foundation Working Group. American Journal of Kidney Diseases 84, 751-766 (2024).',
              url: 'https://doi.org/10.1053/j.ajkd.2024.05.010',
            },
          ]}
        />
      </Section>
    </>
  )
}
