import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import JobCard from "./cards/JobCard";
import { useParams } from "react-router-dom";
import { useFirebase } from "../FirebaseProvider";
import SavedJobCard from "./cards/SavedJobCard";

const SavedJobList = () => {
  const [data, setData] = useState([]); // State to hold job data
  const [appliedLoading, setAppliedLoading] = useState(false); // State to manage loading status
  const [appliedError, setAppliedError] = useState(null); // State to manage error status
  const { userData } = useFirebase(); // Retrieving userData from FirebaseProvider


  // Destructure userData safely by providing default values
  const { savedJobs = [], error=null, loading=false } = userData || {};

  useEffect(() => {
    setData(savedJobs); // Set job data to the savedJobs from userData
    setAppliedError(error); // Set error status
    setAppliedLoading(loading); // Set loading status
  }, [userData]); // Trigger effect on changes in userData


  return (
    <div className="bg-white">
      {appliedError && <p>Error: {appliedError}</p>}
      {!appliedLoading ? <div className="job-list">
        {data ? data?.map((job, index) => (
          <SavedJobCard key={job.job_id} job={job} />
        )):<div className='text-xl'>Sorry! results not found</div>}
      </div>:<p>Loading jobs...</p>}
    </div>
  );
};

export default SavedJobList;
