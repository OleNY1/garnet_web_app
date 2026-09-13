export type ExternalLink = {
  label: string
  text: string
  href: string
}

export type ConditionLinkGroup = {
  condition: string
  links: ExternalLink[]
}

/**
 * Condition-specific patient communities for the "Find a support group" box
 * on the Overview page. Source: list shared by Phoo (email, September 2026).
 * Grouped by condition so a visitor can scan to the disease that matches
 * their own diagnosis rather than a flat, unsorted list.
 */
export const SUPPORT_GROUP_LINKS: ConditionLinkGroup[] = [
  {
    condition: 'Alport syndrome',
    links: [
      {
        label: 'Alport Syndrome Foundation (ASF)',
        text: 'US patient organization for Alport syndrome.',
        href: 'https://www.alportsyndrome.org/',
      },
      {
        label: 'Alport UK',
        text: 'UK-based Alport syndrome patient organization.',
        href: 'http://www.alportuk.org/',
      },
    ],
  },
  {
    condition: 'Fabry disease',
    links: [
      {
        label: 'National Fabry Disease Foundation (NFDF)',
        text: 'Patient and family support for Fabry disease.',
        href: 'https://www.fabrydisease.org/',
      },
    ],
  },
  {
    condition: 'Polycystic kidney disease (PKD)',
    links: [
      {
        label: 'PKD International',
        text: 'Global membership network for people with PKD.',
        href: 'https://pkdinternational.org/membership',
      },
    ],
  },
  {
    condition: 'Nephrogenic diabetes insipidus (NDI)',
    links: [
      {
        label: 'NDI Foundation (NDIF)',
        text: 'Support and education for nephrogenic diabetes insipidus.',
        href: 'https://ndif.org/',
      },
    ],
  },
  {
    condition: 'von Hippel-Lindau disease (VHL)',
    links: [
      {
        label: 'VHL Alliance (VHLA)',
        text: 'Patient organization for von Hippel-Lindau disease.',
        href: 'https://www.vhl.org/',
      },
    ],
  },
  {
    condition: 'Proteinuria',
    links: [
      {
        label: 'NephCure virtual support groups',
        text: 'Virtual groups for rare, protein-spilling kidney diseases.',
        href: 'https://nephcure.org/connect/virtual-support-groups/',
      },
    ],
  },
  {
    condition: 'Tuberous sclerosis',
    links: [
      {
        label: 'TSC Alliance',
        text: 'Patient organization for tuberous sclerosis complex.',
        href: 'https://www.tscalliance.org/',
      },
    ],
  },
]

/**
 * General, condition-agnostic genetics resource — not a support group, so
 * it's kept separate from SUPPORT_GROUP_LINKS and shown as its own line
 * under the grouped list.
 */
export const GENERAL_SUPPORT_RESOURCE: ExternalLink = {
  label: 'Global Genes: gene-based diagnosis 101',
  text: 'A plain-language explainer on what a genetic diagnosis means, for any condition.',
  href: 'https://resource-hub.globalgenes.org/kb/article/298-gene-based-diagnosis-101/',
}

/**
 * Starter list for the "Explore research opportunities" box.
 */
export const RESEARCH_LINKS: ExternalLink[] = [
  {
    label: 'ClinicalTrials.gov',
    text: 'Search open studies for kidney disease by condition or location.',
    href: 'https://clinicaltrials.gov/search?cond=Kidney%20Disease',
  },
  {
    label: 'NORD rare disease database',
    text: 'Look up a specific rare kidney condition and connected patient organizations.',
    href: 'https://rarediseases.org/',
  },
]
