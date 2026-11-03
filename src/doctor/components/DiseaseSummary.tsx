import { Link } from "react-router-dom";
import type { GeneticDiseaseTopic } from "../data/resourceDestinationContent";
import { doctorSerifFont } from "./DoctorShell";

const genes = /\b(PKD1|PKD2|PKHD1|DZIP1L|IFT140|GANAB|ALG8|ALG9|EYA1|SIX1|SIX5|COL4A3|COL4A4|COL4A5|CLCN5|OCRL|HNF1B|PAX2|GLA|SLC12A1|SLC12A3|KCNJ1|CLCNKB|BSND|NPHP1|NPHP3|NPHP4|IQCB1|CEP290|TMEM67|NPHS1|NPHS2|ACTN4|INF2|TRPC6|APOL1|WT1|CD2AP|LMNA|PLCE1|COQ2|COQ8B|PDSS2|ADCK4|TWNK|MT-TL1|GATA3|RET|WNT4|WNT9B|BMP4|UMOD|MUC1|REN)\b/g;

export function GeneText({ text }: { text: string }) {
  return <>{text.split(genes).map((part, index) => index % 2 ? <em key={index}>{part}</em> : part)}</>;
}

type Summary = { genetics: string[]; clinical: string[]; importance: string[] };
const summaries: Record<string, Summary> = {
  adpkd: {
    genetics: ["Autosomal dominant polycystic kidney disease (ADPKD) most often results from a pathogenic variant in PKD1 or PKD2. Less common genetic causes can produce overlapping cystic phenotypes.", "Each child of an individual with a heterozygous pathogenic variant has a 50% chance of inheriting it. A negative family history can reflect a de novo variant, unrecognized disease, or variable expression."],
    clinical: ["Bilateral kidney cysts and progressive kidney enlargement; hypertension, hematuria, pain, and reduced kidney function may develop.", "Liver cysts are common. Intracranial aneurysm assessment is considered according to individual risk and guideline recommendations."],
    importance: ["Clarifies atypical or early-onset cystic disease and distinguishes overlapping genetic disorders.", "Supports prognosis, family testing, reproductive counseling, and evaluation of potential related living donors.", "Genetic findings complement clinical and imaging assessment when discussing treatment, including eligibility for disease-specific therapy."],
  },
  bor: {
    genetics: ["Branchio-oto-renal spectrum disorder is usually autosomal dominant and most commonly associated with pathogenic variants or deletions involving EYA1 or SIX1.", "Expression varies within families; a mildly affected parent may have a child with more extensive findings."],
    clinical: ["Kidney and urinary tract differences: renal agenesis, hypoplasia or dysplasia, collecting-system abnormalities, reflux, and variable loss of kidney function.", "Hearing loss may be conductive, sensorineural, or mixed, with external, middle, or inner ear differences.", "Preauricular pits or tags and branchial cleft cysts, sinuses, or fistulae are extra-renal clues."],
    importance: ["Prompts kidney assessment, longitudinal monitoring, audiology, and appropriate ENT evaluation.", "Enables testing and targeted evaluation of relatives, who may have subtle or different features.", "Informs reproductive counseling and assessment of potential family kidney donors."],
  },
  alport: {
    genetics: ["COL4A5 is associated with X-linked Alport syndrome; males are often more severely affected.", "Biallelic pathogenic variants in COL4A3 or COL4A4 cause autosomal recessive disease. Heterozygous variants may cause autosomal dominant Alport spectrum disease with variable severity."],
    clinical: ["Persistent microscopic hematuria, progressive proteinuria, and chronic kidney disease, sometimes progressing to kidney failure.", "Sensorineural hearing loss, especially with recessive (biallelic) disease and in males with COL4A5-related disease.", "Ocular findings can include anterior lenticonus and retinal flecks. Kidney biopsy may show thinning, lamellation, or splitting of the glomerular basement membrane."],
    importance: ["Supports early kidney-protective management, including appropriate renin-angiotensin system blockade, and assessment of affected relatives.", "Guides audiology and ophthalmology assessment, prognosis, reproductive counseling, and living-donor evaluation."],
  },
  dent: {
    genetics: ["Dent disease is X-linked and most commonly associated with CLCN5 (Dent disease 1) or OCRL (Dent disease 2).", "Males usually have more pronounced kidney involvement; female carriers may have milder biochemical or kidney findings."],
    clinical: ["Low-molecular-weight proteinuria and hypercalciuria, with possible nephrocalcinosis, kidney stones, and progressive chronic kidney disease.", "Proximal tubular losses can occur. Some individuals with OCRL-related disease have additional extra-renal features."],
    importance: ["Avoids misclassifying tubular proteinuria as a primary glomerular disorder.", "Guides monitoring of kidney function, stones, electrolyte and mineral abnormalities, and evaluation of relatives."],
  },
  "hnf1b-adtkd": {
    genetics: ["Heterozygous HNF1B variants or deletions cause an autosomal dominant multisystem disorder. De novo changes are common.", "A deletion involving the broader 17q12 region may have additional implications that require genetic counseling."],
    clinical: ["Kidney cysts, renal hypodysplasia or other congenital anomalies, and tubulointerstitial kidney disease.", "Hypomagnesemia, hyperuricemia, diabetes, pancreatic differences, elevated liver enzymes, and genital tract differences may occur."],
    importance: ["Connects kidney findings with metabolic and extra-renal features and guides multidisciplinary surveillance.", "Helps select sequencing and deletion/duplication analysis and supports family assessment and reproductive counseling."],
  },
  pax2: {
    genetics: ["PAX2-related disorder is usually autosomal dominant, with variable expression and possible de novo variants.", "Historical clinical names include renal coloboma syndrome and papillorenal syndrome."],
    clinical: ["Kidney hypodysplasia and other congenital kidney or urinary tract anomalies; proteinuria and progressive chronic kidney disease may occur.", "Optic nerve dysplasia or coloboma and other ocular abnormalities can be subtle and require specialist assessment."],
    importance: ["Prompts coordinated kidney and ophthalmology evaluation even when one part of the presentation is mild.", "Supports family testing, kidney surveillance, and reproductive counseling."],
  },
  fabry: {
    genetics: ["Fabry disease is X-linked and associated with pathogenic variants in GLA, which encodes alpha-galactosidase A.", "Both males and females can develop clinically important disease. In females, enzyme activity alone may not exclude the diagnosis."],
    clinical: ["Albuminuria or proteinuria and progressive kidney dysfunction; cardiac hypertrophy and cerebrovascular involvement may coexist.", "Neuropathic pain, angiokeratomas, reduced sweating, gastrointestinal symptoms, and corneal findings can be clues."],
    importance: ["Enables specialist assessment for disease-specific therapy; treatment choice depends on the variant, phenotype, and clinical context.", "Guides cardiac, neurologic, and kidney surveillance and identification of relatives who may benefit from evaluation."],
  },
  tubulopathies: {
    genetics: ["Bartter syndromes involve genes such as SLC12A1, KCNJ1, CLCNKB, and BSND. Gitelman syndrome most often involves biallelic SLC12A3 variants.", "Most forms are autosomal recessive. The gene and variant help explain overlapping presentations and inheritance risks."],
    clinical: ["Both can cause renal salt wasting, hypokalemia, and metabolic alkalosis, usually without hypertension.", "Bartter syndrome often presents earlier and may involve polyuria, growth difficulties, and hypercalciuria. Some forms include hearing loss.", "Gitelman syndrome often presents later with hypomagnesemia and low urinary calcium; clinical overlap can occur."],
    importance: ["Distinguishes inherited salt-wasting disorders from acquired causes and helps individualize electrolyte replacement and monitoring.", "Supports family testing, reproductive counseling, and evaluation for gene-specific extra-renal features."],
  },
  ciliopathies: {
    genetics: ["Nephronophthisis-related ciliopathies are genetically heterogeneous and usually autosomal recessive; NPHP1 and numerous other ciliary genes may be involved.", "Testing should consider both sequence changes and relevant deletions or duplications."],
    clinical: ["Tubulointerstitial kidney disease with impaired urinary concentration, polyuria, polydipsia, anemia, and growth difficulties.", "Kidneys may be normal sized or small; corticomedullary cysts can appear later. Onset and progression vary.", "Some forms include retinal degeneration, neurologic or cerebellar findings, liver fibrosis, or skeletal abnormalities."],
    importance: ["Explains otherwise unexplained chronic kidney disease, including presentations without an obvious family history.", "Guides evaluation for extra-renal disease, transplant planning, testing of relatives, and reproductive counseling."],
  },
};

