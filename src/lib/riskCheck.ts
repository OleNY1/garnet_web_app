/**
 * Genetic Risk Check — questions and result logic.
 *
 * Source: Dr. Milo Rasouly's "Genetic risk check" document (revised Oct 2026).
 * In that document, answers highlighted RED are "low-risk" answers and the two
 * GREEN answers (diagnosed at 50-65y AND at stage 4-5) only count as increased
 * risk when chosen together. Any other answer counts as increased risk.
 *
 * Nothing here is stored or sent anywhere; the result is computed in the browser.
 */

export type OptionDef = {
  id: string
  label: string
  /** How the answer reads inside the result sentence, if different from the label. */
  phrase?: string
}

export type OptionGroup = { title: string; options: OptionDef[] }

/* ---------- Question 1: diagnosis and/or symptoms ---------- */

export const NOT_SURE = 'not-sure'

export const diagnosisOptions: OptionDef[] = [
  { id: 'alport', label: 'Alport syndrome' },
  { id: 'apol1', label: 'APOL1-mediated nephropathy' },
  { id: 'ahus', label: 'Atypical hemolytic uremic syndrome (aHUS)' },
  { id: 'adpkd', label: 'Autosomal dominant polycystic kidney disease (ADPKD)' },
  { id: 'c3g', label: 'C3 glomerulopathy' },
  { id: 'complement', label: 'Complement disorder' },
  {
    id: 'cakut',
    label: 'Congenital anomaly of the kidney or urinary tract (CAKUT, e.g. single kidney, horseshoe kidney)',
    phrase: 'congenital anomaly of the kidney or urinary tract (CAKUT)',
  },
  { id: 'congenital-nephrotic', label: 'Congenital nephrotic syndrome' },
  { id: 'cystinuria', label: 'Cystinuria' },
  { id: 'dent', label: 'Dent disease' },
  { id: 'diabetic', label: 'Diabetic nephropathy (Kidney disease caused by diabetes)', phrase: 'diabetic nephropathy' },
  { id: 'fabry', label: 'Fabry disease' },
  { id: 'fsgs', label: 'Focal segmental glomerulosclerosis (FSGS)' },
  { id: 'gitelman', label: 'Gitelman syndrome' },
  { id: 'glomerular-biopsy', label: 'Glomerular disease based on kidney biopsy' },
  {
    id: 'hypertensive',
    label: 'Hypertensive nephropathy (Kidney disease caused by hypertension)',
    phrase: 'hypertensive nephropathy',
  },
  { id: 'ckd-unknown', label: 'Kidney disease of unknown cause' },
  { id: 'failure-unknown', label: 'Kidney failure of unknown cause' },
  { id: 'nphp', label: 'Nephronophthisis (NPHP, tiny cysts)', phrase: 'nephronophthisis (NPHP)' },
  {
    id: 'nephrotic',
    label: 'Nephrotic syndrome (protein in the urine and swelling)',
    phrase: 'nephrotic syndrome',
  },
  {
    id: 'pkd-other',
    label: 'Polycystic Kidney Disease, but not ADPKD',
    phrase: 'polycystic kidney disease other than ADPKD',
  },
  { id: 'hyperoxaluria', label: 'Primary hyperoxaluria' },
  { id: 'stones', label: 'Recurrent Kidney Stones', phrase: 'recurrent kidney stones' },
  { id: 'srns', label: 'Steroid-resistant nephrotic syndrome' },
  { id: 'tsc', label: 'Tuberous sclerosis complex (TSC)' },
  { id: 'tubulointerstitial', label: 'Tubulointerstitial disease' },
  { id: 'tubulopathy', label: 'Tubulopathy' },
  {
    id: 'genetic-other',
    label: 'A genetic diagnosis not listed here',
    phrase: 'a genetic diagnosis not listed on this form',
  },
  { id: NOT_SURE, label: 'I am not sure' },
]

/* ---------- Questions 2, 5b, 7: age bands ---------- */

export const ageOptions: OptionDef[] = [
  { id: 'lt18', label: 'Less than 18y old', phrase: 'before age 18' },
  { id: '18-35', label: '18-35y old', phrase: 'between ages 18 and 35' },
  { id: '35-50', label: '35-50y old', phrase: 'between ages 35 and 50' },
  { id: '50-65', label: '50-65y old', phrase: 'between ages 50 and 65' },
  { id: 'gt65', label: 'More than 65y old', phrase: 'after age 65' },
]

