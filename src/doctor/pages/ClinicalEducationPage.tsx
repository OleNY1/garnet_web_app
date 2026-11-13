import { ArrowLeft, ArrowUpRight, CalendarCheck, ClipboardCheck, FileText, GitBranch, ShieldCheck, Users, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getEducationalGroupForResource } from "../data/resourceCards";
import { DoctorPageShell, doctorSerifFont } from "../components/DoctorShell";
import { informedConsentPanels, ethicsReferences } from "../data/clinicalEducation";
import { CITATIONS } from "../../lib/citations";

type Topic = "protections" | "responsibilities" | "counselors" | "coverage" | "tests" | "family-history" | "consent";
const titles: Record<Topic, string> = {
  protections: "Protections Against Genetic Discrimination",
  responsibilities: "The Doctor's Legal Responsibilities",
  counselors: "Genetic Counselors: Who, When, and Why?",
  coverage: "Cost and Coverage",
  tests: "Types of Genetic Tests",
  "family-history": "How to Collect Family History",
  consent: "The Components of Informed Consent",
};
const resource = "/doctor/dashboard/resource/";
const linkClass = "font-semibold text-brand underline underline-offset-4 hover:text-brand-strong";

const topicVisuals: Partial<Record<Topic, { label: string; icon: LucideIcon }[]>> = {
  protections: [{ label: "Employment", icon: ClipboardCheck }, { label: "Health insurance", icon: ShieldCheck }, { label: "Privacy", icon: FileText }],
  responsibilities: [{ label: "Discuss family impact", icon: Users }, { label: "Support communication", icon: FileText }, { label: "Coordinate follow-up", icon: CalendarCheck }],
  coverage: [{ label: "Check coverage", icon: ShieldCheck }, { label: "Confirm the estimate", icon: Wallet }, { label: "Review appeal options", icon: FileText }],
  "family-history": [{ label: "Map relationships", icon: GitBranch }, { label: "Record kidney and extra-renal findings", icon: ClipboardCheck }, { label: "Review the pedigree", icon: Users }],
};

function References({ items }: { items: Array<{ citation: string; url: string }> }) {
  return <section className="mt-10 border-t border-line pt-6" aria-label="References">
    <h2 className="text-xl font-semibold">References and Further Reading</h2>
    <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed">
      {items.map(item => <li key={item.url}><a className={linkClass} href={item.url} target="_blank" rel="noreferrer">{item.citation}</a></li>)}
    </ol>
  </section>;
}

export function ConsentPanels({ compact = false }: { compact?: boolean }) {
  return <div className="grid gap-5 sm:grid-cols-2">
    {informedConsentPanels.map(panel => <article key={panel.title} className="overflow-hidden rounded-2xl border border-line bg-surface">
      <h2 className={`bg-gradient-to-r ${panel.accentClassName} px-5 py-4 text-lg font-semibold text-ink`}>{panel.title}</h2>
      {!compact && <p className="px-5 py-5 text-base leading-relaxed text-body">{panel.text}</p>}
    </article>)}
  </div>;
}

