import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import JobCard from "../cards/JobCard";

const JobList = () => {
  // Accessing the jobState from Redux store using useSelector
  const jobState = useSelector((state) => state.jobSearch.jobs);
  let [data, setData] = useState([]);


  useEffect(() => {
    setData(jobState);
  }, [jobState]);


  return (
    <div className="bg-white">
      {/* {jobState.error && <p>Error: {jobState.error}</p>} */}
      {data.length > 0 && (
        <div className="job-list">
          {data.length > 0 ? (
            data?.map((job, index) => (
              <JobCard key={job?.id} job={job} />
            ))
          ) : (
            <div className="text-xl">Sorry! results not found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobList;
