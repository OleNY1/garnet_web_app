import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DoctorPageShell } from "../components/DoctorShell";
import { Check } from "../../pages/Check";

export default function DoctorRiskCheck() {
  return <DoctorPageShell activeMode="practical">
    <div className="patient-site">
      <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8"><Link to="/doctor/dashboard/practical" className="inline-flex items-center gap-2 font-semibold text-brand underline underline-offset-4"><ArrowLeft className="size-4" />Practical Tools</Link></div>
      <Check clinician />
    </div>
  </DoctorPageShell>;
}
