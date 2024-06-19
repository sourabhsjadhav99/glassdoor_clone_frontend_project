
// import React, { useEffect, useState } from "react";
// import { useFirebase } from "../FirebaseProvider";
// import { useNavigate } from "react-router-dom";

// function AppliedJobsPage() {
//   const [data, setData] = useState([]);
//   const { updateSavedJobs, userData } = useFirebase();


//   // Destructure userData safely by providing default values
//   const { appliedJobs = [] } = userData || {};

//   useEffect(() => {

//     setData(userData?.appliedJobs)
//   }, [userData]);

//   let handleRemoveJob = async (jobIdToDelete) => {
//     const updatedJobs = appliedJobs.filter((job) => job.id !== jobIdToDelete);
//     await updateSavedJobs({ appliedJobs: updatedJobs });

//   };

//   return (
//     <div>
//       <h1>Applied jobs</h1>
//       {data?.map((job) => (
//         <div key={job.id} className="flex gap-3">
//           <p>{job?.role}</p>
//           <button onClick={() => handleRemoveJob(job.id)}>delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default AppliedJobsPage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppliedJobs, removeAppliedJob } from "../redux/jobSlice";
import { fetchUserData } from "../redux/userSlice";

function AppliedJobsPage() {
  const dispatch = useDispatch();
  const appliedJobs = useSelector((state) => state.jobs.appliedJobs);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserData(user.uid)).then((action) => {
        if (action.payload.appliedJobs) {
          dispatch(setAppliedJobs(action.payload.appliedJobs));
        }
      });
    }
  }, [user, dispatch]);

  const handleRemoveJob = (jobId) => {
    dispatch(removeAppliedJob(jobId));
  };

  return (
    <div>
      <h1>Applied Jobs</h1>
      {appliedJobs.map((job) => (
        <div key={job.id} className="flex gap-3">
          <p>{job.role}</p>
          <button onClick={() => handleRemoveJob(job.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AppliedJobsPage;
