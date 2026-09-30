/**
 * References reused on more than one Learn page, kept in one place so the
 * wording and links stay identical everywhere they're cited.
 */
export const CITATIONS = {
  groopman2025: {
    citation:
      'Groopman, E. & Milo Rasouly, H. Navigating genetic testing in nephrology: options and decision-making strategies. Kidney International Reports 10, 673-695 (2025).',
    url: 'https://doi.org/10.1016/j.ekir.2024.12.020',
  },
  groopman2019: {
    citation:
      'Groopman, E.E. et al. Diagnostic utility of exome sequencing for kidney disease. New England Journal of Medicine 380, 142-151 (2019).',
    url: 'https://doi.org/10.1056/NEJMoa1806891',
  },
  dahl2023: {
    citation:
      'Dahl, N.K. et al. The clinical utility of genetic testing in the diagnosis and management of adults with chronic kidney disease. Journal of the American Society of Nephrology 34, 2039-2050 (2023).',
    url: 'https://doi.org/10.1681/ASN.0000000000000249',
  },
  franceschini2024: {
    citation:
      'Franceschini, N. et al. Advancing Genetic Testing in Kidney Diseases: Report From a National Kidney Foundation Working Group. American Journal of Kidney Diseases 84, 751-766 (2024).',
    url: 'https://doi.org/10.1053/j.ajkd.2024.05.010',
  },
  chebib2026: {
    citation:
      'Chebib, F.T. et al. Genetic testing in the management of adult CKD. Journal of the American Society of Nephrology 37, 777-789 (2026).',
    url: 'https://doi.org/10.1681/ASN.0000000913',
  },
  kdigo2022: {
    citation:
      'KDIGO Conference Participants. Genetics in chronic kidney disease: conclusions from a Kidney Disease: Improving Global Outcomes (KDIGO) Controversies Conference. Kidney International 101, 1126-1141 (2022).',
    url: 'https://doi.org/10.1016/j.kint.2022.03.019',
  },
  gross2012: {
    citation:
      'Gross, O. et al. Early angiotensin-converting enzyme inhibition in Alport syndrome delays renal failure and improves life expectancy. Kidney International 81, 494-501 (2012).',
    url: 'https://doi.org/10.1038/ki.2011.407',
  },
  ortiz2025: {
    citation:
      'Ortiz, A., Yanagita, M., Yokoi, H. & Torra, R. Evolving strategies for early diagnosis, proactive prevention and treatment of CKD. Nephrology Dialysis Transplantation gfaf151 (2025).',
    url: 'https://doi.org/10.1093/ndt/gfaf151',
  },
  fernandezFernandez2023: {
    citation:
      'Fernández-Fernandez, B., Sarafidis, P., Soler, M.J. & Ortiz, A. EMPA-KIDNEY: expanding the range of kidney protection by SGLT2 inhibitors. Clinical Kidney Journal 16, 1187-1198 (2023).',
    url: 'https://doi.org/10.1093/ckj/sfad082',
  },
  sabatello2020: {
    citation:
      'Sabatello, M. & Milo Rasouly, H. The ethics of genetic testing for kidney diseases. Nature Reviews Nephrology 16, 615-616 (2020).',
    url: 'https://doi.org/10.1038/s41581-020-0294-5',
  },
  thomas2023: {
    citation:
      'Thomas, C.P. et al. Genetic evaluation of living kidney donor candidates: a review and recommendations for best practices. American Journal of Transplantation 23, 597-607 (2023).',
    url: 'https://doi.org/10.1016/j.ajt.2023.02.020',
  },
  wynn2021: {
    citation:
      'Wynn, J. et al. Do research participants share genomic screening results with family members? Journal of Genetic Counseling 00, 1-12 (2021).',
    url: 'https://doi.org/10.1002/jgc4.1511',
  },
  bogyo2025: {
    citation:
      'Bogyo, K., Vena, N. & Milo Rasouly, H. The art and science of genetic counseling in nephrology. Kidney360 6, 1230-1244 (2025).',
    url: 'https://doi.org/10.34067/KID.0000000825',
  },
} as const

/** Builds a numbered Sources list from citation keys, in the order given. */
export function numbered(...keys: Array<keyof typeof CITATIONS>) {
  return keys.map((key, index) => ({ n: index + 1, ...CITATIONS[key] }))
}
