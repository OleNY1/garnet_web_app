import { CITATIONS } from "../../lib/citations";

export const clinicalReferences = [CITATIONS.franceschini2024, CITATIONS.chebib2026, CITATIONS.dahl2023, CITATIONS.thomas2023];

export const informedConsentPanels = [
  {
    title: "Purpose of Genetic Testing",
    accentClassName: "from-[#6bb8f0] to-[#84cdfa]",
    text: "Discuss the goal for this patient: clarifying the diagnosis, guiding management, supporting family screening or reproductive planning, or informing kidney donation and transplantation. Explain how a result could change care and what would happen if the patient chooses not to test.",
  },
  {
    title: "What the Test Involves",
    accentClassName: "from-[#77bc67] to-[#97d98d]",
    text: "Explain which test is being ordered, how a blood or saliva sample is collected, the laboratory performing the analysis, the expected turnaround time, and who will receive and discuss the results. Confirm the patient's voluntary agreement and opportunity to ask questions.",
  },
  {
    title: "Benefits of Testing",
    accentClassName: "from-[#d1cf4b] to-[#efe780]",
    text: "A molecular diagnosis may clarify the cause of kidney disease, guide surveillance or treatment, inform transplant and donor evaluation, and identify relatives who could benefit from assessment. Discuss the benefits relevant to this patient without promising a diagnosis or a treatment.",
  },
  {
    title: "Types of Genetic Tests",
    accentClassName: "from-[#8ccc72] to-[#b7e298]",
    text: "Discuss targeted familial-variant testing, single-gene testing, gene panels, exome or genome sequencing, and any additional copy-number or other specialized analysis. Explain the scope of the chosen test and choices about secondary findings where applicable.",
  },
  {
    title: "Limitations",
    accentClassName: "from-[#f2b04c] to-[#ffd57a]",
    text: "Explain positive, negative, and uncertain results. A negative result does not exclude a genetic cause unless a relevant known familial variant has been excluded with an appropriate test. A variant of uncertain significance is not a confirmed diagnosis and may be reclassified. Discuss technical limitations and how future reanalysis or recontact will be handled.",
  },
  {
    title: "Risks and Privacy",
    accentClassName: "from-[#6db5e5] to-[#9fcef2]",
    text: "Discuss emotional responses, unexpected findings, possible implications for family relationships, who may access the result, laboratory data and sample policies, and costs. Explain GINA's employment and health-insurance protections and its exclusions for life, disability, and long-term care insurance.",
  },
  {
    title: "Impact on Family",
    accentClassName: "from-[#8ccb75] to-[#b8e39c]",
    text: "Explain inheritance and possible implications for blood relatives, reproductive decisions, and cascade testing. Ask how the patient would like to communicate results, offer a family letter or genetic counseling, and discuss relevant preferences about secondary findings before testing.",
  },
  {
    title: "What Happens Next?",
    accentClassName: "from-[#f0b250] to-[#ffd47e]",
    text: "Agree when and how results will be returned, who will interpret them, and how the patient can ask questions. Discuss possible changes to surveillance or treatment, referrals, family testing, and additional evaluation. Document the discussion and follow the laboratory's consent requirements.",
  },
];

