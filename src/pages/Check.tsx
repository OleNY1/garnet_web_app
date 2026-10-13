import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  CircleCheck,
  ClipboardCheck,
  Info,
  ListChecks,
  RotateCcw,
  Stethoscope,
  TriangleAlert,
  UserRound,
} from 'lucide-react'
import { Button } from '../components/Button'
import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { cx } from '../lib/cx'
import {
  NONE,
  NOT_SURE,
  ageOptions,
  diagnosisOptions,
  emptyAnswers,
  evaluate,
  featureGroups,
  isContributing,
  questionNumber,
  stageOptions,
  unanswered,
  visibleQuestions,
  yesNoOptions,
} from '../lib/riskCheck'
import type { Answers, OptionDef, QuestionKey, RiskResult } from '../lib/riskCheck'

type Audience = 'patient' | 'doctor'

/** Italicize gene names, per the source document. */
function renderLabel(label: string): ReactNode {
  const i = label.indexOf('APOL1')
  if (i === -1) return label
  return (
    <>
      {label.slice(0, i)}
      <em>APOL1</em>
      {label.slice(i + 5)}
    </>
  )
}

/* ---------- Option inputs ---------- */

const optionClasses =
  'flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-surface px-4 py-3 text-[1rem] leading-snug text-ink transition-colors duration-150 hover:border-brand/60 hover:bg-brand-soft/40 has-[:checked]:border-brand has-[:checked]:bg-brand-soft'

function OptionInput({
  type,
  name,
  option,
  checked,
  onChange,
}: {
  type: 'radio' | 'checkbox'
  name: string
  option: OptionDef
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className={optionClasses}>
      <input
        type={type}
        name={name}
        value={option.id}
        checked={checked}
        onChange={onChange}
        className="mt-[0.2rem] size-[1.1rem] shrink-0 accent-[var(--brand)]"
      />
      <span>{renderLabel(option.label)}</span>
    </label>
  )
}

function Question({
  id,
  number,
  title,
  hint,
  missing,
  children,
}: {
  id: QuestionKey
  number: string
  title: ReactNode
  hint?: ReactNode
  missing: boolean
  children: ReactNode
}) {
  return (
    <fieldset
      id={`q-${id}`}
      className={cx(
        'scroll-mt-28 rounded-3xl border bg-surface p-5 shadow-soft sm:p-7',
        missing ? 'border-accent' : 'border-line',
      )}
    >
      <legend className="sr-only">
        Question {number}: {title}
      </legend>
      <div aria-hidden="true" className="flex items-start gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft font-display text-[1.05rem] font-semibold text-brand">
          {number}
        </span>
        <div className="pt-1.5">
          <p className="font-display text-[1.25rem] leading-snug font-semibold text-ink sm:text-[1.35rem]">{title}</p>
          {hint ? <div className="mt-2 text-[0.98rem] leading-relaxed text-muted">{hint}</div> : null}
        </div>
      </div>
      {missing ? (
        <p className="mt-4 flex items-center gap-2 text-[0.98rem] font-semibold text-accent">
          <TriangleAlert aria-hidden="true" className="size-4" />
          Please answer this question.
        </p>
      ) : null}
      <div className="mt-5">{children}</div>
    </fieldset>
  )
}

function SingleChoice({
  name,
  options,
  value,
  onChange,
  columns = 'sm:grid-cols-2',
}: {
  name: string
  options: OptionDef[]
  value: string | null
  onChange: (id: string) => void
  columns?: string
}) {
  return (
    <div className={cx('grid gap-3', columns)}>
      {options.map((o) => (
        <OptionInput key={o.id} type="radio" name={name} option={o} checked={value === o.id} onChange={() => onChange(o.id)} />
      ))}
    </div>
  )
}

/** Checkbox list where one option (e.g. "I am not sure") clears the others. */
function MultiChoice({
  name,
  options,
  value,
  exclusive,
  onChange,
}: {
  name: string
  options: OptionDef[]
  value: string[]
  exclusive?: string
  onChange: (next: string[]) => void
}) {
  const toggle = (id: string) => {
    if (value.includes(id)) return onChange(value.filter((v) => v !== id))
    if (id === exclusive) return onChange([id])
    return onChange([...value.filter((v) => v !== exclusive), id])
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((o) => (
        <OptionInput key={o.id} type="checkbox" name={name} option={o} checked={value.includes(o.id)} onChange={() => toggle(o.id)} />
      ))}
    </div>
  )
}

/* ---------- Result ---------- */

