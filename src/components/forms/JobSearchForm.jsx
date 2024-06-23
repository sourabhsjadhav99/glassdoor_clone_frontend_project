import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IoMdSearch } from "react-icons/io";
import { fetchJobs } from "../../redux/jobsSlice";
import { useFirebase } from "../../FirebaseProvider";
import { useNavigate } from "react-router-dom";
import { GrLocation } from "react-icons/gr";

const JobSearchForm = ({ onSearch }) => {
  const dispatch = useDispatch();
  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");
  let navigate = useNavigate();
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

  useEffect(() => {
    const initialQuery = userData?.role || getRandomQuery();
    dispatch(fetchJobs({ q: initialQuery }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let query = `${query1} ${query2}`;
    if (query.trim()) {
      // If search query is provided, dispatch fetchJobs with the query
      dispatch(fetchJobs({ q: query }));
      onSearch && onSearch("search");
      navigate("/");
    } else {
      // If search query is empty, generate a random query and dispatch fetchJobs
      const randomQuery = userData?.role || getRandomQuery();
      dispatch(fetchJobs({ q: randomQuery }));
      onSearch && onSearch("forYou");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[100%]  flex gap-1 justify-center p-5 "
    >
      <div className="w-[70%] flex items-center justify-evenly bg-gray-100 rounded-l-full ">
        <div className="px-2">
          <IoMdSearch className="text-2xl text-gray-500" />
        </div>
        <input
          type="text"
          value={query1}
          onChange={(e) => setQuery1(e.target.value)}
          className="w-[100%] md:w-[95%] p-2 bg-gray-100 text-sm md:text-md lg:text-lg outline-none"
          placeholder="Find the perfect job"
        />
      </div>
      <div className="w-[30%] flex items-center justify-evenly bg-gray-100 rounded-r-full">
        <div className="px-2">
          <GrLocation className="text-2xl text-gray-500" />
        </div>
        <input
          type="text"
          value={query2}
          onChange={(e) => setQuery2(e.target.value)}
          className="w-[100%] md:w-[95%] p-2 bg-gray-100 text-sm md:text-md lg:text-lg outline-none rounded-r-full"
          placeholder="Location"
        />
      </div>
      {/* <button
        type="submit"
        className="w-[20%] bg-green-400 rounded-r-full text-white font-semibold hover:bg-green-500 hover:font-bold"
      >
        Search
      </button> */}
      <button
        type="submit"
        className=" bg-green-400 rounded-r-full text-white font-semibold hover:bg-green-500 hover:font-bold"
      ></button>
    </form>
  );
};

export default JobSearchForm;
