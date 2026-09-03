import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Video, Calendar, Building2, ExternalLink } from "lucide-react";
import { counselorData } from "../data/counselors";

export default function CounselorProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const counselor = counselorData[id || "1"] || counselorData["1"];

  const handleBookAppointment = () => {
    window.open(counselor.appointmentUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="px-6 py-4">
          <button
            onClick={() => navigate("/doctor/counselors")}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Profile Header */}
        <div className="px-6 pb-6">
          <div className="flex gap-4 mb-6">
            <img
              src={counselor.image}
              alt={counselor.name}
              className="w-24 h-24 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h1 className="text-2xl text-gray-900 mb-1">
                {counselor.name}
              </h1>
              <p className="text-gray-600 mb-3">
                {counselor.specialty}
              </p>
              <p className="text-sm text-gray-500">{counselor.organization}</p>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{counselor.location}</span>
            </div>
            {counselor.telehealth && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Video className="w-4 h-4" />
                <span>Telehealth</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building2 className="w-4 h-4" />
              <span>U.S. provider/clinic page</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* About */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg text-gray-900 mb-3">About</h2>
          <p className="text-gray-700 leading-relaxed">{counselor.bio}</p>
        </div>

        {/* Scheduling */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg text-gray-900 mb-3">Scheduling</h2>
          <a
            href={counselor.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm mb-3"
          >
            View provider profile
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-gray-700 mb-3">{counselor.bookingInstructions}</p>
          <a
            href={counselor.appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
          >
            Open official scheduling/referral page
            <ExternalLink className="w-4 h-4" />
          </a>
          <div className="mt-3 text-xs text-gray-500 break-all">
            {counselor.appointmentUrl}
          </div>
        </div>

        {/* Book Button */}
        <div className="pb-6">
          <button
            onClick={handleBookAppointment}
            className="w-full py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            <span>Book / Request Appointment</span>
          </button>
        </div>
      </div>
    </div>
  );
}