/* ---------- Question 3: stage ---------- */

export const stageOptions: OptionDef[] = ['1', '2', '3', '4', '5'].map((s) => ({
  id: s,
  label: `Stage ${s}`,
  phrase: `stage ${s}`,
}))

/* ---------- Question 4: other medical information, grouped by organ ---------- */

export const NONE = 'none'

export const featureGroups: OptionGroup[] = [
  {
    title: 'Hearing',
    options: [
      {
        id: 'hearing',
        label: 'Deafness or difficulty hearing, even if using hearing aid(s) before the age of 65 (sensorineural)',
        phrase: 'deafness or difficulty hearing before the age of 65',
      },
    ],
  },
  {
    title: 'Eyes',
    options: [
      { id: 'vision', label: 'Blindness or difficulty seeing, even if wearing glasses', phrase: 'blindness or difficulty seeing' },
      { id: 'corneal-opacity', label: 'Central corneal opacity' },
      { id: 'cataract', label: 'Congenital cataract' },
      { id: 'iris', label: 'Iris abnormalities' },
      { id: 'microphthalmia', label: 'Microphthalmia' },
      { id: 'microcornea', label: 'Microcornea' },
      { id: 'coloboma', label: 'Optical coloboma' },
      { id: 'optic-atrophy', label: 'Optic nerve atrophy' },
      { id: 'drusen', label: 'Optic disc drusen' },
      { id: 'pseudopapilloedema', label: 'Pseudopapilloedema' },
    ],
  },
  {
    title: 'Skin and hair',
    options: [
      { id: 'angiokeratomas', label: 'Angiokeratomas' },
      { id: 'cafe-au-lait', label: 'Café-au-lait spots' },
      { id: 'sparse-hair', label: 'Fine sparse hair (not age related)', phrase: 'fine sparse hair' },
      { id: 'hyperextensible', label: 'Hyperextensible skin' },
      { id: 'hyperkeratosis', label: 'Hyperkeratosis' },
      { id: 'hemangioma', label: 'Hemangioma(s)' },
      { id: 'hypertrichosis', label: 'Hypertrichosis' },
      { id: 'ichthyosis', label: 'Ichthyosis' },
      { id: 'nevus-flammeus', label: 'Nevus flammeus' },
    ],
  },
  {
    title: 'Other organs and differences present at birth',
    options: [
      { id: 'liver-cysts', label: 'Liver or pancreatic cysts' },
      { id: 'cleft', label: 'Cleft palate or cleft lip' },
      { id: 'heart', label: 'Heart disease present at birth' },
      { id: 'digits', label: 'Missing or extra fingers or toes at birth' },
    ],
  },
  {
    title: 'Bones and joints',
    options: [
      { id: 'gout', label: 'Gout' },
      { id: 'joint-laxity', label: 'Joint laxity' },
      { id: 'skeletal', label: 'Skeletal problems' },
      { id: 'spinal', label: 'Spinal abnormalities' },
    ],
  },
  {
    title: 'Development and childhood',
    options: [
      {
        id: 'neurologic',
        label: 'Neurologic differences (e.g., autism, treated hyperactivity, severe dyslexia)',
        phrase: 'neurologic differences',
      },
      {
        id: 'developmental',
        label: 'Developmental differences (e.g., walking, talking relatively late, slow growth in childhood)',
        phrase: 'developmental differences',
      },
      { id: 'childhood-other', label: 'Other problems in childhood' },
    ],
  },
]

export const yesNoOptions: OptionDef[] = [
  { id: 'yes', label: 'Yes' },
  { id: 'no', label: 'No' },
]

/* ---------- Answers ---------- */

export type Answers = {
  diagnoses: string[] // Q1 (multi)
  ageAtDiagnosis: string | null // Q2
  stage: string | null // Q3
  features: string[] // Q4 (multi)
  adopted: string | null // Q5
  familyKidney: string | null // Q5a, only if not adopted
  familyKidneyAges: string[] // Q5b (multi), only if Q5a = yes
  familyFailure: string | null // Q6, only if not adopted
  familyFailureAges: string[] // Q7 (multi), only if Q6 = yes
}

