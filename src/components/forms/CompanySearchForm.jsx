import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { fetchJobs } from "../../redux/jobsSlice";

const CompanySearchForm = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // If search query is provided, dispatch fetchJobs with the query
      dispatch(fetchJobs({ q: query }));
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
