import { Cite } from '../../components/Cite'
import { CTARow } from '../../components/learn/CTARow'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'

export function SignsTestingMayHelp() {
  return (
    <>
      <Section id="signs-testing-may-help" title="When doctors are more likely to suggest testing">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <p>
            These signs make it more likely that testing will find a genetic cause. They do not
            guarantee a result. You can still benefit from testing if none of these apply. Doctors
            are more likely to suggest testing when someone has:
            <Cite n={1} />
          </p>
          <ul className="list-disc space-y-2 pl-6 marker:text-accent">
            <li>Kidney disease that started before the age of 50, got worse quickly, or is very serious</li>
            <li>Other parts of the body also affected, not only because the kidneys are failing</li>
            <li>Kidney disease in the family</li>
            <li>
              A type of kidney disease that often has a genetic cause, such as cysts in the
              kidneys, certain kinds of scarring, or kidney disease with no clear cause
            </li>
            <li>Clues from a kidney biopsy or blood tests that point to a known genetic condition</li>
          </ul>

          <figure className="mx-auto mt-2 flex max-w-3xl flex-col items-center gap-3">
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
          <CTARow tint="brand" />
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