export function DiseaseSummary({ topic }: { topic: GeneticDiseaseTopic }) {
  const summary = summaries[topic.id];
  const title = topic.id === "adpkd" ? "Autosomal Dominant Polycystic Kidney Disease (ADPKD)" : topic.title.replace(" (EYA1)", "");
  const sections = summary ? [
    { title: "Genetics and Inheritance", bullets: summary.genetics },
    { title: "Clinical Features", bullets: summary.clinical },
    { title: "Why It Is Important to Know", bullets: summary.importance },
  ] : [...topic.featureCards, ...topic.primarySections];
  const additional = summary ? topic.primarySections : [];
  return <div className="space-y-7">
    <h2 className="text-2xl font-semibold leading-tight text-[#16323b] sm:text-3xl" style={{ fontFamily: doctorSerifFont }}><GeneText text={title} /></h2>
    {[...sections, ...additional].map((section, index) => <section key={section.title} className="border-t border-[#c3d6d9] pt-5">
      <h3 className={`border-l-4 pl-3 text-xl font-semibold ${["border-[#00687b] text-[#00687b]", "border-[#78924c] text-[#425625]", "border-[#c88737] text-[#83521c]"][index % 3]}`}><GeneText text={section.title} /></h3>
      <ul className="mt-4 list-disc space-y-3 pl-6 text-base leading-relaxed text-[#3f4650]">{section.bullets.filter(bullet => !bullet.includes("licensed figure")).map(bullet => <li key={bullet}><GeneText text={bullet} /></li>)}</ul>
    </section>)}
    {topic.id === "bor" && <figure>
      <img src={`${import.meta.env.BASE_URL}resource-graphics/bor-extrarenal-features.svg`} alt="Illustrations showing a preauricular pit just in front of the ear and a branchial sinus opening on the side of the neck" className="w-full max-w-3xl" />
      <figcaption className="mt-2 text-sm text-[#5b6472]">Illustrative extra-renal clues: a preauricular pit and a lateral neck opening associated with a branchial sinus. Appearance and location vary.</figcaption>
    </figure>}
    <p className="border-t border-[#c3d6d9] pt-5 text-sm"><a href={topic.referenceUrl} target="_blank" rel="noreferrer" className="text-[#00687b] underline underline-offset-4">{topic.referenceLabel}</a></p>
    {topic.nextTopicLink && <Link className="text-[#00687b] underline underline-offset-4" to={`/doctor/dashboard/resource/common-genetic-kidney-diseases?topic=${topic.nextTopicLink.topicId}`}>{topic.nextTopicLink.label}</Link>}
  </div>;
}
