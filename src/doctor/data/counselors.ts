export interface CounselorRecord {
  id: string;
  name: string;
  specialty: string;
  organization: string;
  profileUrl: string;
  location: string;
  country: string;
  latitude: number;
  longitude: number;
  telehealth: boolean;
  image: string;
  bio: string;
  appointmentUrl: string;
  bookingInstructions: string;
}

export const US_COUNTRY_CODE = "US";

const avatar = (seed: string) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=dbeafe`;

export const counselors: CounselorRecord[] = [
  {
    id: "1",
    name: "Kelsie Bogyo, MS, CGC",
    specialty: "Kidney Genetics Counseling",
    organization: "Columbia University Kidney Genetics Clinic",
    profileUrl:
      "https://www.vagelos.columbia.edu/education/academic-programs/program-genetic-counseling/who-we-are/instructors",
    location: "New York, NY",
    country: US_COUNTRY_CODE,
    latitude: 40.8404,
    longitude: -73.9396,
    telehealth: false,
    image: avatar("Kelsie Bogyo"),
    bio: "Genetic counselor listed on the Columbia University Kidney Genetics Clinic clinical team for inherited kidney disease evaluation and counseling.",
    appointmentUrl: "https://redcap.columbia.edu/redcap/surveys/?s=4LHFRDRH4L",
    bookingInstructions:
      "Use Columbia's request form or call 347-380-2545 to schedule.",
  },
  {
    id: "2",
    name: "Natalie Vena, MS, CGC",
    specialty: "Kidney Genetics Counseling",
    organization: "Columbia University Kidney Genetics Clinic",
    profileUrl:
      "https://www.vagelos.columbia.edu/education/academic-programs/program-genetic-counseling/who-we-are/instructors",
    location: "New York, NY",
    country: US_COUNTRY_CODE,
    latitude: 40.8404,
    longitude: -73.9396,
    telehealth: false,
    image: avatar("Natalie Vena"),
    bio: "Genetic counselor listed on the Columbia University Kidney Genetics Clinic clinical team for adult kidney genetics care.",
    appointmentUrl: "https://redcap.columbia.edu/redcap/surveys/?s=4LHFRDRH4L",
    bookingInstructions:
      "Use Columbia's request form or call 347-380-2545 to schedule.",
  },
  {
    id: "3",
    name: "Bryony M. Lynch, MS, CGC",
    specialty: "Inherited Kidney Disease & Renal Genetics",
    organization: "UW Medicine Kidney Genetics Clinic at Harborview",
    profileUrl: "https://www.uwmedicine.org/bios/bryony-lynch",
    location: "Seattle, WA",
    country: US_COUNTRY_CODE,
    latitude: 47.6036,
    longitude: -122.3244,
    telehealth: true,
    image: avatar("Bryony Lynch"),
    bio: "Board-certified genetic counselor at UW Medicine with listed clinical interests in renal genetics and inherited kidney disease.",
    appointmentUrl: "https://www.uwmedicine.org/bios/bryony-lynch",
    bookingInstructions:
      "UW profile indicates call-to-schedule. Kidney Genetics Clinic: 206-744-3622.",
  },
  {
    id: "4",
    name: "Mary-Beth Roberts, MS, CGC",
    specialty: "Renal Genetics Counseling",
    organization: "Cleveland Clinic Renal Genetics Program",
    profileUrl:
      "https://my.clevelandclinic.org/departments/genomics/specialties/renal-genetics",
    location: "Cleveland, OH",
    country: US_COUNTRY_CODE,
    latitude: 41.5035,
    longitude: -81.6207,
    telehealth: false,
    image: avatar("Mary-Beth Roberts"),
    bio: "Genetic counselor listed on the Cleveland Clinic Renal Genetics Program team for evaluation and counseling in inherited kidney disorders.",
    appointmentUrl:
      "https://my.clevelandclinic.org/departments/genomics/specialties/renal-genetics",
    bookingInstructions:
      "Referral required. Call 216-636-1768 to request scheduling.",
  },
  {
    id: "5",
    name: "Sarah Mazzola, MS, CGC",
    specialty: "Renal Genetics Counseling",
    organization: "Cleveland Clinic Renal Genetics Program",
    profileUrl:
      "https://my.clevelandclinic.org/departments/genomics/specialties/renal-genetics",
    location: "Cleveland, OH",
    country: US_COUNTRY_CODE,
    latitude: 41.5035,
    longitude: -81.6207,
    telehealth: false,
    image: avatar("Sarah Mazzola"),
    bio: "Genetic counselor listed on the Cleveland Clinic Renal Genetics Program team.",
    appointmentUrl:
      "https://my.clevelandclinic.org/departments/genomics/specialties/renal-genetics",
    bookingInstructions:
      "Referral required. Call 216-636-1768 to request scheduling.",
  },
  {
    id: "6",
    name: "Deanna Leingang, MS, CGC",
    specialty: "Renal Genetics Counseling",
    organization: "Cleveland Clinic Renal Genetics Program",
    profileUrl:
      "https://my.clevelandclinic.org/departments/genomics/specialties/renal-genetics",
    location: "Cleveland, OH",
    country: US_COUNTRY_CODE,
    latitude: 41.5035,
    longitude: -81.6207,
    telehealth: true,
    image: avatar("Deanna Leingang"),
    bio: "Genetic counselor listed on the Cleveland Clinic Renal Genetics Program team (virtual visits noted on clinic page).",
    appointmentUrl:
      "https://my.clevelandclinic.org/departments/genomics/specialties/renal-genetics",
    bookingInstructions:
      "Referral required. Call 216-636-1768 to request scheduling.",
  },
  {
    id: "7",
    name: "Kidney Genetics Clinic Team",
    specialty: "Pediatric & Young Adult Kidney Genetics",
    organization: "Boston Children's Hospital Kidney Genetics Clinic",
    profileUrl: "https://www.childrenshospital.org/index.php/services/kidney-genetics-clinic",
    location: "Boston, MA",
    country: US_COUNTRY_CODE,
    latitude: 42.3363,
    longitude: -71.1062,
    telehealth: false,
    image: avatar("Boston Kidney Genetics"),
    bio: "Boston Children's Kidney Genetics Clinic provides kidney-focused genetic counseling with online appointment request and phone scheduling.",
    appointmentUrl: "https://www.childrenshospital.org/request-appointment",
    bookingInstructions:
      "Request online or call 617-355-6129 for Kidney Genetics Clinic scheduling.",
  },
];

export const counselorData: Record<string, CounselorRecord> = Object.fromEntries(
  counselors.map((counselor) => [counselor.id, counselor])
);