export default function ClinicalEducationPage({ topic, referral = false }: { topic: Topic; referral?: boolean }) {
  const { pathname } = useLocation();
  const group = referral ? undefined : getEducationalGroupForResource(pathname);
  const backPath = group ? `educational/${group.id}` : referral ? "practical" : "educational";
  return <DoctorPageShell activeMode={referral ? "practical" : "educational"}>
    <div className="relative mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
      <Link to={`/doctor/dashboard/${backPath}`} className={`mb-6 inline-flex items-center gap-2 ${linkClass}`}><ArrowLeft aria-hidden="true" className="size-4" />{group?.title ?? (referral ? "Practical Tools" : "Educational Materials")}</Link>
      <h1 className="mb-8 text-3xl font-bold leading-tight sm:text-4xl" style={{ fontFamily: doctorSerifFont }}>{referral ? "Refer to a Genetic Counselor" : titles[topic]}</h1>
      {topicVisuals[topic] && <ul aria-label="Key topics" className="mb-8 grid grid-cols-1 divide-y divide-line rounded-2xl border border-line bg-[#edf6f7] dark:bg-surface-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {topicVisuals[topic].map(({ label, icon: Icon }) => <li key={label} className="flex items-center gap-3 px-5 py-4 text-sm font-semibold"><Icon aria-hidden="true" className="size-5 shrink-0 text-brand" />{label}</li>)}
      </ul>}
      <div className="space-y-7 text-base leading-relaxed text-body sm:text-lg">
        {topic === "protections" && <>
          <p>Discuss genetic discrimination protections and their limits before testing so patients can make informed decisions about their care.</p>
          <h2 className="text-2xl font-semibold text-ink">GINA at a Glance</h2>
          <ul className="list-disc space-y-3 pl-6">
            <li>The Genetic Information Nondiscrimination Act of 2008 protects against the use of genetic information, including family medical history, in health insurance and employment decisions.</li>
            <li>Employment protections generally apply to employers with at least 15 employees.</li>
            <li>GINA does not cover life insurance, disability insurance, or long-term care insurance. State protections may differ.</li>
            <li>GINA addresses genetic information; protections for an already manifested condition involve other laws. It does not guarantee coverage of a genetic test.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-ink">Privacy and Testing Decisions</h2>
          <p>Explain who will receive the result, how the laboratory handles samples and data, and how results enter the medical record. HIPAA protects identifiable health information held by covered entities, including genetic information. Discuss testing of children in the context of their current medical care and involve genetics professionals when the timing or implications are uncertain.</p>
          <Link to={`${resource}doctors-legal-responsibilities`} className={linkClass}>Family communication and the doctor's responsibilities</Link>
          <References items={[
            { citation: "National Human Genome Research Institute. Genetic Information Nondiscrimination Act: patient resource.", url: "https://www.genome.gov/sites/default/files/media/files/2020-09/GINA_patient_resource.pdf" },
            { citation: "U.S. Equal Employment Opportunity Commission. Fact Sheet: Genetic Information Nondiscrimination Act.", url: "https://www.eeoc.gov/laws/guidance/fact-sheet-genetic-information-nondiscrimination-act" },
            CITATIONS.sabatello2020,
          ]} />
        </>}
        {topic === "responsibilities" && <>
          <h2 className="text-2xl font-semibold text-ink">The Doctor Has a Responsibility to Discuss Family Communication and Cascade Testing</h2>
          <p>Genetic results have family-level impact. Clinicians should warn patients, encourage disclosure, and refer to genetic counseling when relatives may benefit from cascade testing.</p>
          <p>US case law and HIPAA guidance both support reasonable efforts centered on patient-mediated or authorized disclosure rather than direct outreach without consent.</p>
          <p>Discuss which blood relatives may benefit, offer a copy of the report or a family letter, and document the discussion, the patient's preferences, and the referral plan. Coordinate any disclosure with the patient's authorization and applicable institutional and legal requirements.</p>
          <h2 className="text-2xl font-semibold text-ink">Support Equitable Access to Testing</h2>
          <p>Base testing discussions on clinical findings and family history. Ask about the patient's preferences, concerns, costs, and access needs instead of assuming interest, ability to pay, or emotional readiness from race or ancestry. Genetic ancestry and self-identified race are distinct, and limited representation in reference datasets can affect interpretation.</p>
          <h2 className="text-2xl font-semibold text-ink">Support Families After a Result</h2>
          <p>Family communication is not automatic. Research on genomic screening found that some relatives are never informed, and genetics specialists can help patients understand whom to tell and how to share results. A genetic counselor can assist with family letters, cascade testing, and psychosocial support.</p>
          <Link to="/doctor/counselors" className={linkClass}>Refer for genetic counseling</Link>
          <References items={ethicsReferences} />
        </>}
        {topic === "counselors" && <>
          <div className="grid gap-6 sm:grid-cols-2">
            {[['genetic-counselor-in-person.png', 'In-person genetic counseling'], ['genetic-counselor-telehealth.jpg', 'Genetic counseling by telehealth']].map(([src, alt]) => <figure key={src}><img src={`${import.meta.env.BASE_URL}learn-images/${src}`} alt={alt} className="mx-auto h-40 max-w-full object-contain" /><figcaption className="mt-2 text-center text-sm">{alt}</figcaption></figure>)}
          </div>
          <h2 className="text-2xl font-semibold text-ink">Who Are Genetic Counselors?</h2>
          <p>Genetic counselors have advanced training in medical genetics and counseling to guide and support patients seeking more information about how inherited diseases and conditions might affect them or their families, and to interpret genetic test results based on personal and family history.</p>
          <h2 className="text-2xl font-semibold text-ink">When to Refer</h2>
          <ul className="list-disc space-y-3 pl-6">
            <li><strong>Before testing:</strong> A genetic counselor can provide pre-test counseling, especially when the clinical presentation, inheritance pattern, testing strategy, or reproductive implications are complex, or when clinic time is limited.</li>
            <li><strong>After results:</strong> A genetic counselor can explain the result, discuss additional testing, and help coordinate cascade testing and family communication.</li>
            <li>For kidney donor assessment.</li>
            <li>When patients have concerns about privacy or costs.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-ink">Referral Path</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <section className="rounded-2xl border border-line bg-[#edf6f7] dark:bg-surface-2 p-5">
              <h3 className="flex items-center gap-3 font-semibold text-ink"><CalendarCheck aria-hidden="true" className="size-5 shrink-0 text-brand" />One-Time Setup</h3>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-base">
                <li>Identify a genetic counselor with nephrology expertise, in person or by telehealth.</li>
                <li>Confirm referral requirements, appointment availability, insurance participation, and expected patient costs.</li>
                <li>Agree who usually orders tests, returns results, and coordinates follow-up and family testing. Roles may vary by patient.</li>
              </ol>
            </section>
            <section className="rounded-2xl border border-line bg-[#f7f4eb] dark:bg-surface-2 p-5">
              <h3 className="flex items-center gap-3 font-semibold text-ink"><Users aria-hidden="true" className="size-5 shrink-0 text-[#83521c] dark:text-accent" />For Each Patient</h3>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-base">
                <li>Explain the purpose of the referral and obtain the patient's agreement.</li>
                <li>Discuss who will order testing, return results, and coordinate follow-up and family testing as applicable.</li>
                <li>Refer to a renal genetics service or a genetic counselor with nephrology expertise.</li>
                <li>With the patient's authorization, send the clinical summary, relevant kidney investigations, family history, and existing genetic reports.</li>
              </ol>
            </section>
          </div>
          <a href="https://findageneticcounselor.nsgc.org/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#00687b] px-5 py-3 text-base font-semibold text-white">Find a Genetic Counselor at NSGC<ArrowUpRight className="size-4" /></a>
          <p><Link className={linkClass} to="/learn/genetic-counselors">Patient information about genetic counseling</Link></p>
          <References items={[CITATIONS.bogyo2025]} />
        </>}
        {topic === "coverage" && <>
          <p>Health insurance often covers genetic testing, but coverage, prior authorization, and out-of-pocket costs depend on the plan, laboratory, and test. Some laboratories offer financial assistance or self-pay options. Confirm the estimate before collecting a sample.</p>
          <h2 className="text-2xl font-semibold text-ink">Before Ordering</h2>
          <ul className="list-disc space-y-3 pl-6"><li>Check medical-necessity criteria, network status, and prior-authorization requirements for both testing and genetic counseling.</li><li>Ask the laboratory about an itemized estimate, insurance billing, financial assistance, and self-pay pricing.</li><li>Discuss possible deductibles, copays, and the difference between appointment charges and laboratory charges.</li><li>Explain that costs vary from no patient charge to several thousand dollars; do not promise coverage or a fixed price without confirmation.</li><li>If coverage is denied, review appeal options and provide the clinical documentation supporting the testing request.</li></ul>
          <p><Link to={`${resource}order-testing-directly`} className={linkClass}>Prepare a letter of medical necessity</Link></p>
          <p><Link to="/how-to-get-tested#cost-insurance" className={linkClass}>Patient information about testing costs and insurance</Link></p>
          <p><a href={`${import.meta.env.BASE_URL}costs/OH-Patient-Billing-Postcard-2026.pdf`} target="_blank" rel="noreferrer" className={linkClass}>Patient billing handout</a></p>
          <References items={[CITATIONS.bogyo2025, CITATIONS.franceschini2024]} />
        </>}
        {topic === "tests" && <>
          <p>Choose a test using the patient's clinical presentation, family history, prior genetic testing, and the genes and variant types the test can detect.</p>
          <figure className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
            <a href={`${import.meta.env.BASE_URL}resource-graphics/genetic-variant-detection-figure-1.jpg`} target="_blank" rel="noreferrer" aria-label="Open Figure 1 at full size">
              <img src={`${import.meta.env.BASE_URL}resource-graphics/genetic-variant-detection-figure-1.jpg`} alt="Diagram comparing genetic variant types with the clinical laboratory methods that can detect them" width="3045" height="4151" className="mx-auto h-auto w-full max-w-xl" />
            </a>
            <figcaption className="mt-4 text-sm leading-relaxed">
              <strong>Figure 1. Genetic technologies for variant detection.</strong>{" "}
              <a href={CITATIONS.groopman2025.url} target="_blank" rel="noreferrer" className={linkClass}>Groopman and Milo Rasouly, Kidney International Reports (2025)</a>.
              Copyright 2024 International Society of Nephrology. Reproduced unchanged under{" "}
              <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noreferrer" className={linkClass}>CC BY-NC-ND 4.0</a>.
            </figcaption>
          </figure>
          <dl className="divide-y divide-line">
            {[
              ["Familial-variant or single-gene testing", "Targeted testing is appropriate when a disease-causing familial variant is known or the clinical presentation strongly suggests one gene, as in Fabry disease."],
              ["Kidney gene panel", "Analyzes multiple genes associated with one kidney disease or a broad range of kidney diseases. Panels offer focused interpretation and coverage. Gene content and copy-number detection vary by laboratory."],
              ["Exome sequencing", "Sequences most exons (protein-coding regions). Coverage can be lower than with a panel, and not all genes are analyzed. Analysis depends on the clinical information provided to the laboratory."],
              ["Genome sequencing", "Sequences most of the genome. Coverage can be lower than with a panel, and not all genes are analyzed. Analysis depends on the clinical information provided to the laboratory."],
              ["Additional methods", "Deletion/duplication testing, chromosomal microarray, mitochondrial analysis, or other specialized assays may be needed when sequencing cannot detect the disease-causing variant."],
            ].map(([title, text]) => <div key={title} className="py-5"><dt className="font-semibold text-ink">{title}</dt><dd className="mt-2">{text}</dd></div>)}
          </dl>
          <p>Discuss positive, negative, and uncertain results, secondary findings, patient preferences, costs, and follow-up before ordering.</p>
          <p><Link to={`${resource}genetic-counseling-workflow/how-to-choose-the-test`} className={linkClass}>Choosing the right test: clinical framework</Link></p>
          <References items={[CITATIONS.groopman2025, CITATIONS.franceschini2024]} />
        </>}
        {topic === "family-history" && <>
          <p>Start with the patient's kidney diagnosis and age at onset, then collect a three-generation history where possible. Ask about both maternal and paternal relatives. An apparently negative family history does not exclude a genetic cause.</p>
          <ol className="list-decimal space-y-4 pl-6"><li><strong>Map biological relationships.</strong> Include children, siblings, parents, grandparents, aunts, uncles, and cousins; note adoption, limited contact, consanguinity if relevant, and missing information without assuming relatives are unaffected.</li><li><strong>Record kidney findings.</strong> Ask about blood or protein in the urine, cysts, congenital kidney differences, stones, reduced kidney function, dialysis, and transplantation.</li><li><strong>Document ages.</strong> Record age at first symptoms or diagnosis, age at dialysis or transplant, and age and cause of death when known.</li><li><strong>Ask about extra-renal features.</strong> Hearing or eye findings, diabetes, congenital differences, and other relevant findings can reveal a syndromic presentation.</li><li><strong>Review existing evidence.</strong> With permission, confirm diagnoses using clinical records and genetic reports. Record the source and uncertainty of reported information.</li><li><strong>Draw and update the pedigree.</strong> Mark the proband, affected relatives, relevant diagnoses, and ages. Consider dominant, recessive, X-linked, mitochondrial, and de novo possibilities. Revisit unanswered questions at a later appointment.</li></ol>
          <p><a className={linkClass} href="https://www.genecascade.org/ped-cgi/pedigree.cgi" target="_blank" rel="noreferrer">Open DrawPed to prepare a pedigree</a></p>
          <p><Link className={linkClass} to={`${resource}genetic-testing-risks`}>Use the shared Genetic Risk Check questionnaire</Link></p>
          <p><a className={linkClass} href="https://nephrogenix.wixsite.com/nephrogenetics" target="_blank" rel="noreferrer">Nephrogenetics education resources</a></p>
          <References items={[CITATIONS.bogyo2025, CITATIONS.groopman2025]} />
        </>}
        {topic === "consent" && <>
          <p>Before testing, explain the purpose and scope of the test, possible results, limitations, privacy, family implications, and follow-up. Allow time for questions, check the patient's understanding, and document consent according to the laboratory and local clinical requirements.</p>
          <ConsentPanels />
          <p><Link className={linkClass} to={`${resource}protections-against-genetic-discrimination`}>Genetic discrimination protections and their limits</Link></p>
          <p><a className={linkClass} href="https://nephrogenix.wixsite.com/nephrogenetics" target="_blank" rel="noreferrer">Nephrogenetics education resources</a></p>
          <References items={[CITATIONS.bogyo2025, CITATIONS.sabatello2020, { citation: "American Medical Association. Code of Medical Ethics: Genetic Testing and Counseling.", url: "https://code-medical-ethics.ama-assn.org/ethics-opinions/genetic-testing-counseling" }]} />
        </>}
      </div>
    </div>
  </DoctorPageShell>;
}
