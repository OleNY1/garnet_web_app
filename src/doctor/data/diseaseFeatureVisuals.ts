import type { GeneticDiseaseId } from "./resourceDestinationContent";

export type FeatureDiagram =
  | "liver-cysts" | "collecting-ducts" | "liver-fibrosis" | "kidney-dysplasia"
  | "basement-membrane" | "nephrocalcinosis" | "rickets" | "zebra-bodies"
  | "loop-of-henle" | "distal-tubule" | "cochlea" | "cartilage-calcification"
  | "cortical-cysts" | "pancreas-hypoplasia" | "junction-cysts" | "retinal-degeneration"
  | "kidney-hypoplasia" | "optic-disc" | "hydronephrosis" | "glomerular-scarring"
  | "cochlea-cross-section";

type FeatureMedia =
  | { diagram: FeatureDiagram }
  | { file: string; kind: "Clinical photo" | "Published illustration" | "Educational illustration" | "Clinical image" | "Clinical test result"; credit?: { label: string; url: string; license?: { label: string; url: string } } };

export type FeatureVisual = FeatureMedia & {
  title: string;
  description: string;
  alt: string;
  reference?: { label: string; url: string };
};

export function isClinicalVisual(visual: FeatureVisual) {
  return "kind" in visual && visual.kind.startsWith("Clinical ");
}

type FeatureGroup = { title?: string; renal: FeatureVisual[]; extrarenal: FeatureVisual[] };

const feature = (diagram: FeatureDiagram, title: string, description: string, alt: string, reference?: FeatureVisual["reference"]): FeatureVisual =>
  ({ diagram, title, description, alt, reference });

const burlina = {
  label: "Burlina et al., BMC Neurology (2011)",
  license: { label: "CC BY 2.0", url: "https://creativecommons.org/licenses/by/2.0/" },
};
const bartterGitelman = { label: "Walsh et al. (2018)", url: "https://doi.org/10.1093/ckj/sfx118" };
const pax2 = { label: "Kim et al. (2025)", url: "https://doi.org/10.1038/s41431-025-01822-z" };
const ccBy4 = { label: "CC BY 4.0", url: "https://creativecommons.org/licenses/by/4.0/" };
const ccByNc4 = { label: "CC BY-NC 4.0", url: "https://creativecommons.org/licenses/by-nc/4.0/" };
const ccByNcNd4 = { label: "CC BY-NC-ND 4.0", url: "https://creativecommons.org/licenses/by-nc-nd/4.0/" };

const clinical = (
  file: string, title: string, description: string, alt: string,
  credit: { label: string; url: string; license: typeof ccBy4 },
  kind: "Clinical image" | "Clinical photo" | "Clinical test result" = "Clinical image",
): FeatureVisual => ({ file: `clinical/${file}`, kind, title, description, alt, credit });

