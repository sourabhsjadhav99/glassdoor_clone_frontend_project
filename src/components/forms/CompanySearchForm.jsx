import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {fetchCompanyDetails} from "../../redux/companyDetailsSlice"

const CompanySearchForm = () => {
  const [company, setCompany] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setCompany(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (company.trim()) {
      console.log(company)
      dispatch(fetchCompanyDetails(company));
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="w-[100%]  flex gap-1 justify-center p-5 "
    >
      <div className="w-[70%] flex items-center justify-evenly bg-gray-100  ">
        <input
          type="text"
          value={company}
          onChange={handleInputChange}
          className="w-[100%] md:w-[95%] p-2 bg-gray-100 text-sm md:text-md lg:text-lg outline-none"
          placeholder="Search Company"
        />
      </div>

      <button
        type="submit"
        className=" p-2 bg-blue-600 text-white rounded font-semibold hover:font-bold"
      >Search</button>
    </form>
  );
};

export default CompanySearchForm;