const summaryTitles: Record<QuestionKey, string> = {
  diagnoses: 'Your diagnosis and/or symptoms',
  ageAtDiagnosis: 'Your age at first diagnosis',
  stage: 'Stage of kidney disease at first diagnosis',
  features: 'Other medical information',
  adopted: "Adopted, and don't know your biological family",
  familyKidney: 'Family members with kidney disease',
  familyKidneyAges: 'Their age when signs of kidney disease first appeared',
  familyFailure: 'Family members who need dialysis or a kidney transplant',
  familyFailureAges: 'Their age when they developed kidney failure',
}

const allFeatures = featureGroups.flatMap((g) => g.options)
const noneOption: OptionDef = { id: NONE, label: 'None of the above' }

const optionsFor: Record<QuestionKey, OptionDef[]> = {
  diagnoses: diagnosisOptions,
  ageAtDiagnosis: ageOptions,
  stage: stageOptions,
  features: [...allFeatures, noneOption],
  adopted: yesNoOptions,
  familyKidney: yesNoOptions,
  familyKidneyAges: ageOptions,
  familyFailure: yesNoOptions,
  familyFailureAges: ageOptions,
}

function ResultPanel({ answers, result, onReset }: { answers: Answers; result: RiskResult; onReset: () => void }) {
  const increased = result.level === 'increased'

  return (
    <div
      className={cx(
        'overflow-hidden rounded-[2rem] border-2 bg-surface shadow-lift',
        increased ? 'border-accent' : 'border-brand',
      )}
    >
      <div className={cx('flex items-start gap-4 px-6 py-6 sm:px-9 sm:py-8', increased ? 'bg-accent-soft' : 'bg-brand-soft')}>
        <span
          className={cx(
            'flex size-12 shrink-0 items-center justify-center rounded-2xl bg-surface',
            increased ? 'text-accent' : 'text-brand',
          )}
        >
          {increased ? <TriangleAlert aria-hidden="true" className="size-6" /> : <CircleCheck aria-hidden="true" className="size-6" />}
        </span>
        <div>
          <p className={cx('text-[0.95rem] font-bold tracking-[0.14em] uppercase', increased ? 'text-accent' : 'text-brand')}>
            Your result
          </p>
          <h2 id="result-heading" className="mt-1 font-display text-[1.7rem] leading-tight font-semibold text-ink sm:text-[2rem]">
            {increased ? 'Increased risk of a genetic cause' : 'Low risk of a genetic cause'}
          </h2>
        </div>
      </div>

      <div className="px-6 py-7 sm:px-9 sm:py-9">
        <p className="text-[1.08rem] leading-relaxed text-ink sm:text-[1.15rem]">{result.sentence}</p>

        <h3 className="mt-9 font-display text-[1.3rem] font-semibold text-ink">Summary of your answers</h3>
        <p className="mt-1 text-[0.98rem] text-muted">
          {increased ? (
            <>
              Answers marked{' '}
              <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[0.85rem] font-semibold text-accent">
                Contributed to your result
              </span>{' '}
              are the ones that raised your result.
            </>
          ) : (
            'None of your answers raised your result.'
          )}
        </p>

        <dl className="mt-5 divide-y divide-line rounded-2xl border border-line">
          {visibleQuestions(answers).map((key) => {
            const value = answers[key]
            const ids = Array.isArray(value) ? value : value ? [value] : []
            const labels = optionsFor[key].filter((o) => ids.includes(o.id))
            return (
              <div key={key} className="grid gap-2 px-5 py-4 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-6">
                <dt className="text-[0.95rem] font-semibold text-muted">
                  {questionNumber[key]}. {summaryTitles[key]}
                </dt>
                <dd>
                  <ul className="space-y-1.5">
                    {labels.map((o) => {
                      const raised = isContributing(result, key, o.id)
                      return (
                        <li key={o.id} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-ink">
                          <span className={cx(raised && 'font-semibold')}>{renderLabel(o.label)}</span>
                          {raised ? (
                            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[0.8rem] font-semibold text-accent">
                              Contributed to your result
                            </span>
                          ) : null}
                        </li>
                      )
                    })}
                  </ul>
                </dd>
              </div>
            )
          })}
        </dl>

        <p className="mt-6 flex items-start gap-2 text-[0.98rem] leading-relaxed text-muted">
          <Info aria-hidden="true" className="mt-1 size-4 shrink-0" />
          This does not replace professional genetic counseling. Your answers are not recorded.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button href="/how-to-get-tested" className="w-full sm:w-auto">
            See how to get tested
            <ArrowRight aria-hidden="true" className="size-5" />
          </Button>
          <Button variant="secondary" onClick={onReset} className="w-full sm:w-auto">
            <RotateCcw aria-hidden="true" className="size-5" />
            Start over
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ---------- Page ---------- */

const prefaces: Record<Audience, ReactNode> = {
  patient: (
    <>
      Please answer the following questions to the best of your ability. If you do not know the answer, you can get back
      to the form later, after you ask your doctor or family members for more information. The answers will not be
      recorded. Once you press the &ldquo;Analyze&rdquo; option, you will receive an answer based on your responses.
      This does not replace professional genetic counseling.
    </>
  ),
  doctor: (
    <>
      Please ask your patient the following questions (except the first question). For the &ldquo;other medical
      conditions&rdquo;, showing pictures can increase the odds that your patient will answer correctly. Your patient
      might need to ask family members to correctly answer those questions. In that case, we recommend that you repeat
      the questionnaire at the next meeting.
    </>
  ),
}

export function Check() {
  const [params, setParams] = useSearchParams()
  const audience: Audience = params.get('for') === 'doctor' ? 'doctor' : 'patient'
  const [answers, setAnswers] = useState<Answers>(emptyAnswers)
  const [result, setResult] = useState<RiskResult | null>(null)
  const [missing, setMissing] = useState<QuestionKey[]>([])
  const resultRef = useRef<HTMLDivElement>(null)

  const update = <K extends QuestionKey>(key: K, value: Answers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
    setMissing((prev) => prev.filter((k) => k !== key))
    setResult(null) // an old result no longer matches the answers
  }

  const setAudience = (next: Audience) => {
    const p = new URLSearchParams(params)
    if (next === 'doctor') p.set('for', 'doctor')
    else p.delete('for')
    setParams(p, { replace: true })
  }

  const analyze = () => {
    const gaps = unanswered(answers)
    setMissing(gaps)
    if (gaps.length) {
      document.getElementById(`q-${gaps[0]}`)?.scrollIntoView({ block: 'start' })
      return
    }
    setResult(evaluate(answers))
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ block: 'start' }))
  }

  const reset = () => {
    setAnswers(emptyAnswers)
    setResult(null)
    setMissing([])
    document.getElementById('check')?.scrollIntoView({ block: 'start' })
  }

  const visible = new Set(visibleQuestions(answers))
  const isMissing = (k: QuestionKey) => missing.includes(k)
  const groupTitle = 'mb-4 mt-12 font-display text-[1.5rem] font-semibold text-ink first:mt-0 sm:text-[1.7rem]'

  return (
    <>
      <PageHero
        icon={ListChecks}
        tint="accent"
        eyebrow="Genetic Risk Check"
        title="A few questions about your kidney disease"
        intro="Answer questions about your diagnosis, other health problems, and your family's health, and we will tell you how your chance of having a genetic cause of kidney disease compares."
      />

      <Section id="check" className="!py-10 sm:!py-14">
        <div className="mx-auto max-w-3xl">
          {/* Who is filling in the form: only the preface changes. */}
          <div role="group" aria-label="Who is filling in this form" className="inline-flex rounded-full border border-line bg-surface p-1">
            {(
              [
                ['patient', 'For patients', UserRound],
                ['doctor', 'For doctors', Stethoscope],
              ] as const
            ).map(([value, label, Icon]) => (
              <button
                key={value}
                type="button"
                aria-pressed={audience === value}
                onClick={() => setAudience(value)}
                className={cx(
                  'inline-flex min-h-[2.75rem] cursor-pointer items-center gap-2 rounded-full px-5 text-[0.98rem] font-semibold transition-colors duration-150',
                  audience === value ? 'bg-btn text-on-brand' : 'text-muted hover:text-brand',
                )}
              >
                <Icon aria-hidden="true" className="size-4" />
                {label}
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-3xl border border-line bg-wash px-6 py-5 text-[1.02rem] leading-relaxed text-body sm:px-7">
            {prefaces[audience]}
          </div>

          <form
            className="mt-12"
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              analyze()
            }}
          >
            <h2 className={groupTitle}>Your diagnosis</h2>
            <Question
              id="diagnoses"
              number="1"
              title="Please select the diagnosis and/or symptoms you have"
              hint="Select all that apply."
              missing={isMissing('diagnoses')}
            >
              <MultiChoice
                name="diagnoses"
                options={diagnosisOptions}
                value={answers.diagnoses}
                exclusive={NOT_SURE}
                onChange={(v) => update('diagnoses', v)}
              />
            </Question>

            <h2 className={groupTitle}>Age at first diagnosis of kidney disease</h2>
            <div className="space-y-5">
              <Question
                id="ageAtDiagnosis"
                number="2"
                title="How old were you when a doctor or other medical professional first diagnosed you with kidney disease?"
                missing={isMissing('ageAtDiagnosis')}
              >
                <SingleChoice
                  name="ageAtDiagnosis"
                  options={ageOptions}
                  value={answers.ageAtDiagnosis}
                  onChange={(v) => update('ageAtDiagnosis', v)}
                />
              </Question>
              <Question
                id="stage"
                number="3"
                title="Which stage of kidney disease were you when you were first diagnosed?"
                missing={isMissing('stage')}
              >
                <SingleChoice
                  name="stage"
                  options={stageOptions}
                  value={answers.stage}
                  onChange={(v) => update('stage', v)}
                  columns="grid-cols-2 sm:grid-cols-5"
                />
              </Question>
            </div>

            <h2 className={groupTitle}>Other medical information</h2>
            <Question
              id="features"
              number="4"
              title="Do you have any of the following?"
              hint="Select all that apply."
              missing={isMissing('features')}
            >
              <div className="space-y-6">
                {featureGroups.map((g) => (
                  <div key={g.title}>
                    <p className="mb-3 text-[0.9rem] font-bold tracking-[0.12em] text-brand uppercase">{g.title}</p>
                    <MultiChoice
                      name="features"
                      options={g.options}
                      value={answers.features}
                      exclusive={NONE}
                      onChange={(v) => update('features', v)}
                    />
                  </div>
                ))}
                <div className="border-t border-line pt-6">
                  <MultiChoice
                    name="features"
                    options={[noneOption]}
                    value={answers.features}
                    exclusive={NONE}
                    onChange={(v) => update('features', v)}
                  />
                </div>
              </div>
            </Question>

            <h2 className={groupTitle}>Family history</h2>
            <div className="space-y-5">
              <Question
                id="adopted"
                number="5"
                title="Are you adopted and don't know anything about your biological family?"
                missing={isMissing('adopted')}
              >
                <SingleChoice
                  name="adopted"
                  options={yesNoOptions}
                  value={answers.adopted}
                  onChange={(v) => update('adopted', v)}
                />
              </Question>

              {visible.has('familyKidney') ? (
                <Question
                  id="familyKidney"
                  number="5a"
                  title="Do you have any family members with kidney disease or other kidney problems?"
                  hint={
                    <>
                      <p>
                        Family members include people related by blood, parents, children, siblings, grandparents,
                        grandchildren, but do not include step-parents, step-siblings, step-children, in-laws, or spouses
                        who are not blood-related.
                      </p>
                      <p className="mt-2">
                        Examples of kidney disease include, but are not limited to, blood or protein in the urine, kidney
                        insufficiency, kidney cysts, dialysis, and kidney transplant.
                      </p>
                    </>
                  }
                  missing={isMissing('familyKidney')}
                >
                  <SingleChoice
                    name="familyKidney"
                    options={yesNoOptions}
                    value={answers.familyKidney}
                    onChange={(v) => update('familyKidney', v)}
                  />
                </Question>
              ) : null}

              {visible.has('familyKidneyAges') ? (
                <Question
                  id="familyKidneyAges"
                  number="5b"
                  title="How old were the affected family members when they first developed signs of kidney disease?"
                  hint="Select all that apply."
                  missing={isMissing('familyKidneyAges')}
                >
                  <MultiChoice
                    name="familyKidneyAges"
                    options={ageOptions}
                    value={answers.familyKidneyAges}
                    onChange={(v) => update('familyKidneyAges', v)}
                  />
                </Question>
              ) : null}

              {visible.has('familyFailure') ? (
                <Question
                  id="familyFailure"
                  number="6"
                  title="Do you have any family members who need dialysis or a kidney transplant?"
                  missing={isMissing('familyFailure')}
                >
                  <SingleChoice
                    name="familyFailure"
                    options={yesNoOptions}
                    value={answers.familyFailure}
                    onChange={(v) => update('familyFailure', v)}
                  />
                </Question>
              ) : null}

              {visible.has('familyFailureAges') ? (
                <Question
                  id="familyFailureAges"
                  number="7"
                  title="How old were they when they developed kidney failure?"
                  hint="Select all that apply."
                  missing={isMissing('familyFailureAges')}
                >
                  <MultiChoice
                    name="familyFailureAges"
                    options={ageOptions}
                    value={answers.familyFailureAges}
                    onChange={(v) => update('familyFailureAges', v)}
                  />
                </Question>
              ) : null}
            </div>

            <div className="mt-10 flex flex-col items-start gap-3">
              {missing.length ? (
                <p role="alert" className="flex items-center gap-2 font-semibold text-accent">
                  <TriangleAlert aria-hidden="true" className="size-5" />
                  Please answer question{missing.length > 1 ? 's' : ''}{' '}
                  {missing.map((k) => questionNumber[k]).join(', ')} before analyzing.
                </p>
              ) : null}
              <Button type="submit" className="w-full sm:w-auto">
                <ClipboardCheck aria-hidden="true" className="size-5" />
                Analyze
              </Button>
            </div>
          </form>

          <div ref={resultRef} aria-live="polite" className="scroll-mt-28">
            {result ? (
              <div className="mt-12">
                <ResultPanel answers={answers} result={result} onReset={reset} />
              </div>
            ) : null}
          </div>
        </div>
      </Section>
    </>
  )
}
