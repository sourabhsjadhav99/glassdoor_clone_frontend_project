import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import JobCard from "../components/cards/JobCard";
import { useParams } from "react-router-dom";

const JobList = () => {
  // Accessing the jobState from Redux store using useSelector
  const jobState = useSelector((state) => state.jobs);

  return (
    <div className="bg-white">
      {jobState.error && <p>Error: {jobState.error}</p>}
      <div className="job-list">
        {jobState?.data.length > 0 ? (
          jobState?.data?.map((job, index) => (
            <JobCard key={job?.job_id} job={job} />
          ))
        ) : (
          <div className="text-xl">Sorry! results not found</div>
        )}
      </div>
    </div>
  );
};

export default JobList;
