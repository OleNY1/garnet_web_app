import { Cite } from '../../components/Cite'
import { LearnLink } from '../../components/learn/LearnLink'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'

export function SignsTestingMayHelp() {
  return (
    <>
      <Section id="signs-testing-may-help" title="When doctors are more likely to suggest testing">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 type-copy text-body">
          <figure className="mx-auto flex max-w-3xl flex-col items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}learn-figures/testing-recommendations-symptomatic.png`}
              alt="Flowchart of general recommendations for when genetic testing is indicated in symptomatic adult and pediatric kidney patients."
              className="w-full rounded-xl border border-line"
            />
            <figcaption className="text-center type-support leading-snug text-muted">
              When genetic testing is generally recommended for people who already have kidney
              disease.
              <Cite n={1} />
            </figcaption>
          </figure>

          <p>
            The following signs make it more likely that genetic testing will find the cause of a
            kidney disease. However, you may still benefit from genetic testing even if none of
            these apply.
            <Cite n={2} />
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

          <div className="rounded-2xl border border-line bg-surface px-6 py-5 shadow-soft">
            <p>
              You can take the <LearnLink to="/check">Genetic Risk Check</LearnLink> to get a
              personalized response and share it with your doctor.
            </p>
            <p className="mt-3">
              When you are ready, <LearnLink to="/how-to-get-tested">How to get tested</LearnLink> explains how to
              start, from talking with your doctor to cost and insurance.
            </p>
          </div>
        </div>

        <Sources
          sources={[
            {
              n: 1,
              citation:
                'Franceschini, N. et al. Advancing Genetic Testing in Kidney Diseases: Report From a National Kidney Foundation Working Group. American Journal of Kidney Diseases 84, 751-766 (2024).',
              url: 'https://doi.org/10.1053/j.ajkd.2024.05.010',
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
