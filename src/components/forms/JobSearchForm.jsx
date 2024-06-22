// src/components/JobSearchForm.js

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IoMdSearch } from "react-icons/io";
import { fetchJobs } from "../../redux/jobsSlice";
import { useFirebase } from "../../FirebaseProvider";
import { useNavigate } from "react-router-dom";

const JobSearchForm = ({ onSearch }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  let navigate = useNavigate()
  const { userData } = useFirebase();

  const jobQueries = [
    "web developer",
    "mechanical engineer",
    "manager",
    "software engineer",
    "sales executive",
  ];

  const getRandomQuery = () => {
    const randomIndex = Math.floor(Math.random() * jobQueries.length);
    return jobQueries[randomIndex];
  };

  //    useEffect(() => {
  //    const initialQuery = userData?.role || getRandomQuery();
  //    dispatch(fetchJobs({ q: initialQuery }));
  //  }, [dispatch, userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchJobs({ q: query }));
      onSearch && onSearch("search");
      navigate("/jobs")
    } else {
      const randomQuery = getRandomQuery();
      dispatch(fetchJobs({ q: randomQuery }));
      onSearch && onSearch("forYou");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[100%]  flex gap-1 justify-center p-5 "
    >
      <div className="w-[80%] flex items-center justify-evenly bg-gray-100 rounded-l-full ">
        <div className="px-2">
          <IoMdSearch className="text-2xl text-gray-500" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-[100%] md:w-[95%] p-2 bg-gray-100 text-sm md:text-md lg:text-lg outline-none"
          placeholder="Find the perfect job"
        />
      </div>
      <button
        type="submit"
        className="w-[20%] bg-green-400 rounded-r-full text-white font-semibold hover:bg-green-500 hover:font-bold"
      >
        Search
      </button>
    </form>
  );
};

export default JobSearchForm;
