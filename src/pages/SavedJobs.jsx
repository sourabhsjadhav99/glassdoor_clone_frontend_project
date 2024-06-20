import React, { useEffect, useState } from "react";
import { useFirebase } from "../FirebaseProvider";
import { useNavigate } from "react-router-dom";

function SavedJobs() {
  const [data, setData] = useState([]);
  const { updateSavedJobs, userData } = useFirebase();


  // Destructure userData safely by providing default values
  const { savedJobs = [] } = userData || {};

  useEffect(() => {

    setData(userData?.savedJobs)
  }, [userData]);

  let handleRemoveJob = async (jobIdToDelete) => {
    const updatedJobs = savedJobs.filter((job) => job.id !== jobIdToDelete);
    await updateSavedJobs({ savedJobs: updatedJobs });

  };

  return (
    <div>
      <h1>Saved jobs</h1>
      {data?.map((job) => (
        <div key={job.job_id} className="flex gap-3">
          <p>{job?.title}</p>
          <button onClick={() => handleRemoveJob(job.id)}>delete</button>
        </div>
      ))}
    </div>
  );
}

export default SavedJobs;
