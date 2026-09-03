import { useNavigate } from "react-router-dom";
import { Download, UserCheck, AlertCircle, CheckCircle, Info } from "lucide-react";

export default function AssessmentResult() {
  const navigate = useNavigate();
  const riskLevel = localStorage.getItem("riskLevel") || "low";

  const riskConfig = {
    high: {
      color: "red",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      borderColor: "border-red-200",
      icon: AlertCircle,
      title: "High Priority",
      message: "Based on your responses, genetic testing may be highly beneficial for you.",
      recommendation:
        "We strongly recommend speaking with a genetic counselor to discuss testing options and next steps.",
    },
    moderate: {
      color: "orange",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      borderColor: "border-orange-200",
      icon: Info,
      title: "Moderate Priority",
      message: "Your responses suggest genetic testing could provide valuable insights.",
      recommendation:
        "Consider consulting with a genetic counselor to evaluate whether testing is right for you.",
    },
    low: {
      color: "green",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-200",
      icon: CheckCircle,
      title: "Low Priority",
      message: "Based on your responses, genetic testing may not be urgent at this time.",
      recommendation:
        "Continue monitoring your health and consult your healthcare provider if your situation changes.",
    },
  };

  const config = riskConfig[riskLevel as keyof typeof riskConfig];

  const handleDownloadPDF = () => {
    // Mock PDF generation
    alert("In a production app, this would generate and download a PDF report with your assessment results.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-6">
        <h1 className="text-2xl text-gray-900 mb-2">
          Your Assessment Results
        </h1>
        <p className="text-gray-600">
          Based on your responses
        </p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Risk Level Card */}
        <div className={`${config.bgColor} border-2 ${config.borderColor} rounded-2xl p-6`}>
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-12 h-12 rounded-full ${config.bgColor} flex items-center justify-center`}>
              <config.icon className={`w-6 h-6 ${config.textColor}`} />
            </div>
            <div className="flex-1">
              <h2 className={`text-xl ${config.textColor} mb-2`}>
                {config.title}
              </h2>
              <p className="text-gray-700">
                {config.message}
              </p>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg text-gray-900 mb-3">
            Recommendation
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {config.recommendation}
          </p>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 flex-shrink-0" />
            <div>
              <h3 className="text-lg mb-2">AI-Powered Insights</h3>
              <p className="text-sm text-blue-100">
                Your assessment shows patterns consistent with hereditary kidney conditions. 
                Genetic testing can identify specific mutations and help guide personalized treatment plans.
              </p>
            </div>
          </div>
        </div>

        {/* What This Means */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg text-gray-900 mb-4">
            What This Means
          </h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm text-blue-600">1</span>
              </div>
              <p className="text-gray-700">
                Genetic testing can identify inherited kidney disease mutations
              </p>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm text-blue-600">2</span>
              </div>
              <p className="text-gray-700">
                Results help your doctor create a personalized treatment plan
              </p>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm text-blue-600">3</span>
              </div>
              <p className="text-gray-700">
                Family members can benefit from your genetic information
              </p>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <button
            onClick={handleDownloadPDF}
            className="w-full py-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-gray-300 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5 text-gray-700" />
            <span className="text-gray-900">Download PDF Report</span>
          </button>

          <button
            onClick={() => navigate("/doctor/counselors")}
            className="w-full py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <UserCheck className="w-5 h-5" />
            <span>Find a Genetic Counselor</span>
          </button>

          <button
            onClick={() => navigate("/doctor/dashboard")}
            className="w-full py-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-900">Back to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
