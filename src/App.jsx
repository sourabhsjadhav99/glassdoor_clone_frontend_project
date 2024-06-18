import { Routes,Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import "./index.css";
import CompaniesPage from "./pages/CompaniesPage";
import SignupPage from "./pages/SignupPage";
import CommunityPage from "./pages/CommunityPage";
import SalariesPage from "./pages/SalariesPage";
import JobsPage from "./pages/JobsPage";
import PersonalDataPage from "./pages/PersonalDataPage";
import GetPersonalInfo from "./pages/GetPersonalInfo";
import SavedJobs from "./pages/SavedJobs";
import AppliedJobsPage from "./pages/AppliedJobsPage";
import UpdatePersonalInfoForm from "./components/forms/UpdatePersonalInfoForm";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route  path="/" element={<CommunityPage/>} />
        <Route path="/companies" element={<CompaniesPage/>}/>
        <Route path="/personalInfo" element={<GetPersonalInfo/>}/>
        <Route path="/savedjobs" element={<SavedJobs/>}/>
        <Route path="/appliedjobs" element={<AppliedJobsPage/>}/>
        <Route path="/salaries" element={<SalariesPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/personal" element={<PersonalDataPage/>}/>
        <Route path="/editpersonal" element={<UpdatePersonalInfoForm/>}/>
        <Route path="/jobs" element={<JobsPage/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