export const emptyAnswers: Answers = {
  diagnoses: [],
  ageAtDiagnosis: null,
  stage: null,
  features: [],
  adopted: null,
  familyKidney: null,
  familyKidneyAges: [],
  familyFailure: null,
  familyFailureAges: [],
}

export type QuestionKey = keyof Answers

/** Which questions are on screen, given the answers so far. */
export function visibleQuestions(a: Answers): QuestionKey[] {
  const keys: QuestionKey[] = ['diagnoses', 'ageAtDiagnosis', 'stage', 'features', 'adopted']
  if (a.adopted === 'no') {
    keys.push('familyKidney')
    if (a.familyKidney === 'yes') keys.push('familyKidneyAges')
    keys.push('familyFailure')
    if (a.familyFailure === 'yes') keys.push('familyFailureAges')
  }
  return keys
}

export const questionNumber: Record<QuestionKey, string> = {
  diagnoses: '1',
  ageAtDiagnosis: '2',
  stage: '3',
  features: '4',
  adopted: '5',
  familyKidney: '5a',
  familyKidneyAges: '5b',
  familyFailure: '6',
  familyFailureAges: '7',
}

export function unanswered(a: Answers): QuestionKey[] {
  return visibleQuestions(a).filter((k) => {
    const v = a[k]
    return Array.isArray(v) ? v.length === 0 : v === null
  })
}

/* ---------- Scoring ---------- */

/** Red ("low-risk") answers from the document. Anything else raises the result. */
const LOW_RISK: Partial<Record<QuestionKey, string[]>> = {
  diagnoses: [NOT_SURE],
  ageAtDiagnosis: ['gt65'], // 50-65 is green: see the combination rule below
  stage: ['1', '2', '3'], // 4 and 5 are green: see the combination rule below
  features: [NONE],
  adopted: ['yes', 'no'], // adoption only changes which sentence is shown
  familyKidney: ['no'],
  familyKidneyAges: ['50-65', 'gt65'],
  familyFailure: ['no'],
  familyFailureAges: ['gt65'],
}

export type Contribution = { key: QuestionKey; ids: string[] }

export type RiskResult = {
  level: 'low' | 'increased'
  adopted: boolean
  /** The answers that raised the result, so the summary can point them out. */
  contributing: Contribution[]
  sentence: string
}

const byId = (opts: OptionDef[]) => new Map(opts.map((o) => [o.id, o]))
const diagnosisById = byId(diagnosisOptions)
const ageById = byId(ageOptions)
const stageById = byId(stageOptions)
const featureById = byId(featureGroups.flatMap((g) => g.options))

const PROPER_START = /^(Alport|Dent|Fabry|Gitelman|APOL1|C3|[A-Z]{2})/

/** Turn a label into mid-sentence form ("Congenital cataract" -> "congenital cataract"). */
function phraseOf(o: OptionDef | undefined): string {
  if (!o) return ''
  if (o.phrase) return o.phrase
  return PROPER_START.test(o.label) ? o.label : o.label.charAt(0).toLowerCase() + o.label.slice(1)
}

/** "a", "a and b", "a, b, and c" */
export function joinList(items: string[], conj = 'and'): string {
  if (items.length <= 1) return items[0] ?? ''
  if (items.length === 2) return `${items[0]} ${conj} ${items[1]}`
  return `${items.slice(0, -1).join(', ')}, ${conj} ${items[items.length - 1]}`
}

const ageList = (ids: string[]) =>
  joinList(ageOptions.filter((o) => ids.includes(o.id)).map((o) => phraseOf(o)))

