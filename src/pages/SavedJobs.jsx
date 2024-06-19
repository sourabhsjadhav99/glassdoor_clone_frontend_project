// import React, { useEffect, useState } from "react";
// import { useFirebase } from "../FirebaseProvider";
// import { useNavigate } from "react-router-dom";

// function SavedJobs() {
//   const [data, setData] = useState([]);
//   const { updateSavedJobs, userData } = useFirebase();


//   // Destructure userData safely by providing default values
//   const { savedJobs = [] } = userData || {};

//   useEffect(() => {

//     setData(userData?.savedJobs)
//   }, [userData]);

//   let handleRemoveJob = async (jobIdToDelete) => {
//     const updatedJobs = savedJobs.filter((job) => job.id !== jobIdToDelete);
//     await updateSavedJobs({ savedJobs: updatedJobs });

//   };

//   return (
//     <div>
//       <h1>Saved jobs</h1>
//       {data?.map((job) => (
//         <div key={job.id} className="flex gap-3">
//           <p>{job?.role}</p>
//           <button onClick={() => handleRemoveJob(job.id)}>delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default SavedJobs;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/userSlice";
import { setSavedJobs, removeSavedJob } from "../redux/jobSlice";

function SavedJobs() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const savedJobs = useSelector((state) => state.jobs.savedJobs);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserData(user.uid)).then((action) => {
        if (action.payload) {
          const { savedJobs = [] } = action.payload;
          dispatch(setSavedJobs(savedJobs));
        }
      });
    }
  }, [user, dispatch]);

  const handleRemoveJob = (jobIdToDelete) => {
    dispatch(removeSavedJob(jobIdToDelete));
    // Optionally, you can update the saved jobs in your backend here
  };

  return (
    <div>
      <h1>Saved jobs</h1>
      {savedJobs?.map((job) => (
        <div key={job.id} className="flex gap-3">
          <p>{job?.role}</p>
          <button onClick={() => handleRemoveJob(job.id)}>delete</button>
        </div>
      ))}
    </div>
  );
}

export default SavedJobs;
