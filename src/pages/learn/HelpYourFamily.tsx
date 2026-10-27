import type { ReactNode } from 'react'
import { Cite } from '../../components/Cite'
import { Illustration } from '../../components/learn/Illustration'
import { LearnLink } from '../../components/learn/LearnLink'
import { Term } from '../../components/learn/Term'
import { TopicIntro } from '../../components/learn/TopicIntro'
import { Section } from '../../components/Section'
import { Sources } from '../../components/Sources'
import { numbered } from '../../lib/citations'

/** One topic on this page: its picture first, then the heading and text. */
function PictureTopic({
  image,
  alt,
  title,
  children,
}: {
  image: string
  alt: string
  title: string
  children: ReactNode
}) {
  return (
    <div className="mt-2 grid items-start gap-5 sm:grid-cols-[13rem_1fr] sm:gap-7">
      <Illustration src={image} alt={alt} size="sm" />
      <div className="flex flex-col gap-4">
        <h3 className="font-display type-sub font-semibold text-ink">{title}</h3>
        {children}
      </div>
    </div>
  )
}

/**
 * What a genetic cause can mean for relatives: early diagnosis, family
 * planning (moved here from Your rights & choices), and living donation.
 */
export function HelpYourFamily() {
  return (
    <>
      <Section id="help-your-family" tone="wash" title="What your result can mean for relatives">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 type-copy text-body">
          <TopicIntro path="/learn/help-your-family" />
          <p>
            Close <Term term="relatives">relatives</Term> share some of your{' '}
            <Term term="dna">DNA</Term>, so a genetic cause found in you may matter for them too.{' '}
            <LearnLink to="/learn/family-sharing">Sharing with family</LearnLink> explains why
            telling relatives matters, and how a genetic counselor can help.
          </p>

          <PictureTopic
            image="family-generations.png"
            alt="Four people of increasing age, from a baby to an adult aged 50, standing along a timeline."
            title="Early diagnosis for relatives"
          >
            <p>
              Once the genetic cause is known, blood relatives who may have the same genetic disease
              can be easily tested for the genetic change identified, and the test is almost always
              covered by insurance or free (see{' '}
              <LearnLink to="/learn/types-of-tests">Types of tests</LearnLink>). This can help them
              be diagnosed early and start kidney-protective treatment early, which can delay the
              need for dialysis by up to 27 years.
              <Cite n={1} />
              <Cite n={2} />
              <Cite n={3} />
            </p>
          </PictureTopic>

          <PictureTopic
            image="pregnancy.jpg"
            alt="Illustration of a pregnant woman holding her belly."
            title="Before and during pregnancy"
          >
            <p>
              Testing embryos before pregnancy, called preimplantation genetic diagnosis (PGT-M), is
              an option enabling patients to avoid passing on the genetic disease without facing a
              decision about an existing pregnancy.
              <Cite n={4} /> There are foundations covering the financial costs of such procedure.
            </p>
            <p>
              Testing during a pregnancy (testing at 12 weeks or 18 weeks of pregnancy) is another
              option, however it is not available in all States.
            </p>
          </PictureTopic>

          <PictureTopic
            image="kidney-transplant.png"
            alt="Illustration of a kidney moving from one person to another, representing a kidney transplant."
            title="Identifying the best living donors"
          >
            <p>
              If a relative wants to donate a kidney, knowing the genetic cause of the recipient
              kidney disease can help doctors test that relative and confirm that they did not
              inherit the genetic disease and are good candidates.
              <Cite n={5} /> See{' '}
              <LearnLink to="/learn/kidney-donation">Support living donor decisions</LearnLink> to
              learn more.
            </p>
          </PictureTopic>
        </div>

        <Sources
          sources={numbered('gross2012', 'ortiz2025', 'fernandezFernandez2023', 'sabatello2020', 'thomas2023')}
        />
      </Section>
    </>
  )
}
