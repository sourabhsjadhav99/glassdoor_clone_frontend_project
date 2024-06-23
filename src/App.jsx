import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import "./index.css";
import CompaniesPage from "./pages/CompaniesPage";
import SignupPage from "./pages/SignupPage";
import SalariesPage from "./pages/SalariesPage";
import JobsPage from "./pages/JobsPage";
import GetPersonalInfo from "./pages/GetPersonalInfo";
import SavedJobs from "./pages/SavedJobs";
import AppliedJobsPage from "./pages/AppliedJobsPage";
import CreateEditProfilePage from "./pages/CreateEditProfilePage";
import { useFirebase } from "./FirebaseProvider";
import ApplyJobPage from "./pages/ApplyJobPage";
import NotFoundPage from "./pages/NotFoundPage";


// ProtectedRoute component to handle protected routes based on user authentication
function ProtectedRoute({ children }) {
  let { isLoggedIn } = useFirebase();

   // If user is not logged in, navigate to the signup page
  if (!isLoggedIn) {
    return <Navigate to="/signup" />;
  }
  return children;
}


// Main App component
function App() {
  return (
    <div className="bg-white min-h-[100vh]">
      <Header />
      <Routes>
        <Route path="/" element={<JobsPage />} />
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
        <Route
          path="/applyjob"
          element={
            <ProtectedRoute>
              <ApplyJobPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-edit-profile"
          element={
            <ProtectedRoute>
              <CreateEditProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
  

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
