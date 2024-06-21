// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { fetchJobs } from "../redux/jobsSlice";
// import { IoMdSearch } from "react-icons/io";
// import { HiOutlineSparkles } from "react-icons/hi";
// import { useFirebase } from "../FirebaseProvider";
// const JobSearch = () => {
//   const dispatch = useDispatch();
//   let {userData } = useFirebase();

//   const jobQueries = [
//     "web developer",
//     "mechanical engineer",
//     "manager",
//     "software engineer",
//     "sales executive",
//   ];
//   const [query, setQuery] = useState("");
//   const [isDefault, setIsDefault] = useState(true);

//   const getRandomQuery = () => {
//     const randomIndex = Math.floor(Math.random() * jobQueries.length);
//     return jobQueries[randomIndex];
//   };

//   useEffect(() => {
//     const initialQuery =userData?.role || getRandomQuery();
//     dispatch(fetchJobs({ q: initialQuery }));
//   }, [dispatch]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       dispatch(fetchJobs({ q: query }));
//       setIsDefault(false);
//     } else {
//       const randomQuery = getRandomQuery();
//       dispatch(fetchJobs({ q: randomQuery }));
//       setIsDefault(true);
//     }
//   };

//   return (
//     <div className="w-[100%] flex flex-col items-center justify-center bg-white">
//       <form
//         onSubmit={handleSubmit}
//         className="w-[100%] md:w-[70%] lg:w-[50%] flex gap-1 justify-center p-5 "
//       >
//         <div className="w-[80%] flex items-center justify-evenly bg-gray-100 rounded-l-full ">
//           <div className="px-2">
//             {" "}
//             <IoMdSearch className="text-2xl text-gray-500" />
//           </div>
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="w-[95%]  p-2 bg-gray-100 text-lg outline-none"
//             placeholder="Find the perfect job "
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-[20%] bg-green-400 rounded-r-full text-white font-semibold hover:bg-green-500 hover:font-bold"
//         >
//           Search
//         </button>
//       </form>
//       <div className="flex gap-5 text-md text-gray-500 font-semibold items-center">
//         <div
//           className={`flex gap-2 items-center border-b-4 hover:border-gray-200 ${
//             isDefault ? "border-green-400 font-bold" : "border-transparent"
//           } p-2`}
//         >
//           <span className="text-xl">
//             <HiOutlineSparkles />
//           </span>
//           <span>For You</span>
//         </div>
//         <div
//           className={`flex gap-2 items-center border-b-4 hover:border-gray-200 ${
//             !isDefault ? "border-green-400 font-bold" : "border-transparent"
//           } p-2`}
//         >
//           <span>Search</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobSearch;
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { fetchJobs } from "../redux/jobsSlice";
// import { IoMdSearch } from "react-icons/io";
// import { HiOutlineSparkles } from "react-icons/hi";
// import { useFirebase } from "../FirebaseProvider";

// const JobSearch = () => {
// const dispatch = useDispatch();
// const { userData } = useFirebase();

// const jobQueries = [
//   "web developer",
//   "mechanical engineer",
//   "manager",
//   "software engineer",
//   "sales executive",
// ];

// const [query, setQuery] = useState("");
// // const [isDefault, setIsDefault] = useState(true);
// const [activeButton, setActiveButton] = useState("forYou");

// const getRandomQuery = () => {
//   const randomIndex = Math.floor(Math.random() * jobQueries.length);
//   return jobQueries[randomIndex];
// };

// // useEffect(() => {
// //   const initialQuery = userData?.role || getRandomQuery();
// //   dispatch(fetchJobs({ q: initialQuery }));
// // }, [dispatch, userData]);

// const handleSubmit = (e) => {
//   e.preventDefault();
//   if (query.trim()) {
//     dispatch(fetchJobs({ q: query }));
//     // setIsDefault(false);
//     setActiveButton("search");
//   } else {
//     const randomQuery = getRandomQuery();
//     dispatch(fetchJobs({ q: randomQuery }));

//   }
// };

// const handleForYouClick = () => {
//   setActiveButton("forYou");
//   const randomQuery = userData?.role || getRandomQuery();
//   dispatch(fetchJobs({ q: randomQuery }));

//   setQuery("");
// };

// const handleSearchClick = () => {
//   setActiveButton("search");
//   if (query.trim()) {
//     dispatch(fetchJobs({ q: query }));
//     // setIsDefault(false);
//   } else {
//     const randomQuery = getRandomQuery();
//     dispatch(fetchJobs({ q: randomQuery }));

//   }
// };

//   return (
//     <div className="w-[100%] flex flex-col items-center justify-center bg-white">
//       <form
//         onSubmit={handleSubmit}
//         className="w-[100%] md:w-[70%] lg:w-[50%] flex gap-1 justify-center p-5 "
//       >
//         <div className="w-[80%] flex items-center justify-evenly bg-gray-100 rounded-l-full ">
//           <div className="px-2">
//             <IoMdSearch className="text-2xl text-gray-500" />
//           </div>
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="w-[100%] md:w-[95%]  p-1 md:p-2 bg-gray-100 text-lg outline-none"
//             placeholder="Find the perfect job "
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-[20%] bg-green-400 rounded-r-full text-white font-semibold hover:bg-green-500 hover:font-bold"
//         >
//           Search
//         </button>
//       </form>
//       <div className="flex gap-5 text-md text-gray-500 font-semibold items-center">
//         <div
//           onClick={handleForYouClick}
//           className={`flex gap-2 items-center border-b-4 cursor-pointer ${
//             activeButton === "forYou" ? "border-green-400 font-bold" : "border-transparent"
//           } p-2`}
//         >
//           <span className="text-xl">
//             <HiOutlineSparkles />
//           </span>
//           <span>For You</span>
//         </div>
//         <div
//           onClick={handleSearchClick}
//           className={`flex gap-2 items-center border-b-4 cursor-pointer ${
//             activeButton === "search" ? "border-green-400 font-bold" : "border-transparent"
//           } p-2`}
//         >
//           <span>Search</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobSearch;

// src/pages/JobSearch.js

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HiOutlineSparkles } from "react-icons/hi";
import { useFirebase } from "../FirebaseProvider";
import JobSearchForm from "../components/forms/JobSearchForm";
import { fetchJobs } from "../redux/jobsSlice";

const JobSearch = () => {
  const dispatch = useDispatch();
  const { userData } = useFirebase();
  const jobQueries = [
    "web developer",
    "mechanical engineer",
    "manager",
    "software engineer",
    "sales executive",
  ];

  const [query, setQuery] = useState("");

  const [activeButton, setActiveButton] = useState("forYou");

  const getRandomQuery = () => {
    const randomIndex = Math.floor(Math.random() * jobQueries.length);
    return jobQueries[randomIndex];
  };



  const handleForYouClick = () => {
    setActiveButton("forYou");
    const randomQuery = userData?.role || getRandomQuery();
    dispatch(fetchJobs({ q: randomQuery }));
    setQuery("");
  };

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
