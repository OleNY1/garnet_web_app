import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DoctorDecorativeArt, DoctorFooter, DoctorHeader, doctorSerifFont } from "../components/DoctorShell";

const workflowTopicMeta: Record<string, { title: string; summary: string }> = {
  "clinical-examination": {
    title: "Clinical Examination",
    summary: "Extra-renal findings and examination features that shape nephrogenetic testing strategy.",
  },
  "pedigree-analysis": {
    title: "Family History Collection",
    summary: "Family structure, inheritance clues, and pedigree review that changes testing strategy.",
  },
  "how-to-choose-the-test": {
    title: "Choosing the right test",
    summary: "Framework for genetic test selection and follow-up pathways in individuals with kidney disease.",
  },
  "informed-consent": {
    title: "Informed Consent",
    summary: "Core talking points before testing, including purpose, benefits, limitations, privacy, and family implications.",
  },
  "results-disclosure-follow-up": {
    title: "Results disclosure and follow-up",
    summary: "How positive, uncertain, and negative results shape counseling, cascade testing, and next-step planning.",
  },
  "letter-of-medical-necessity-template": {
    title: "Letter of Medical Necessity",
    summary: "Physician-fillable statement to support insurance review for hereditary kidney disease genetic testing.",
  },
};

const drawPedUrl = "https://www.genecascade.org/ped-cgi/pedigree.cgi";

const pedigreeFigureUrl =
  "https://static.wixstatic.com/media/056bd2_56ab2a3225214f07a3755ecbfcf7abcc~mv2.jpeg/v1/fill/w_600,h_529,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/sfaf253fig1.jpeg";

const extrarenalFigureUrl =
  "https://static.wixstatic.com/media/056bd2_8c44bf450e1045bdb56068ff2125470b~mv2.jpg/v1/fill/w_600,h_476,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Extrarenal%20Manifestations.jpg";

const howToChooseTestReference = {
  href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11993218/",
  citation:
    "Groopman E, Milo Rasouly H. Navigating Genetic Testing in Nephrology: Options and Decision-Making Strategies. Kidney Int Rep. 2024 Dec 27;10(3):673-695. doi: 10.1016/j.ekir.2024.12.020. PMID: 40225372; PMCID: PMC11993218.",
};

const howToChooseTestFigureUrl =
  "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/27cf/11993218/856da1b2ff90/gr2.jpg";

const informedConsentPanels = [
  {
    title: "Purpose of Genetic Testing",
    accentClassName: "from-[#6bb8f0] to-[#84cdfa]",
    text: "Discuss with your patient the goal of genetic testing in their case. It might be to clarify diagnosis, guide management, support family screening, support family planning or reproductive counseling, inform donor or transplant planning, or determine whether results could change treatment planning.",
  },
  {
    title: "What the Test Involves",
    accentClassName: "from-[#77bc67] to-[#97d98d]",
    text: "A blood or saliva sample is used to analyze DNA. Explain how the sample is collected, who orders the test, where results will be returned, and what type of result discussion the patient should expect.",
  },
  {
    title: "Benefits of Testing",
    accentClassName: "from-[#d1cf4b] to-[#efe780]",
    text: "Results may clarify cause, improve treatment choices, support donor or transplant planning, and guide referrals for counseling or specialty care.",
  },
  {
    title: "Types of Genetic Tests",
    accentClassName: "from-[#8ccc72] to-[#b7e298]",
    text: "Testing may include single-gene analysis, a kidney gene panel, exome sequencing, genome sequencing, CNV analysis, or other targeted methods depending on the phenotype and suspected diagnosis.",
  },
  {
    title: "Limitations",
    accentClassName: "from-[#f2b04c] to-[#ffd57a]",
    text: "Results often include variants of uncertain significance because there is a lot we still do not know, and it is difficult to know for certain whether genetic differences between us cause disease or only explain why we are not all identical. Unless the test is done for a variant known to cause disease in the family, not finding a genetic cause does not mean that there is none; it means that we have not found one.",
  },
  {
    title: "Risks & Considerations",
    accentClassName: "from-[#6db5e5] to-[#9fcef2]",
    text: "Patients may have privacy concerns, emotional stress, uncertainty about results, and questions about what a finding means for future care or relatives. Share with the patient information about GINA.",
  },
  {
    title: "Impact on Family",
    accentClassName: "from-[#8ccb75] to-[#b8e39c]",
    text: "A result can identify at-risk relatives and may prompt cascade testing or earlier kidney surveillance in family members.",
  },
  {
    title: "What Happens Next?",
    accentClassName: "from-[#f0b250] to-[#ffd47e]",
    text: "After testing, results are reviewed with the patient, follow-up plans are adjusted, and referral to a genetic counselor may be recommended. Inform the patient when to expect the result and what to expect to happen: you will review and explain the results, adjust care if needed, and consider referral to other specialists or another genetic test.",
  },
];

