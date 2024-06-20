// // components/JobsPage.js
// import React, { useEffect, useState } from "react";
// import { useFirebase } from "../FirebaseProvider";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchJobs } from "../redux/jobsSlice";
// import JobCard from "../components/cards/JobCard";

// function JobsPage() {
//   const { updateSavedJobs, userData } = useFirebase();
//   const { savedJobs = [], appliedJobs = [] } = userData || {};
//   const jobs = useSelector((state) => state.jobs.data); // Accessing jobs.data directly
//   const loading = useSelector((state) => state.jobs.loading);
//   const error = useSelector((state) => state.jobs.error);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchJobs());
//   }, [dispatch]);

//   useEffect(() => {
//     console.log("Fetched Jobs:", jobs);
//   }, [jobs]);

//   let handleSaveJob = async () => {
//     const newJob = { id: 4, role: "doctor" };
//     const updatedJobs = [...savedJobs, newJob];
//     await updateSavedJobs({ savedJobs: updatedJobs });
//   };

//   let handleApplyJob = async () => {
//     const newJob = { id: 4, role: "doctor" };
//     const updatedJobs = [...appliedJobs, newJob];
//     await updateSavedJobs({ appliedJobs: updatedJobs });
//   };

//   return (
//     <div className="w-[100%] bg-white p-5">
//       <button onClick={handleSaveJob}>Save job</button>
//       <button onClick={handleApplyJob}>Apply job</button>
//       <div className="w-[30%]">
//         <JobCard />
//       </div>
//     </div>
//   );
// }

// export default JobsPage;

// const JobList = () => {
//   const dispatch = useDispatch();
//   const jobState = useSelector((state) => state.jobs);

//   const [query, setQuery] = useState('');

//   useEffect(() => {
//     // Fetch initial job list with default query
//     dispatch(fetchJobs({ q: 'developer' }));
// }, [dispatch]);

//   const handleSubmit = (e) => {
//       e.preventDefault();
//       dispatch(fetchJobs({ q: query}));
//   };

//   return (
//       <div>
//           <h1>Job Listings</h1>
//           <form onSubmit={handleSubmit}>
//               <input
//                   type="text"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Job title"
//               />

//               <button type="submit">Search</button>
//           </form>
//           {jobState.loading && <p>Loading jobs...</p>}
//           {jobState.error && <p>Error: {jobState.error}</p>}
//           <ul>
//               {jobState.data.map((job, index) => (
//                   <li key={index}>{job.title}</li> // Adjust according to your data structure
//               ))}
//           </ul>
//       </div>
//   );
// };

// export default JobList;

import React, { useEffect } from "react";
import JobSearch from "../components/JobSearch";
import JobList from "../components/JobsList";
import { useDispatch, useSelector } from "react-redux";
import { selectJob } from "../redux/jobDetailsSlice";

function JobsPage() {
  const selectedJob = useSelector((state) => state.jobDetails.selectedJob);
  const jobState = useSelector((state) => state.jobs); // Accessing jobState from Redux
  const dispatch = useDispatch();
  useEffect(() => {
    // Select the first job by default from the job list
    const firstJob = jobState.data[0];
    if (firstJob) {
      dispatch(selectJob(firstJob));
    }
  }, [dispatch, jobState.data]);

  return (
    <div className="w-[100%] bg-white ">
      <div className="w-[100%] border-b border-gray-300 pt-5">
        <JobSearch />
      </div>
      <div className="flex justify-center p-5">
        <div className="w-[90%] flex justify-center border border-red-600 gap-10 p-5">
          <div className="w-[40%]">
            <JobList />
          </div>
          <div className="w-[60%] border rounded h-auto">
          {selectedJob ? (
              <div>
                <h2>{selectedJob.title}</h2>
                <p>{selectedJob.company_name}</p>
                {/* Display other job details */}
              </div>
            ) : (
              <p>Please select a job</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobsPage;