const adpkdImages = { url: "https://doi.org/10.1016/j.radcr.2025.01.021", license: ccByNcNd4 };
const arpkdImages = { url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6864414/#trd-4-trd190033-g003", license: ccByNc4 };
const borImages = { url: "https://doi.org/10.1186/s13256-026-05981-5", license: ccByNcNd4 };
const hnf1bImages = { url: "https://doi.org/10.3389/fmed.2025.1671893", license: ccBy4 };
const pax2KidneyImage = clinical(
  "pax2-kidney-us.jpg", "Cortical kidney cysts on ultrasound",
  "Paired ultrasound images show small cortical cysts in an infant with a reported PAX2 variant.",
  "Right and left kidney ultrasound images showing multiple small cysts",
  { label: "Forero-Delgadillo et al., Figure 1", url: "https://doi.org/10.1177/1179556521992354", license: ccByNc4 },
);

export const diseaseFeatureVisuals: Record<GeneticDiseaseId, FeatureGroup[]> = {
  adpkd: [{
    renal: [
      clinical("adpkd-ultrasound.jpg", "Polycystic kidneys on ultrasound", "This case shows numerous cysts in both kidneys.", "Two kidney ultrasound views showing multiple dark, fluid-filled cysts", { ...adpkdImages, label: "Khalil et al., Figure 1" }),
      {
        file: "adpkd-kidney-niddk.jpg",
        kind: "Published illustration",
        title: "Polycystic kidney",
        description: "Numerous fluid-filled cysts can enlarge both kidneys.",
        alt: "Side-by-side comparison of a healthy kidney and an enlarged kidney covered in cysts",
        credit: {
          label: "National Institute of Diabetes and Digestive and Kidney Diseases, National Institutes of Health",
          url: "https://www.niddk.nih.gov/news/media-library/17747",
        },
      },
    ],
    extrarenal: [
      clinical("adpkd-liver-ct.jpg", "Liver cysts on CT", "Arrows mark examples of cysts in both liver lobes.", "Abdominal CT with arrows pointing to multiple liver cysts", { ...adpkdImages, label: "Khalil et al., Figure 2" }),
      feature("liver-cysts", "Liver cysts", "Fluid-filled cysts can also develop in the liver.", "Liver silhouette with several round cysts highlighted.", { label: "NIDDK: Polycystic Kidney Disease", url: "https://www.niddk.nih.gov/health-information/kidney-disease/polycystic-kidney-disease" }),
    ],
  }],
  arpkd: [{
    renal: [
      clinical("arpkd-kidney-mri.jpg", "Enlarged kidneys on MRI", "This MRI shows markedly enlarged kidneys in a newborn with ARPKD.", "Coronal MRI showing two markedly enlarged kidneys", { ...arpkdImages, label: "Grochowsky and Gunay-Aygun, Figure 3A (cropped)" }),
      feature("collecting-ducts", "Dilated collecting ducts", "The collecting ducts can dilate, producing enlarged kidneys with tiny cystic spaces.", "Kidney section with elongated dilations along the collecting ducts."),
    ],
    extrarenal: [
      clinical("arpkd-liver-mri.jpg", "Liver enlargement on MRI", "This case of congenital hepatic fibrosis shows an enlarged left liver lobe. The scan illustrates liver shape, not microscopic fibrosis.", "Coronal MRI showing enlargement of the left liver lobe", { ...arpkdImages, label: "Grochowsky and Gunay-Aygun, Figure 3E (cropped)" }),
      feature("liver-fibrosis", "Congenital hepatic fibrosis", "Fibrosis around the portal tracts can lead to portal hypertension.", "Liver silhouette with a magnified portal tract showing a fibrotic rim.", { label: "Bergmann et al. (2005)", url: "https://pubmed.ncbi.nlm.nih.gov/15698423/" }),
    ],
  }],
  bor: [{
    renal: [
      clinical("bor-ultrasound.jpg", "Hydronephrosis on ultrasound", "The circled area shows dilation of the kidney collecting system in a reported case of branchio-oto-renal syndrome.", "Kidney ultrasound with a red arrow and circle identifying the dilated collecting system", { ...borImages, label: "Senjab et al., Figure 2" }),
      feature("kidney-dysplasia", "Renal dysplasia", "One example of the congenital kidney abnormalities seen in branchio-oto-renal spectrum disorder.", "Kidney section with irregularly developed tissue."),
    ],
    extrarenal: [
      clinical("bor-ear.jpg", "Preauricular pit", "The arrow points to a small opening just in front of the ear.", "Close-up clinical photo of an ear with an arrow pointing to a preauricular pit", { ...borImages, label: "Senjab et al., Figure 1" }, "Clinical photo"),
      {
        file: "bor-extrarenal-features.svg",
        kind: "Educational illustration",
        title: "Preauricular pit and branchial sinus",
        description: "A pit in front of the ear and a small opening on the side of the neck are two possible clues.",
        alt: "Two illustrations showing a preauricular pit and a lateral neck opening associated with a branchial sinus",
      },
    ],
  }],
  alport: [{
    renal: [
      clinical("alport-em.jpg", "Glomerular basement membrane on electron microscopy", "The micrographs show alternating thin and thick areas and splitting of the basement membrane, often described as a basket-weave pattern.", "Two electron micrographs of irregular glomerular basement membrane with marked regions of thinning and layering", { label: "Rahimzadeh et al., Figure 3", url: "https://doi.org/10.1186/s12882-023-03165-7", license: ccBy4 }),
      feature("basement-membrane", "Glomerular basement membrane changes", "The glomerular basement membrane can show thinning, thickening and splitting (lamellation).", "Schematic comparison of a smooth basement membrane and one with irregular, split layers."),
    ],
    extrarenal: [{
      file: "alport-lenticonus.jpg",
      kind: "Clinical photo",
      title: "Anterior lenticonus",
      description: "The front surface of the lens protrudes in a cone shape.",
      alt: "Slit-lamp photograph showing a cone-shaped protrusion of the anterior lens",
      credit: {
        label: "Ammar Al-Mahmood",
        url: "https://commons.wikimedia.org/wiki/File:Anterior_lenticonus.jpg",
        license: { label: "CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/" },
      },
    }],
  }],
  dent: [{
    renal: [
      clinical("dent-biopsy.jpg", "Tubular injury and scarring on kidney biopsy", "These sections from a Dent disease type 1 case show tubular atrophy, interstitial fibrosis, and areas of glomerular scarring. This is not an image of nephrocalcinosis.", "Four kidney biopsy micrographs showing tubular atrophy, fibrosis and glomerular changes", { label: "Ni et al., Figure 1", url: "https://doi.org/10.3389/fped.2022.1043502", license: ccBy4 }),
      feature("nephrocalcinosis", "Medullary nephrocalcinosis", "Calcium can deposit within kidney tissue in Dent disease.", "Kidney section with small clusters of calcium deposits in the medullary pyramids."),
    ],
    extrarenal: [
      clinical("dent-rickets.jpg", "Rickets on X-ray", "X-rays from a Dent disease type 1 case show reduced bone density and changes near the growth plates.", "X-rays of the hands and legs showing skeletal changes associated with rickets", { label: "Ambarsari et al., Figure 1C (cropped)", url: "https://doi.org/10.1159/000543719", license: ccBy4 }),
      feature("rickets", "Rickets", "Renal phosphate wasting can contribute to rickets in children.", "Schematic of bowed lower-leg bones, an example of a skeletal change in rickets.", { label: "Dent disease clinical practice recommendations", url: "https://academic.oup.com/ndt/article/40/5/852/7951514" }),
    ],
  }],
  fabry: [{
    renal: [
      clinical("fabry-zebra-bodies.webp", "Zebra bodies on electron microscopy", "These electron micrographs come from a patient diagnosed with Fabry disease. Layered inclusions can also occur in other settings.", "Electron micrographs showing dark, multilayered inclusions in kidney tissue", { label: "Fenoglio et al., Figure 3", url: "https://doi.org/10.3389/fneph.2023.1043874", license: ccBy4 }),
      feature("zebra-bodies", "Lamellated inclusions in podocytes", "Kidney electron microscopy can show layered inclusions called zebra bodies. They are not specific to Fabry disease.", "Schematic of a podocyte with magnified concentric, layered inclusions.", { label: "Renal biopsy case report", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7829293/" }),
    ],
    extrarenal: [{
      file: "fabry-angiokeratomas.jpg",
      kind: "Clinical photo",
      title: "Angiokeratomas",
      description: "Small dark-red or purple vascular skin lesions.",
      alt: "Clinical photographs showing small dark vascular skin lesions in Fabry disease",
      credit: { ...burlina, url: "https://commons.wikimedia.org/wiki/File:Morbus_Fabry_Angiokeratoma_01.jpg" },
    }, {
      file: "fabry-cornea.jpg",
      kind: "Clinical photo",
      title: "Cornea verticillata",
      description: "Whorl-like deposits in the corneal epithelium.",
      alt: "Slit-lamp photograph showing cornea verticillata in Fabry disease",
      credit: { ...burlina, url: "https://commons.wikimedia.org/wiki/File:Morbus_Fabry_Cornea_verticillata_01.jpg" },
    }],
  }],
  tubulopathies: [{
    title: "Bartter syndrome",
    renal: [
      clinical("bartter-ultrasound.jpg", "Medullary nephrocalcinosis on ultrasound", "The bright medulla illustrates calcium deposition in one reported case of type 2 Bartter syndrome. Not all Bartter types have this finding.", "Ultrasound of the left kidney showing increased brightness in the renal medulla", { label: "Gollasch et al., Figure 1", url: "https://doi.org/10.1093/ckj/sfx033", license: ccByNc4 }),
      feature("loop-of-henle", "Salt wasting in the loop of Henle", "Impaired salt reabsorption in the thick ascending limb is a feature of many Bartter forms.", "Nephron diagram highlighting the thick ascending limb of the loop of Henle.", bartterGitelman),
    ],
    extrarenal: [
      feature("cochlea", "Sensorineural hearing loss", "Hearing loss can occur in type 4 Bartter syndrome; it is not a feature of all types.", "Inner-ear schematic highlighting the cochlea as the organ of hearing.", bartterGitelman),
    ],
  }, {
    title: "Gitelman syndrome",
    renal: [
      clinical("gitelman-biopsy.jpg", "Juxtaglomerular cell proliferation on biopsy", "The arrow marks proliferation near a glomerulus in a reported Gitelman case. This biopsy does not show the salt-transport defect itself.", "Kidney biopsy micrograph with a white arrow marking the juxtaglomerular apparatus", { label: "Chen et al., Figure 3A (cropped)", url: "https://doi.org/10.1186/s12882-020-02211-y", license: ccBy4 }),
      feature("distal-tubule", "Salt wasting in the distal tubule", "The sodium-chloride cotransporter in the distal convoluted tubule is affected.", "Nephron diagram highlighting the distal convoluted tubule.", bartterGitelman),
    ],
    extrarenal: [
      clinical("gitelman-xray.jpg", "Knee chondrocalcinosis on X-ray", "The arrow marks calcium deposits in the knee cartilage in a published case of Gitelman syndrome.", "Right knee X-ray with an arrow pointing to cartilage calcification", { label: "Ham et al., Figure 1K (cropped)", url: "https://doi.org/10.1093/ckj/sfab034", license: ccByNc4 }),
    ],
  }],
  "hnf1b-adtkd": [{
    renal: [
      clinical("hnf1b-kidney-ct.jpg", "Kidney cysts and calcification on CT", "In this HNF1B case, the arrow marks a cyst and the arrowhead marks kidney calcification.", "Coronal CT image with markers identifying a kidney cyst and kidney calcification", { ...hnf1bImages, label: "Gopireddy et al., Figure 2A (cropped)" }),
      feature("cortical-cysts", "Renal cortical cysts", "Small cysts in the kidney cortex are one possible finding in HNF1B-related disease.", "Kidney section highlighting small cysts near the outer edge of the cortex.", { label: "HNF1B renal phenotype cohort", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2879303/" }),
    ],
    extrarenal: [
      clinical("hnf1b-pancreas-ct.jpg", "Absent pancreatic body and tail on CT", "The image labels the visible pancreatic head and the region where the body and tail are absent.", "Abdominal CT labeling the pancreatic head and absent pancreatic body and tail", { ...hnf1bImages, label: "Gopireddy et al., Figure 2B (cropped)" }),
      feature("pancreas-hypoplasia", "Pancreatic hypoplasia", "In some people, the pancreatic body and tail are underdeveloped or absent.", "Pancreas schematic with a preserved head and an outline indicating the expected body and tail.", { label: "Haldorsen et al. (2008)", url: "https://pubmed.ncbi.nlm.nih.gov/18644064/" }),
    ],
  }],
  ciliopathies: [{
    renal: [
      clinical("ciliopathy-biopsy.jpg", "Tubular changes on kidney biopsy", "This GLIS2-related nephronophthisis biopsy shows dilated tubules and abnormal tubular basement membranes.", "Stained kidney tissue showing dilated tubules and thickened tubular basement membranes", { label: "Al Alawi et al., Figure 1B (cropped)", url: "https://doi.org/10.3389/fgene.2021.791495", license: ccBy4 }),
      feature("junction-cysts", "Corticomedullary cysts", "Cysts may develop later at the junction of the kidney cortex and medulla.", "Kidney section highlighting several cysts along the boundary of cortex and medulla."),
    ],
    extrarenal: [
      clinical("ciliopathy-retina.jpg", "Retinal changes in Senior-Loken syndrome", "Fundus photographs and retinal scans show pigment mottling and thinning of the outer retina.", "Six retinal images including fundus photos, optical coherence tomography and autofluorescence", { label: "Li et al., Figure 1", url: "https://doi.org/10.3390/jcm15052060", license: ccBy4 }),
      feature("retinal-degeneration", "Retinal degeneration", "Retinal disease occurs in some forms, including Senior-Loken syndrome.", "Eye cross-section highlighting the retina at the back of the eye."),
    ],
  }],
  pax2: [{
    renal: [
      pax2KidneyImage,
      feature("kidney-hypoplasia", "Renal hypoplasia", "The kidneys may be abnormally small or incompletely developed.", "A smaller kidney shown next to a dashed outline representing typical size.", pax2),
    ],
    extrarenal: [{
      file: "pax2-optic-disc.jpg",
      kind: "Clinical image",
      title: "Optic disc abnormalities",
      description: "Fundus photos show an excavated optic disc and a partially underdeveloped optic disc. The third panel shows an optical coherence tomography scan.",
      alt: "Two fundus photographs and an optical coherence tomography scan showing optic disc abnormalities in PAX2-related disorder",
      credit: { ...pax2, label: "Kim et al. (2025), Figure 2", license: ccBy4 },
    }],
  }],
  cakut: [{
    renal: [
      { ...pax2KidneyImage, description: "This is one example of a syndromic congenital kidney anomaly, not a finding shared by all forms of CAKUT." },
      feature("hydronephrosis", "Hydronephrosis", "Dilation of the kidney pelvis and calyces is one possible urinary tract finding in CAKUT.", "Kidney section highlighting an enlarged renal pelvis and calyces."),
    ],
    extrarenal: [
      {
        file: "pax2-optic-disc.jpg",
        kind: "Clinical image",
        title: "Optic disc findings in syndromic CAKUT",
        description: "This figure illustrates optic disc abnormalities in PAX2-related disease, one example of syndromic CAKUT.",
        alt: "Two fundus photographs and an optical coherence tomography scan showing optic disc abnormalities in PAX2-related disorder",
        credit: { ...pax2, label: "Kim et al. (2025), Figure 2", license: ccBy4 },
      },
      feature("optic-disc", "Optic disc dysplasia in PAX2-related CAKUT", "Some syndromic forms involve other organs. Optic disc dysplasia is one example in PAX2-related disease.", "Eye fundus schematic showing an excavated optic disc with retinal vessels arising at its edges.", pax2),
    ],
  }],
  srns: [{
    renal: [
      clinical("srns-biopsy.jpg", "Glomerular scarring on kidney biopsy", "Biopsy images from a family with NPHS2-related steroid-resistant nephrotic syndrome show scarring in panel A. This is one possible biopsy pattern.", "Light and electron micrographs from two kidney biopsies, with a mark identifying glomerular sclerosis in panel A", { label: "Bai et al., Figure 1", url: "https://doi.org/10.3389/fped.2021.692727", license: ccBy4 }),
      feature("glomerular-scarring", "Segmental glomerular scarring", "Focal segmental glomerulosclerosis (FSGS) is one possible biopsy pattern in genetic SRNS.", "Glomerulus diagram with a scarred portion of the capillary tuft."),
    ],
    extrarenal: [
      feature("cochlea-cross-section", "Hearing loss in some genetic forms", "Sensorineural hearing loss can accompany COQ6-related disease; many genetic forms of SRNS are kidney-limited.", "Cross-section schematic showing the cochlea and auditory nerve.", { label: "Park et al. (2017)", url: "https://doi.org/10.1053/j.ajkd.2016.10.040" }),
    ],
  }],
  mitochondrial: [{
    renal: [{
      file: "mitochondrial-kidney-micrographs.jpg",
      kind: "Clinical image",
      title: "Abnormal mitochondria in kidney cells",
      description: "Electron micrographs show abnormal mitochondrial structure or accumulation in kidney cells.",
      alt: "Six electron micrographs showing abnormal or accumulated mitochondria in kidney biopsy samples",
      credit: { label: "Imasawa et al. (2025), Figure 3", url: "https://doi.org/10.1007/s10157-024-02554-y", license: ccBy4 },
    }],
    extrarenal: [
      clinical("mitochondrial-audiogram.jpg", "Hearing loss on an audiogram", "This hearing test illustrates profound hearing loss in a patient with the mitochondrial m.3243A>G variant. It is not a photograph of an ear abnormality.", "Audiogram plotting hearing thresholds from 80 to 110 decibels across several frequencies", { label: "Kullar et al., Figure 1B (cropped)", url: "https://doi.org/10.1093/brain/aww051", license: ccBy4 }, "Clinical test result"),
      feature("cochlea-cross-section", "Sensorineural hearing loss", "Hearing loss can accompany some mitochondrial disorders with kidney involvement, including disease associated with the m.3243A>G variant.", "Cross-section schematic showing the cochlea and auditory nerve."),
    ],
  }],
};
