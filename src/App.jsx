import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import "./index.css";
import CompaniesPage from "./pages/CompaniesPage";
import SignupPage from "./pages/SignupPage";

import SalariesPage from "./pages/SalariesPage";
import JobsPage from "./pages/JobsPage";
import PersonalDataPage from "./pages/CreateEditProfilePage";
import GetPersonalInfo from "./pages/GetPersonalInfo";
import SavedJobs from "./pages/SavedJobs";
import AppliedJobsPage from "./pages/AppliedJobsPage";
import UpdatePersonalInfoForm from "./components/forms/EditProfileForm";
import CreateEditProfilePage from "./pages/CreateEditProfilePage";
import { useFirebase } from "./FirebaseProvider";
import ApplyJobPage from "./pages/ApplyJobPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<JobsPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
    
        <Route path="/salaries" element={<SalariesPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <GetPersonalInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/savedjobs"
          element={
            <ProtectedRoute>
              <SavedJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appliedjobs"
          element={
            <ProtectedRoute>
              <AppliedJobsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/applyjob" element={<ApplyJobPage />} />
        <Route
          path="/create-edit-profile"
          element={<CreateEditProfilePage />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

function ProtectedRoute({ children }) {
  let { isLoggedIn } = useFirebase();

  if (!isLoggedIn) {
    return <Navigate to="/signup" />;
  }
  return children;
}
