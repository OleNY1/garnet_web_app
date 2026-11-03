import { CITATIONS } from "../../lib/citations";
import { annalsReference, ethicsReferences } from "../data/clinicalEducation";
import { resourceDestinationContent } from "../data/resourceDestinationContent";

const otherReferences = [
  { citation: "Milo Rasouly H, Balderes O, Marasa M, et al. The effect of genetic education on the referral of patients to genetic evaluation: Findings from a national survey of nephrologists. Genet Med. 2023;25:100814. doi:10.1016/j.gim.2023.100814.", url: "https://doi.org/10.1016/j.gim.2023.100814" },
  { citation: "Jayasinghe K, Quinlan C, Mallett AJ, et al. Attitudes and Practices of Australian Nephrologists Toward Implementation of Clinical Genomics. Kidney Int Rep. 2021;6:272-283. doi:10.1016/j.ekir.2020.10.030.", url: "https://doi.org/10.1016/j.ekir.2020.10.030" },
  { citation: "Fraiman YS, Wojcik MH. The influence of social determinants of health on the genetic diagnostic odyssey: who remains undiagnosed, why, and to what effect? Pediatr Res. 2021;89:295-300. doi:10.1038/s41390-020-01151-5.", url: "https://doi.org/10.1038/s41390-020-01151-5" },
  { citation: "Elefant N, Marasa M, Milo Rasouly H. Beyond Kidney Genes: Broad Clinical Implications of Genetic Testing for Nephrology Patients. Semin Nephrol. 2025;45:151660. doi:10.1016/j.semnephrol.2025.151660.", url: "https://doi.org/10.1016/j.semnephrol.2025.151660" },
];

export function ReferenceLibrary() {
  const diseaseReferences = Object.values(resourceDestinationContent["common-genetic-kidney-diseases"].geneticDiseaseTopics ?? {}).map(topic => ({ citation: topic.referenceLabel, url: topic.referenceUrl }));
  const references = [...new Map([
    ...Object.values(CITATIONS), ...ethicsReferences, annalsReference, ...otherReferences,
  ].map(reference => [reference.url.toLowerCase(), reference])).values()];
  return <section className="mb-8 border-b border-[#c3d6d9] pb-8">
    <h3 className="text-2xl font-semibold text-[#16323b]">References Across GARNET</h3>
    <ol className="mt-5 list-decimal space-y-4 pl-6 text-base leading-relaxed text-[#3f4650]">
      {references.map(reference => <li key={reference.url}><a className="text-[#00687b] underline underline-offset-4" href={reference.url} target="_blank" rel="noreferrer">{reference.citation}</a></li>)}
    </ol>
    <h4 className="mt-8 text-xl font-semibold text-[#16323b]">Disease Reviews and Clinical Resources</h4>
    <ul className="mt-4 list-disc space-y-3 pl-6 text-base leading-relaxed">{diseaseReferences.map(reference => <li key={reference.url}><a className="text-[#00687b] underline underline-offset-4" href={reference.url} target="_blank" rel="noreferrer">{reference.citation}</a></li>)}</ul>
  </section>;
}
