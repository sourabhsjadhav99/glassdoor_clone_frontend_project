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
      {jobState.error && <p>Error: {jobState.error}</p>}
      {!jobState?.loading ? <div className="job-list">
        {jobState?.data ? jobState?.data?.map((job, index) => (
          <JobCard key={job.job_id} job={job} />
        )):<div className='text-xl'>Sorry! results not found</div>}
      </div>:<p>Loading jobs...</p>}
    </div>
  );
};

export default JobList;