export const ethicsReferences = [
  { citation: "Srinivasan S, Won NY, Dotson WD, Wright ST, Roberts MC. Barriers and facilitators for cascade testing in genetic conditions: a systematic review. Eur J Hum Genet. 2020;28:1631-1644. doi:10.1038/s41431-020-00725-5.", url: "https://doi.org/10.1038/s41431-020-00725-5" },
  { citation: "Rothstein MA. Reconsidering the duty to warn genetically at-risk relatives. Genet Med. 2018;20:285-290. doi:10.1038/gim.2017.257.", url: "https://doi.org/10.1038/gim.2017.257" },
  { citation: "Henrikson NB, Wagner JK, Hampel H, et al. What guidance does HIPAA offer to providers considering familial risk notification and cascade genetic testing? J Law Biosci. 2020;7(1):lsaa071. doi:10.1093/jlb/lsaa071.", url: "https://doi.org/10.1093/jlb/lsaa071" },
  { citation: "Wynn J, Milo Rasouly H, Vasquez-Loarte T, et al. Do research participants share genomic screening results with family members? J Genet Couns. 2022;31(2):447-458. Published online 2021. doi:10.1002/jgc4.1511.", url: "https://doi.org/10.1002/jgc4.1511" },
  { citation: "Flanagin A, Frey T, Christiansen SL, AMA Manual of Style Committee. Updated Guidance on the Reporting of Race and Ethnicity in Medical and Science Journals. JAMA. 2021;326(7):621-627. doi:10.1001/jama.2021.13304.", url: "https://doi.org/10.1001/jama.2021.13304" },
  { citation: "Borrell LN, Elhawary JR, Fuentes-Afflick E, et al. Race and Genetic Ancestry in Medicine - A Time for Reckoning with Racism. N Engl J Med. 2021;384:474-480. doi:10.1056/NEJMms2029562.", url: "https://doi.org/10.1056/NEJMms2029562" },
  { citation: "1000 Genomes Project Consortium, Auton A, Brooks LD, et al. A global reference for human genetic variation. Nature. 2015;526:68-74. doi:10.1038/nature15393.", url: "https://doi.org/10.1038/nature15393" },
  { citation: "Ademuyiwa FO, Salyer P, Tao Y, et al. Genetic Counseling and Testing in African American Patients With Breast Cancer: A Nationwide Survey of US Breast Oncologists. J Clin Oncol. 2021;39(36):4020-4028. doi:10.1200/JCO.21.01426.", url: "https://doi.org/10.1200/JCO.21.01426" },
  { citation: "d'Audiffret Van Haecke D, de Montgolfier S. Genetic diseases and information to relatives: practical and ethical issues for professionals after introduction of a legal framework in France. Eur J Hum Genet. 2018;26:786-795. doi:10.1038/s41431-018-0103-9.", url: "https://doi.org/10.1038/s41431-018-0103-9" },
  { citation: "Foster C, Gilbar R. Is there a New Duty to Warn Family Members in English Medical Law? ABC v St George's Healthcare NHS Trust and Others [2020] EWHC 455. Med Law Rev. 2021;29(2):359-372. doi:10.1093/medlaw/fwab006.", url: "https://doi.org/10.1093/medlaw/fwab006" },
];

export const annalsReference = {
  citation: "Milo Rasouly H, Groopman EE, Heyman-Kantor R, et al. The Burden of Candidate Pathogenic Variants for Kidney and Genitourinary Disorders Emerging From Exome Sequencing. Ann Intern Med. 2019;170(1):11-21. doi:10.7326/M18-1241.",
  url: "https://doi.org/10.7326/M18-1241",
};

export const videoDescriptions: Record<string, { description: string; duration: string }> = {
  tqz2FBnQyIY: { description: "An expert discussion of APOL1-mediated kidney disease and why awareness matters in nephrology.", duration: "8:05" },
  CEdzQXC51c8: { description: "Experts discuss polycystic kidney disease and its implications for clinical care.", duration: "13:10" },
  hMyYfZoPXmU: { description: "Alonzo Mourning shares his experience of learning that kidney disease had been present without obvious symptoms.", duration: "0:59" },
  A_BqDASURHU: { description: "Genetic counselor Mary-Beth Roberts discusses what patients and clinicians should know about genetic testing for kidney disease.", duration: "33:28" },
  "66iTRyKZX08": { description: "Bianca E. Russell uses a polycystic kidney disease case to introduce genetic testing in nephrology.", duration: "3:10" },
  "o-ObnRQTyLM": { description: "Bianca E. Russell presents a Fabry disease case and its relevance to genetic evaluation in nephrology.", duration: "3:53" },
  PH68X4L9iE0: { description: "An overview of a key renal genetics paper and its implications for understanding chronic kidney disease.", duration: "9:50" },
  DvL4aGeRtIo: { description: "Anthony Bleyer discusses a REN-related kidney disease case and the approach to care after a rare genetic diagnosis.", duration: "7:24" },
  lhYapBz0Y5Y: { description: "Patricia Weng introduces an Alport syndrome case in the setting of pediatric kidney disease.", duration: "4:08" },
  v3Kq1TfFw6M: { description: "Patricia Weng discusses an HNF1B-related case and the role of genetics in pediatric kidney disease.", duration: "3:19" },
  q6HVWo7mQmY: { description: "An illustrated overview of Alport syndrome, including its causes, symptoms, diagnosis, treatment, and pathology.", duration: "8:43" },
  "6bfwYl2M8C0": { description: "Patricia Weng continues the Alport syndrome case discussion and its implications for pediatric genetic evaluation.", duration: "10:05" },
  nrDdfnOzgdI: { description: "Patricia Weng explains how genotype and phenotype are considered together in pediatric kidney disease.", duration: "11:21" },
  mffAqtzFSbU: { description: "A presentation of broad-panel next-generation sequencing in a community nephrology setting.", duration: "6:42" },
  "oWa-3eux89k": { description: "Meg Hager explains why a kidney genetic test may return a negative result and what that result can mean.", duration: "5:36" },
};
