import { Routes,Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import "./index.css";
import CompaniesPage from "./pages/CompaniesPage";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/companies" element={<CompaniesPage/>}/>

      </Routes>
      <Footer/>
    </>
  );
}

export default App;
