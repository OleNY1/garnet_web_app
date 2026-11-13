import type { ReactNode } from "react";
import { diseaseFeatureVisuals, isClinicalVisual, type FeatureVisual } from "../data/diseaseFeatureVisuals";
import type { GeneticDiseaseId } from "../data/resourceDestinationContent";
import { DiseaseFeatureDiagram } from "./DiseaseFeatureDiagram";
import { doctorSerifFont } from "./DoctorShell";

function SourceLink({ url, children }: { url: string; children: ReactNode }) {
  return <a href={url} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-brand">{children}</a>;
}

function FeatureCard({ visual }: { visual: FeatureVisual }) {
  const isDiagram = "diagram" in visual;
  const kind = isDiagram ? "Educational illustration" : visual.kind;
  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className={`flex items-center justify-center overflow-hidden bg-surface-2 ${isClinicalVisual(visual) ? "aspect-[4/3]" : "aspect-[16/9]"}`}>
        {isDiagram ? <DiseaseFeatureDiagram diagram={visual.diagram} alt={visual.alt} /> : (
          <FeatureImage file={visual.file} title={visual.title} alt={visual.alt} />
        )}
      </div>
      <figcaption className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">{kind}</p>
        <p className="mt-1 text-base font-semibold leading-snug text-ink">{visual.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-body">{visual.description}</p>
        {!isDiagram && visual.credit && (
          <p className="mt-2 text-xs leading-relaxed text-muted">
            <SourceLink url={visual.credit.url}>{visual.credit.label}</SourceLink>
            {visual.credit.license && <>{" · "}<SourceLink url={visual.credit.license.url}>{visual.credit.license.label}</SourceLink></>}
          </p>
        )}
        {visual.reference && <p className="mt-2 text-xs leading-relaxed text-muted"><SourceLink url={visual.reference.url}>{visual.reference.label}</SourceLink></p>}
      </figcaption>
    </figure>
  );
}

function FeatureImage({ file, title, alt }: { file: string; title: string; alt: string }) {
  const src = `${import.meta.env.BASE_URL}resource-graphics/${file}`;
  return <a href={src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${title}`} className="h-full w-full focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ring">
    <img src={src} alt={alt} className="h-full w-full object-contain" loading="lazy" />
  </a>;
}

function FeatureColumn({ title, visuals, headingLevel, extrarenal = false }: { title: string; visuals: FeatureVisual[]; headingLevel: 4 | 5; extrarenal?: boolean }) {
  const Heading = headingLevel === 4 ? "h4" : "h5";
  const clinical = visuals.filter(isClinicalVisual);
  const illustrations = visuals.filter(visual => !isClinicalVisual(visual));
  return (
    <div className={`min-w-0 rounded-2xl border border-line p-3 sm:p-4 ${extrarenal ? "bg-wash-warm" : "bg-wash"}`}>
      <Heading className={`mb-3 flex items-center gap-2 text-base font-semibold ${extrarenal ? "text-accent" : "text-brand"}`}>
        <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-current" />{title}
      </Heading>
      <div className="grid gap-3">
        {(clinical.length ? clinical : illustrations).map(visual => <FeatureCard key={visual.title} visual={visual} />)}
        {clinical.length > 0 && illustrations.length > 0 && (
          <details className="rounded-xl border border-line bg-surface">
            <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-brand">Educational {illustrations.length === 1 ? "illustration" : "illustrations"}</summary>
            <div className="grid gap-3 px-3 pb-3">{illustrations.map(visual => <FeatureCard key={visual.title} visual={visual} />)}</div>
          </details>
        )}
      </div>
    </div>
  );
}

export function DiseaseFeatureGallery({ disease, headingLevel = 4 }: { disease: GeneticDiseaseId; headingLevel?: 3 | 4 }) {
  const groups = diseaseFeatureVisuals[disease];
  const Heading = headingLevel === 3 ? "h3" : "h4";
  const columnHeading = headingLevel === 3 ? 4 : 5;
  return (
    <section className="space-y-4" aria-label="Kidney and extra-renal findings">
      <header>
        <Heading className="text-xl font-semibold text-ink sm:text-2xl" style={{ fontFamily: doctorSerifFont }}>Kidney and extra-renal findings</Heading>
        <p className="mt-1 text-sm leading-relaxed text-muted">These are examples from published cases, alongside labeled diagrams. Findings vary from person to person. Select a clinical image to open it full size.</p>
      </header>
      {groups.map((group) => (
        <div key={group.title ?? disease} className="space-y-2" role={group.title ? "group" : undefined} aria-label={group.title}>
          {group.title && <p className="text-base font-semibold text-ink">{group.title}</p>}
          <div className="grid items-start gap-3 sm:grid-cols-2 sm:gap-4">
            <FeatureColumn title="Intrarenal (kidney) features" visuals={group.renal} headingLevel={columnHeading} />
            <FeatureColumn title="Extra-renal features" visuals={group.extrarenal} headingLevel={columnHeading} extrarenal />
          </div>
        </div>
      ))}
    </section>
  );
}
