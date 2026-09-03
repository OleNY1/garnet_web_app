import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ScrollToTop } from './components/ScrollToTop'
import { Check } from './pages/Check'
import { Home } from './pages/Home'
import { FamilySharing } from './pages/learn/FamilySharing'
import { HowItHelps } from './pages/learn/HowItHelps'
import { KidneyDonation } from './pages/learn/KidneyDonation'
import { LearnLayout } from './pages/learn/LearnLayout'
import { Overview } from './pages/learn/Overview'
import { TestingBasics } from './pages/learn/TestingBasics'
import { YourRights } from './pages/learn/YourRights'
import { NextSteps } from './pages/NextSteps'
import DoctorAssessmentResult from './doctor/pages/AssessmentResult'
import DoctorCounselorProfile from './doctor/pages/CounselorProfile'
import DoctorEducation from './doctor/pages/Education'
import DoctorGeneticCounselingWorkflowDetailPage from './doctor/pages/GeneticCounselingWorkflowDetailPage'
import DoctorGeneticCounselingWorkflowPage from './doctor/pages/GeneticCounselingWorkflowPage'
import DoctorGeneticCounselorMatch from './doctor/pages/GeneticCounselorMatch'
import DoctorLandingPage from './doctor/pages/LandingPage'
import DoctorLiteracyAssessment from './doctor/pages/LiteracyAssessment'
import DoctorLiteracyResult from './doctor/pages/LiteracyResult'
import DoctorLogin from './doctor/pages/Login'
import DoctorModuleDetail from './doctor/pages/ModuleDetail'
import DoctorOnboarding from './doctor/pages/Onboarding'
import DoctorPatientAssessment from './doctor/pages/PatientAssessment'
import DoctorProfile from './doctor/pages/Profile'
import DoctorResourceDestinationPage from './doctor/pages/ResourceDestinationPage'
import DoctorResourceModePage from './doctor/pages/ResourceModePage'

export default function App() {
  const location = useLocation()
  const isDoctorRoute = location.pathname.startsWith('/doctor')

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:border focus:border-line focus:bg-surface focus:px-5 focus:py-3 focus:font-semibold focus:text-ink focus:shadow-lift"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      {!isDoctorRoute ? <Header /> : null}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<LearnLayout />}>
            <Route index element={<Overview />} />
            <Route path="testing-basics" element={<TestingBasics />} />
            <Route path="how-it-helps" element={<HowItHelps />} />
            <Route path="family-sharing" element={<FamilySharing />} />
            <Route path="kidney-donation" element={<KidneyDonation />} />
            <Route path="your-rights" element={<YourRights />} />
          </Route>
          <Route path="/check" element={<Check />} />
          <Route path="/next-steps" element={<NextSteps />} />
          <Route path="/doctor" element={<Navigate to="/doctor/dashboard" replace />} />
          <Route path="/doctor/onboarding" element={<DoctorOnboarding />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/dashboard" element={<DoctorLandingPage />} />
          <Route path="/doctor/dashboard/:mode" element={<DoctorResourceModePage />} />
          <Route path="/doctor/dashboard/resource/:resourceId" element={<DoctorResourceDestinationPage />} />
          <Route
            path="/doctor/dashboard/resource/genetic-counseling-workflow"
            element={<DoctorGeneticCounselingWorkflowPage />}
          />
          <Route
            path="/doctor/dashboard/resource/genetic-counseling-workflow/:topicId"
            element={<DoctorGeneticCounselingWorkflowDetailPage />}
          />
          <Route path="/doctor/assessment" element={<DoctorPatientAssessment />} />
          <Route path="/doctor/assessment/result" element={<DoctorAssessmentResult />} />
          <Route path="/doctor/counselors" element={<DoctorGeneticCounselorMatch />} />
          <Route path="/doctor/counselors/:id" element={<DoctorCounselorProfile />} />
          <Route path="/doctor/education" element={<DoctorEducation />} />
          <Route path="/doctor/education/:moduleId" element={<DoctorModuleDetail />} />
          <Route path="/doctor/literacy" element={<DoctorLiteracyAssessment />} />
          <Route path="/doctor/literacy/result" element={<DoctorLiteracyResult />} />
          <Route path="/doctor/profile" element={<DoctorProfile />} />
          {/* Placeholder routes (privacy, terms, contact) aren't built yet;
              send visitors home instead of a dead page. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isDoctorRoute ? <Footer /> : null}
    </div>
  )
}
