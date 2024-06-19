
import React, { useEffect, useState } from "react";
import { useFirebase } from "../FirebaseProvider";
import { useNavigate } from "react-router-dom";

function AppliedJobsPage() {
  const [data, setData] = useState([]);
  const { updateSavedJobs, userData } = useFirebase();


  // Destructure userData safely by providing default values
  const { appliedJobs = [] } = userData || {};

  useEffect(() => {

    setData(userData?.appliedJobs)
  }, [userData]);

  let handleRemoveJob = async (jobIdToDelete) => {
    const updatedJobs = appliedJobs.filter((job) => job.id !== jobIdToDelete);
    await updateSavedJobs({ appliedJobs: updatedJobs });

  };

  return (
    <div>
      <h1>Applied jobs</h1>
      {data?.map((job) => (
        <div key={job.id} className="flex gap-3">
          <p>{job?.role}</p>
          <button onClick={() => handleRemoveJob(job.id)}>delete</button>
        </div>
      ))}
    </div>
  );
}

export default AppliedJobsPage;

