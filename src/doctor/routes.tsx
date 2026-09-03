import { Navigate, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ResourceModePage from "./pages/ResourceModePage";
import ResourceDestinationPage from "./pages/ResourceDestinationPage";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import PatientAssessment from "./pages/PatientAssessment";
import AssessmentResult from "./pages/AssessmentResult";
import GeneticCounselorMatch from "./pages/GeneticCounselorMatch";
import CounselorProfile from "./pages/CounselorProfile";
import Education from "./pages/Education";
import ModuleDetail from "./pages/ModuleDetail";
import GeneticCounselingWorkflowPage from "./pages/GeneticCounselingWorkflowPage";
import GeneticCounselingWorkflowDetailPage from "./pages/GeneticCounselingWorkflowDetailPage";
import LiteracyAssessment from "./pages/LiteracyAssessment";
import LiteracyResult from "./pages/LiteracyResult";
import Profile from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/doctor/dashboard" replace />,
  },
  {
    path: "/doctor/onboarding",
    Component: Onboarding,
  },
  {
    path: "/doctor/login",
    Component: Login,
  },
  {
    path: "/doctor/dashboard",
    Component: LandingPage,
  },
  {
    path: "/doctor/dashboard/:mode",
    Component: ResourceModePage,
  },
  {
    path: "/doctor/dashboard/resource/:resourceId",
    Component: ResourceDestinationPage,
  },
  {
    path: "/doctor/dashboard/resource/genetic-counseling-workflow",
    Component: GeneticCounselingWorkflowPage,
  },
  {
    path: "/doctor/dashboard/resource/genetic-counseling-workflow/:topicId",
    Component: GeneticCounselingWorkflowDetailPage,
  },
  {
    path: "/doctor/assessment",
    Component: PatientAssessment,
  },
  {
    path: "/doctor/assessment/result",
    Component: AssessmentResult,
  },
  {
    path: "/doctor/counselors",
    Component: GeneticCounselorMatch,
  },
  {
    path: "/doctor/counselors/:id",
    Component: CounselorProfile,
  },
  {
    path: "/doctor/education",
    Component: Education,
  },
  {
    path: "/doctor/education/:moduleId",
    Component: ModuleDetail,
  },
  {
    path: "/doctor/literacy",
    Component: LiteracyAssessment,
  },
  {
    path: "/doctor/literacy/result",
    Component: LiteracyResult,
  },
  {
    path: "/doctor/profile",
    Component: Profile,
  },
]);