/** One clause per answered question, in question order, each starting with "that". */
export function answerClauses(a: Answers): string[] {
  const visible = new Set(visibleQuestions(a))
  const clauses: string[] = []

  if (a.diagnoses.includes(NOT_SURE)) {
    clauses.push('that you are not sure of your diagnosis')
  } else if (a.diagnoses.length) {
    const names = diagnosisOptions.filter((o) => a.diagnoses.includes(o.id)).map((o) => phraseOf(diagnosisById.get(o.id)))
    clauses.push(`that you reported ${joinList(names)} as your diagnosis or symptoms`)
  }

  if (a.ageAtDiagnosis && a.stage) {
    clauses.push(
      `that you were first diagnosed with ${phraseOf(stageById.get(a.stage))} kidney disease ${phraseOf(ageById.get(a.ageAtDiagnosis))}`,
    )
  }

  if (a.features.includes(NONE)) {
    clauses.push('that you have none of the other medical problems listed')
  } else if (a.features.length) {
    const all = featureGroups.flatMap((g) => g.options)
    const names = all.filter((o) => a.features.includes(o.id)).map((o) => phraseOf(featureById.get(o.id)))
    clauses.push(`that you have ${joinList(names)}`)
  }

  if (a.adopted === 'yes') {
    clauses.push("that you are adopted and don't know your biological family's medical history")
  }

  if (visible.has('familyKidney')) {
    if (a.familyKidney === 'no') {
      clauses.push('that you have no known family members with kidney disease')
    } else if (a.familyKidney === 'yes') {
      clauses.push(
        a.familyKidneyAges.length
          ? `that you have family members with kidney disease who first showed signs of it ${ageList(a.familyKidneyAges)}`
          : 'that you have family members with kidney disease',
      )
    }
  }

  if (visible.has('familyFailure')) {
    if (a.familyFailure === 'no') {
      clauses.push('that no family members need dialysis or a kidney transplant')
    } else if (a.familyFailure === 'yes') {
      clauses.push(
        a.familyFailureAges.length
          ? `that you have family members who need dialysis or a kidney transplant, who developed kidney failure ${ageList(a.familyFailureAges)}`
          : 'that you have family members who need dialysis or a kidney transplant',
      )
    }
  }

  return clauses
}

const LOW_NOT_ADOPTED =
  'Given the age at which you were diagnosed with kidney disease, the absence of known family history of kidney disease, and the absence of additional medical problems unrelated to your kidney disease, your chance of having a genetic cause of kidney disease is thought to range between 3-9% depending on the studies (1 in 11 to 1 in 33 individuals with kidney disease have a genetic cause that can be identified).'

const LOW_ADOPTED =
  "Given the age at which you were diagnosed with kidney disease, and the absence of additional medical problems unrelated to your kidney disease, your chance of having a genetic cause of kidney disease is thought to range between 3-9% depending on the studies (1 in 11 to 1 in 33 individuals with kidney disease have a genetic cause that can be identified). However, because we don't know your family history, this estimate is less accurate."

const INCREASED_TAIL =
  'your chance of having a genetic cause of kidney disease is higher than in the general population. In the general population, the chances of having a genetic cause of kidney disease are thought to range between 3-9% depending on the studies (1 in 11 to 1 in 33 individuals with kidney disease have a genetic cause that can be identified).'

export function evaluate(a: Answers): RiskResult {
  const contributing: Contribution[] = []

  for (const key of visibleQuestions(a)) {
    const value = a[key]
    const ids = Array.isArray(value) ? value : value ? [value] : []
    const raising = ids.filter((id) => !(LOW_RISK[key] ?? []).includes(id))
    // The two green answers are handled together below.
    const filtered =
      key === 'ageAtDiagnosis' ? raising.filter((id) => id !== '50-65') : key === 'stage' ? raising.filter((id) => id !== '4' && id !== '5') : raising
    if (filtered.length) contributing.push({ key, ids: filtered })
  }

  // Green combination: diagnosed at 50-65y AND at stage 4 or 5.
  if (a.ageAtDiagnosis === '50-65' && (a.stage === '4' || a.stage === '5')) {
    contributing.push({ key: 'ageAtDiagnosis', ids: ['50-65'] }, { key: 'stage', ids: [a.stage] })
  }

  const adopted = a.adopted === 'yes'

  if (contributing.length === 0) {
    return { level: 'low', adopted, contributing, sentence: adopted ? LOW_ADOPTED : LOW_NOT_ADOPTED }
  }

  const clauses = answerClauses(a)
  const sentence = `Given ${joinList(clauses)}, ${INCREASED_TAIL}`
  return { level: 'increased', adopted, contributing, sentence }
}

/** True when this specific answer raised the result. */
export function isContributing(result: RiskResult, key: QuestionKey, id: string): boolean {
  return result.contributing.some((c) => c.key === key && c.ids.includes(id))
}
