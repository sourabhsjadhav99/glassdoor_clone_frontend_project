import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import JobCard from "../components/cards/JobCard";

const JobList = () => {
  const jobState = useSelector((state) => state.jobs);

  useEffect(() => {
    console.log(jobState.data);
  }, [jobState]);

  return (
    <div className="bg-white">
      {jobState.loading && <p>Loading jobs...</p>}
      {jobState.error && <p>Error: {jobState.error}</p>}
      <div className="job-list">
        {jobState.data.map((job, index) => (
          <JobCard key={job.job_id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