const resultsDisclosureReference = {
  href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12338368/",
  citation:
    "Bogyo K, Vena N, Milo Rasouly H. The Art and Science of Genetic Counseling in Nephrology. Kidney360. 2025 Apr 23;6(7):1230-1244. doi: 10.34067/KID.0000000825. PMID: 40265959; PMCID: PMC12338368.",
};

type LetterFormState = {
  patientName: string;
  dob: string;
  insuranceId: string;
  orderingPhysician: string;
  requestedTest: string;
  clinicalSummary: string;
  physicianName: string;
  credentials: string;
  institution: string;
  contactInformation: string;
};

const createInitialLetterFormState = (): LetterFormState => ({
  patientName: "",
  dob: "",
  insuranceId: "",
  orderingPhysician: "",
  requestedTest: "",
  clinicalSummary: "",
  physicianName: "",
  credentials: "",
  institution: "",
  contactInformation: "",
});

const letterFallback = (value: string, placeholder: string) => value.trim() || placeholder;

function renderClinicalExaminationContent(onBack: () => void) {
  return (
    <div className="mt-8 rounded-[2rem] bg-white px-6 py-8 text-[#183a39] shadow-[0_14px_30px_rgba(16,35,71,0.08)] sm:px-8 lg:px-10">
      <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
        <div>
          <h3 className="text-4xl leading-tight sm:text-5xl" style={{ fontFamily: "Georgia, serif" }}>
            Clinical examination
          </h3>

          <p className="mt-6 text-xl leading-10 text-black/80">
            Look for extra-renal manifestations such as hearing loss, ocular findings, neurological symptoms,
            electrolyte abnormalities, congenital anomalies, or other syndromic findings that may point toward an
            inherited kidney condition.
          </p>

          <button
            type="button"
            onClick={onBack}
            className="mt-8 inline-flex min-w-[180px] items-center justify-center bg-[#232323] px-8 py-4 text-2xl tracking-[0.08em] text-white transition hover:bg-black"
          >
            Back
          </button>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-[#6fa9bd]/30 bg-[#dff2f8] shadow-[0_16px_36px_rgba(0,0,0,0.12)]">
          <div className="bg-gradient-to-r from-[#4c9fc2] to-[#5d62b8] px-6 py-5 text-center text-white">
            <p className="text-2xl font-semibold tracking-[0.08em] sm:text-4xl">CLINICAL NEPHROGENETICS</p>
            <p className="mt-2 text-lg sm:text-2xl">
              Uncovering <span className="font-semibold">Genetic Clues</span>
            </p>
          </div>

          <div className="p-4">
            <div className="rounded-[1.25rem] bg-white/90 p-3 shadow-sm">
              <p className="mb-3 text-lg font-semibold leading-snug text-[#173a64]">
                Extrarenal Manifestations: Look Beyond the Kidneys
              </p>
              <img
                src={extrarenalFigureUrl}
                alt="Extrarenal manifestations associated with inherited kidney disease"
                className="h-auto w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderFamilyHistoryCollectionContent(onBack: () => void) {
  return (
    <div className="mt-8 rounded-[2rem] bg-white px-6 py-8 text-[#183a39] shadow-[0_14px_30px_rgba(16,35,71,0.08)] sm:px-8 lg:px-10">
      <div className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
        <div>
          <h3 className="text-4xl leading-tight sm:text-5xl" style={{ fontFamily: "Georgia, serif" }}>
            Family History Collection
          </h3>

          <p className="mt-6 text-xl leading-10 text-black/80">
            Obtain a detailed family history for kidney disease, asking about affected relatives, age of onset,
            dialysis or transplant history, and extrarenal features.
          </p>

          <p className="mt-8 text-xl leading-10 text-black/80">
            Use pedigree analysis tools to visually map inheritance patterns. Include at least three generations if
            possible. Identify patterns suggestive of dominant, recessive, or X-linked inheritance to guide testing
            strategy.
          </p>

          <a
            href={drawPedUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-full bg-[#00687b] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#005667]"
          >
            Open DrawPed in a separate tab
          </a>

          <button
            type="button"
            onClick={onBack}
            className="mt-8 block min-w-[180px] bg-[#232323] px-8 py-4 text-2xl tracking-[0.08em] text-white transition hover:bg-black"
          >
            Back
          </button>
        </div>

        <div className="rounded-[1.5rem] border border-[#6fa9bd]/30 bg-[#dff2f8] p-4 shadow-[0_16px_36px_rgba(0,0,0,0.12)]">
          <div className="rounded-[1.25rem] bg-white/90 p-3 shadow-sm">
            <p className="mb-3 text-lg font-semibold leading-snug text-[#173a64]">
              Detailed Family History &amp; Pedigree Mapping
            </p>
            <img
              src={pedigreeFigureUrl}
              alt="Pedigree analysis figure for inherited kidney disease evaluation"
              className="h-auto w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function renderInformedConsentContent(onBack: () => void) {
  return (
    <div className="mt-8 rounded-[2rem] bg-white px-6 py-8 text-[#183a39] shadow-[0_14px_30px_rgba(16,35,71,0.08)] sm:px-8 lg:px-10">
      <div className="max-w-4xl">
        <h3 className="text-4xl leading-tight sm:text-5xl" style={{ fontFamily: "Georgia, serif" }}>
          Understanding Genetic Testing for Kidney Disease
        </h3>
        <p className="mt-5 text-xl leading-10 text-black/80">
          Before testing, patients should understand why testing is being offered, what the sample collection involves,
          what results can and cannot tell them, and how findings may affect family members and follow-up care.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {informedConsentPanels.map((panel) => (
          <article
            key={panel.title}
            className="overflow-hidden rounded-[1.5rem] border border-black/10 bg-[#f8fbff] shadow-[0_10px_24px_rgba(16,35,71,0.08)]"
          >
            <div className={`bg-gradient-to-r ${panel.accentClassName} px-5 py-4 text-[#14325b]`}>
              <h4 className="text-xl leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                {panel.title}
              </h4>
            </div>
            <div className="px-5 py-5">
              <p className="text-base leading-8 text-black/75">{panel.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-[1.5rem] border border-[#d7e2f6] bg-[#f7fbff] p-5 text-lg leading-8 text-black/75">
        <p>
          Genetic discrimination protections:{" "}
          <a
            href="/doctor/dashboard/resource/risks-not-offering"
            className="text-[#1b4fd1] underline underline-offset-4"
          >
            GINA and privacy considerations
          </a>
          .
        </p>
        <p className="mt-3">
          Ethics reference:{" "}
          <a
            href="https://code-medical-ethics.ama-assn.org/ethics-opinions/genetic-testing-counseling"
            target="_blank"
            rel="noreferrer"
            className="text-[#1b4fd1] underline underline-offset-4"
          >
            AMA Code of Medical Ethics: Genetic Testing and Counseling
          </a>
        </p>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-10 inline-flex min-w-[180px] items-center justify-center bg-[#232323] px-8 py-4 text-2xl tracking-[0.08em] text-white transition hover:bg-black"
      >
        Back
      </button>
    </div>
  );
}

function renderHowToChooseTheTestContent(onBack: () => void) {
  return (
    <div className="mt-8 rounded-[2rem] bg-white px-6 py-8 text-[#183a39] shadow-[0_14px_30px_rgba(16,35,71,0.08)] sm:px-8 lg:px-10">
      <h3 className="text-4xl leading-tight sm:text-5xl" style={{ fontFamily: "Georgia, serif" }}>
        Choosing the right test
      </h3>

      <div className="mt-8 rounded-[1.5rem] border border-[#6fa9bd]/30 bg-[linear-gradient(180deg,#fdfefe_0%,#f4fbff_100%)] p-5 shadow-[0_16px_36px_rgba(0,0,0,0.12)]">
        <img
          src={howToChooseTestFigureUrl}
          alt="Framework for genetic test selection among individuals with kidney disease"
          className="w-full rounded-[1.25rem] border border-[#d9e3f3] bg-white object-contain shadow-sm"
        />
      </div>

      <div className="mt-8 max-w-4xl text-xl leading-10 text-black/80">
        <p>
          Framework for genetic test selection among individuals with kidney disease. The workflow illustrated here is
          described in the main text in the section: &ldquo;Genetic test selection among individuals with kidney
          disease.&rdquo;
        </p>

        <p className="mt-6">
          ES, exome sequencing; GS, genome sequencing; MLPA, multiplex ligation probe-dependent amplification; NGS,
          next-generation sequencing; CNV, copy number variant; VUS, variant of uncertain significance.
        </p>
      </div>

      <div className="mt-8 rounded-[1.5rem] border border-[#d7e2f6] bg-[#f7fbff] p-5 text-black/80 shadow-sm">
        <p className="text-sm uppercase tracking-[0.22em] text-[#4f7cff]">Reference</p>
        <p className="mt-3 text-xl leading-9 underline decoration-black/50 underline-offset-4">
          <a href={howToChooseTestReference.href} target="_blank" rel="noreferrer">
            {howToChooseTestReference.citation}
          </a>
        </p>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-8 inline-flex min-w-[180px] items-center justify-center bg-[#232323] px-8 py-4 text-2xl tracking-[0.08em] text-white transition hover:bg-black"
      >
        Back
      </button>
    </div>
  );
}

function renderResultsDisclosureContent(onBack: () => void) {
  return (
    <div className="mt-8 rounded-[2rem] bg-white px-6 py-8 text-[#183a39] shadow-[0_14px_30px_rgba(16,35,71,0.08)] sm:px-8 lg:px-10">
      <div className="max-w-4xl">
        <h3 className="text-4xl leading-tight sm:text-5xl" style={{ fontFamily: "Georgia, serif" }}>
          Results disclosure and follow-up
        </h3>

        <p className="mt-6 text-xl leading-10 text-black/80">
          After testing, results are reviewed with the patient, follow-up plans are adjusted, and referral to a genetic
          counselor may be recommended.
        </p>

        <p className="mt-8 text-xl leading-10 text-black/80">
          Inform the patient when to expect the result and what to expect to happen. You will review the results,
          explain them, maybe adjust care, refer to other specialists, or consider another genetic test.
        </p>

        <div className="mt-10 rounded-[1.5rem] border border-[#d7e2f6] bg-[#f7fbff] p-5 text-black/80 shadow-sm">
          <p className="text-sm uppercase tracking-[0.22em] text-[#4f7cff]">Reference</p>
          <p className="mt-3 text-lg leading-9 underline decoration-black/50 underline-offset-4">
            <a href={resultsDisclosureReference.href} target="_blank" rel="noreferrer">
              {resultsDisclosureReference.citation}
            </a>
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="mt-8 inline-flex min-w-[180px] items-center justify-center bg-[#232323] px-8 py-4 text-2xl tracking-[0.08em] text-white transition hover:bg-black"
        >
          Back
        </button>
      </div>
    </div>
  );
}

function renderLetterOfMedicalNecessityContent(
  onBack: () => void,
  form: LetterFormState,
  onFieldChange: (field: keyof LetterFormState, value: string) => void,
) {
  return (
    <div className="mt-8 rounded-[2rem] bg-white px-6 py-8 text-[#183a39] shadow-[0_14px_30px_rgba(16,35,71,0.08)] sm:px-8 lg:px-10">
      <div className="grid gap-10 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
        <div>
          <h3 className="text-4xl leading-tight sm:text-5xl" style={{ fontFamily: "Georgia, serif" }}>
            Statement of Medical Necessity
          </h3>

          <p className="mt-6 text-xl leading-10 text-black/80">
            Enter the patient, physician, insurance, and clinical details below. The letter preview updates in place so
            the physician can complete the statement before using it for coverage review.
          </p>

          <div className="mt-8 space-y-4 rounded-[1.5rem] border border-black/10 bg-[#f7fbff] p-5 shadow-sm">
            {[
              ["patientName", "Patient Name"],
              ["dob", "DOB"],
              ["insuranceId", "Insurance ID"],
              ["orderingPhysician", "Ordering Physician"],
              ["requestedTest", "Requested Test"],
              ["physicianName", "Physician Name"],
              ["credentials", "Credentials"],
              ["institution", "Institution / Clinic"],
              ["contactInformation", "Contact Information"],
            ].map(([field, label]) => (
              <label key={field} className="block text-sm text-black/75">
                {label}
                <input
                  type="text"
                  value={form[field as keyof LetterFormState]}
                  onChange={(event) =>
                    onFieldChange(field as keyof LetterFormState, event.target.value)
                  }
                  className="mt-1 w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-black outline-none focus:border-cyan-600"
                />
              </label>
            ))}

            <label className="block text-sm text-black/75">
              Brief Clinical Summary
              <textarea
                value={form.clinicalSummary}
                onChange={(event) => onFieldChange("clinicalSummary", event.target.value)}
                rows={5}
                className="mt-1 w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-black outline-none focus:border-cyan-600"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="mt-8 inline-flex min-w-[180px] items-center justify-center bg-[#232323] px-8 py-4 text-2xl tracking-[0.08em] text-white transition hover:bg-black"
          >
            Back
          </button>
        </div>

        <div className="rounded-[1.5rem] border border-[#d9e3f3] bg-white p-6 shadow-[0_16px_36px_rgba(0,0,0,0.10)]">
          <h4 className="text-center text-3xl text-black" style={{ fontFamily: "Georgia, serif" }}>
            Statement of Medical Necessity
          </h4>

          <div className="mt-6 space-y-2 text-lg leading-8 text-black/85">
            <p>Patient Name: {letterFallback(form.patientName, "____________________________")}</p>
            <p>DOB: {letterFallback(form.dob, "____________________________")}</p>
            <p>Insurance ID: {letterFallback(form.insuranceId, "____________________________")}</p>
            <p>Ordering Physician: {letterFallback(form.orderingPhysician, "____________________________")}</p>
            <p>
              Requested Test:{" "}
              {letterFallback(
                form.requestedTest,
                "____________________________ (e.g., kidney gene panel, exome sequencing, APOL1, single-gene test)",
              )}
            </p>
          </div>

          <div className="mt-8 space-y-6 text-lg leading-9 text-black/85">
            <p>To Whom It May Concern,</p>

            <p>
              I am submitting this statement to request coverage for genetic testing for{" "}
              {letterFallback(form.patientName, "[Patient Name]")}, who presents with{" "}
              {letterFallback(
                form.clinicalSummary,
                "[brief clinical summary, e.g., early-onset chronic kidney disease, proteinuria, unexplained renal cysts, electrolyte abnormalities, steroid-resistant nephrotic syndrome, or congenital anomalies of the kidney and urinary tract]",
              )}
              . The patient&apos;s presentation raises high suspicion for a hereditary kidney disorder, supported by
              personal and/or family history of kidney disease, early onset, extrarenal manifestations, or syndromic
              features.
            </p>

            <div>
              <p>Genetic testing is medically necessary for the following reasons:</p>
              <ol className="mt-2 list-decimal pl-8 space-y-3">
                <li>
                  Accurate diagnosis: Identifying a pathogenic variant can clarify disease etiology and directly inform
                  clinical decision-making.
                </li>
                <li>
                  Guiding treatment and transplant planning: Results may influence therapy selection, disease-specific
                  management, and monitoring strategies.
                </li>
                <li>
                  Family risk assessment and cascade testing: A confirmed diagnosis allows testing and counseling of
                  at-risk relatives.
                </li>
                <li>
                  Support from clinical guidelines: Genetic testing is recommended by expert consensus and authoritative
                  nephrogenetics resources for suspected hereditary kidney disease.
                </li>
                <li>
                  Avoidance of unnecessary procedures: Earlier diagnosis can reduce repeat biopsies, empiric treatment,
                  and avoidable imaging or referrals.
                </li>
              </ol>
            </div>

            <p>
              Given these considerations, genetic testing is essential for accurate diagnosis, personalized management,
              transplant planning, and family risk assessment. I respectfully request approval for{" "}
              {letterFallback(form.requestedTest, "[specify test]")} for this patient.
            </p>

            <p>
              Thank you for your prompt review and consideration. Please contact me if additional clinical
              documentation is needed.
            </p>

            <div className="pt-4">
              <p>Sincerely,</p>
              <p className="mt-6">
                {letterFallback(form.physicianName, "[Physician Name]")}
                {form.credentials.trim() ? `, ${form.credentials.trim()}` : ", [Credentials]"}
              </p>
              <p>{letterFallback(form.institution, "[Institution / Clinic]")}</p>
              <p>{letterFallback(form.contactInformation, "[Contact Information]")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GeneticCounselingWorkflowDetailPage() {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const [searchParams] = useSearchParams();
  const normalizedTopicId = (topicId ?? "").trim().toLowerCase();
  const topic = normalizedTopicId ? workflowTopicMeta[normalizedTopicId] : undefined;
  const [letterForm, setLetterForm] = useState<LetterFormState>(() => createInitialLetterFormState());
  const source = searchParams.get("source");
  const workflowRoute = `/doctor/dashboard/resource/genetic-counseling-workflow${source ? `?source=${source}` : ""}`;
  const activeMode = source === "practical" ? "practical" : "educational";
  const renderHeader = () => (
    <>
      <DoctorHeader activeMode={activeMode} />
      <div className="border-b border-[#c3d6d9] bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={() => navigate(workflowRoute)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c3d6d9] bg-white text-[#00687b] transition-colors hover:bg-[#cfe7ea]"
            aria-label="Back to workflow"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#00687b]">
              Workflow Section
            </p>
            <h1 className="text-[1.8rem] font-bold leading-tight text-[#16323b]" style={{ fontFamily: doctorSerifFont }}>
              {topic?.title ?? "Workflow Section"}
            </h1>
          </div>
        </div>
      </div>
    </>
  );

  if (normalizedTopicId === "clinical-examination" || topic?.title === "Clinical Examination") {
    return (
      <div className="min-h-screen bg-[#f6fafa] text-[#16323b]" style={{ fontFamily: "'Inter', sans-serif" }}>
        {renderHeader()}
        <main className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 hero-wash" />
          <DoctorDecorativeArt activeMode={activeMode} />
          <div className="relative z-10 mx-auto max-w-6xl px-5 py-6 sm:px-8">
            {renderClinicalExaminationContent(() => navigate(workflowRoute))}
          </div>
        </main>
        <DoctorFooter />
      </div>
    );
  }

  if (normalizedTopicId === "pedigree-analysis" || topic?.title === "Family History Collection") {
    return (
      <div className="min-h-screen bg-[#f6fafa] text-[#16323b]" style={{ fontFamily: "'Inter', sans-serif" }}>
        {renderHeader()}
        <main className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 hero-wash" />
          <DoctorDecorativeArt activeMode={activeMode} />
          <div className="relative z-10 mx-auto max-w-6xl px-5 py-6 sm:px-8">
            {renderFamilyHistoryCollectionContent(() => navigate(workflowRoute))}
          </div>
        </main>
        <DoctorFooter />
      </div>
    );
  }

  if (normalizedTopicId === "how-to-choose-the-test" || topic?.title === "Choosing the right test") {
    return (
      <div className="min-h-screen bg-[#f6fafa] text-[#16323b]" style={{ fontFamily: "'Inter', sans-serif" }}>
        {renderHeader()}
        <main className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 hero-wash" />
          <DoctorDecorativeArt activeMode={activeMode} />
          <div className="relative z-10 mx-auto max-w-6xl px-5 py-6 sm:px-8">
            {renderHowToChooseTheTestContent(() => navigate(workflowRoute))}
          </div>
        </main>
        <DoctorFooter />
      </div>
    );
  }

  if (normalizedTopicId === "informed-consent" || topic?.title === "Informed Consent") {
    return (
      <div className="min-h-screen bg-[#f6fafa] text-[#16323b]" style={{ fontFamily: "'Inter', sans-serif" }}>
        {renderHeader()}
        <main className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 hero-wash" />
          <DoctorDecorativeArt activeMode={activeMode} />
          <div className="relative z-10 mx-auto max-w-6xl px-5 py-6 sm:px-8">
            {renderInformedConsentContent(() => navigate(workflowRoute))}
          </div>
        </main>
        <DoctorFooter />
      </div>
    );
  }

  if (
    normalizedTopicId === "results-disclosure-follow-up" ||
    topic?.title === "Results disclosure and follow-up"
  ) {
    return (
      <div className="min-h-screen bg-[#f6fafa] text-[#16323b]" style={{ fontFamily: "'Inter', sans-serif" }}>
        {renderHeader()}
        <main className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 hero-wash" />
          <DoctorDecorativeArt activeMode={activeMode} />
          <div className="relative z-10 mx-auto max-w-6xl px-5 py-6 sm:px-8">
            {renderResultsDisclosureContent(() => navigate(workflowRoute))}
          </div>
        </main>
        <DoctorFooter />
      </div>
    );
  }

  if (
    normalizedTopicId === "letter-of-medical-necessity-template" ||
    topic?.title === "Letter of Medical Necessity"
  ) {
    return (
      <div className="min-h-screen bg-[#f6fafa] text-[#16323b]" style={{ fontFamily: "'Inter', sans-serif" }}>
        {renderHeader()}
        <main className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 hero-wash" />
          <DoctorDecorativeArt activeMode={activeMode} />
          <div className="relative z-10 mx-auto max-w-6xl px-5 py-6 sm:px-8">
            {renderLetterOfMedicalNecessityContent(
              () => navigate(workflowRoute),
              letterForm,
              (field, value) => setLetterForm((prev) => ({ ...prev, [field]: value })),
            )}
          </div>
        </main>
        <DoctorFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6fafa] text-[#16323b]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {renderHeader()}
      <main className="relative min-h-[45vh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 hero-wash" />
        <DoctorDecorativeArt activeMode={activeMode} />
      </main>
      <DoctorFooter />
    </div>
  );
}
