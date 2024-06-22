import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HiOutlineSparkles } from "react-icons/hi";
import { useFirebase } from "../FirebaseProvider";
import JobSearchForm from "../components/forms/JobSearchForm";
import { fetchJobs } from "../redux/jobsSlice";

const JobSearch = () => {
  const dispatch = useDispatch();
  const { userData } = useFirebase();


  // List of predefined job queries
  const jobQueries = [
    "web developer",
    "mechanical engineer",
    "manager",
    "software engineer",
    "sales executive",
  ];

  // State to manage the search query and active button
  const [query, setQuery] = useState("");

  const [activeButton, setActiveButton] = useState("forYou");

  // Function to get a random job query from the list
  const getRandomQuery = () => {
    const randomIndex = Math.floor(Math.random() * jobQueries.length);
    return jobQueries[randomIndex];
  };


 // Handler for "For You" button click
  const handleForYouClick = () => {
    setActiveButton("forYou");
    // Use user's role as the query or a random query if not available
    const randomQuery = userData?.role || getRandomQuery();
    dispatch(fetchJobs({ q: randomQuery }));
    setQuery("");
  };

    // Handler for "Search" button click
  const handleSearch = (type) => {
    setActiveButton(type);
  };

  return (
    <div className="w-[100%] flex flex-col items-center justify-center bg-white">
      <div className="w-[100%] md:w-[70%] lg:w-[50%]">
      <JobSearchForm onSearch={handleSearch} />
      </div>
     
      <div className="flex gap-5 text-md text-gray-500 font-semibold items-center">
        <div
          onClick={handleForYouClick}
          className={`flex gap-2 items-center border-b-4 cursor-pointer ${
            activeButton === "forYou"
              ? "border-green-400 font-bold"
              : "border-transparent"
          } p-2`}
        >
          <span className="text-xl">
            <HiOutlineSparkles />
          </span>
          <span>For You</span>
        </div>
        <div
          onClick={() => handleSearch("search")}
          className={`flex gap-2 items-center border-b-4 cursor-pointer ${
            activeButton === "search"
              ? "border-green-400 font-bold"
              : "border-transparent"
          } p-2`}
        >
          <span>Search</span>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
