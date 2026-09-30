import { Cite } from '../../components/Cite'
import { LearnLink } from '../../components/learn/LearnLink'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'
import { numbered } from '../../lib/citations'

/**
 * What a genetic cause can mean for relatives: early diagnosis, family
 * planning (moved here from Your rights & choices), and living donation.
 */
export function HelpYourFamily() {
  return (
    <>
      <Section id="help-your-family" tone="wash" title="What your result can mean for relatives">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-[1.05rem] leading-relaxed text-body">
          <p>
            Close relatives share some of your DNA, so a genetic cause found in you may matter for
            them too. <LearnLink to="/learn/family-sharing">Sharing with family</LearnLink> explains
            why telling relatives matters, and how a genetic counselor can help.
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            Early diagnosis for relatives
          </h3>
          <p>
            Once the genetic cause is known, relatives who may share it can be tested for that
            same cause. This can help them be diagnosed early and start kidney-protective treatment
            early, which can delay the need for dialysis by up to 27 years.
            <Cite n={1} />
            <Cite n={2} />
            <Cite n={3} />
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            Before and during pregnancy
          </h3>
          <p>
            For people with a known genetic kidney condition in the family, testing embryos before
            pregnancy — called preimplantation genetic diagnosis — is one option that can be
            discussed with a care team. It lets people avoid passing on a specific known genetic
            variant without facing a decision about an existing pregnancy.
            <Cite n={4} />
          </p>
          <p>
            Cost is a real barrier here: this kind of testing, combined with fertility treatment,
            can run into the tens of thousands of dollars, and it's often only partly covered by
            insurance, unlike dialysis, which is generally covered by government programs despite
            being far more expensive over time.
            <Cite n={4} />
          </p>
          <p>
            Testing during a pregnancy (prenatal testing) is another option some families talk
            through with a genetic counselor.
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            Identifying safe living donors
          </h3>
          <p>
            When a relative wants to donate a kidney, knowing the exact genetic cause lets doctors
            test that relative for the same finding. This helps identify relatives who did not
            inherit the genetic cause.
            <Cite n={5} /> See{' '}
            <LearnLink to="/learn/kidney-donation">Support living donor decisions</LearnLink> to
            learn more.
          </p>
        </div>

        <Sources
          sources={numbered('gross2012', 'ortiz2025', 'fernandezFernandez2023', 'sabatello2020', 'thomas2023')}
        />
      </Section>
    </>
  )
}
