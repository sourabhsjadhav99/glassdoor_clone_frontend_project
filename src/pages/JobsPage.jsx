// import React, { useState } from "react";
// import { useFirebase } from "../FirebaseProvider";

// function JobsPage() {
//   const { updateSavedJobs, userData } = useFirebase();

//   const { savedJobs = [], appliedJobs=[] } = userData || {};



//   let handleSaveJob = async () => {
//     const newJob = { id: 4, role: "bdoctor" };
//     const updatedJobs = [...savedJobs, newJob]; // Create a new array with the added job
//     await updateSavedJobs({ savedJobs: updatedJobs }); // Update the saved jobs in Firebase
//   };

//   let handleApplyJob = async () => {
//     const newJob = { id: 4, role: "bdoctor" };
//     const updatedJobs = [...appliedJobs, newJob]; // Create a new array with the added job
//     await updateSavedJobs({ appliedJobs: updatedJobs }); // Update the saved jobs in Firebase
//   };



//   return (
//     <div>
//       <button onClick={handleSaveJob}>Save job</button>
//       <button onClick={handleApplyJob}>Apply job</button>
//     </div>
//   );
// }

// export default JobsPage;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSavedJob,
  addAppliedJob,
  setSavedJobs,
  setAppliedJobs,
} from "../redux/jobSlice";
import { fetchUserData } from "../redux/userSlice";

function JobsPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const jobsState = useSelector((state) => state.jobs); // Get the entire jobs slice

  useEffect(() => {
    if (user) {
      dispatch(fetchUserData(user.uid)).then((action) => {
        if (action.payload) {
          const { savedJobs = [], appliedJobs = [] } = action.payload;
          dispatch(setSavedJobs(savedJobs));
          dispatch(setAppliedJobs(appliedJobs));
        }
      });
    }
  }, [user, dispatch]);

  const handleSaveJob = () => {
    const newJob = { id: 4, role: "bdoctor" };
    dispatch(addSavedJob(newJob));
  };

  const handleApplyJob = () => {
    const newJob = { id: 4, role: "bdoctor" };
    dispatch(addAppliedJob(newJob));
  };

  // Check if jobsState is defined before accessing savedJobs and appliedJobs
  const savedJobs = jobsState ? jobsState.savedJobs : [];
  const appliedJobs = jobsState ? jobsState.appliedJobs : [];

  return (
    <div>
      <button onClick={handleSaveJob}>Save job</button>
      <button onClick={handleApplyJob}>Apply job</button>
    </div>
  );
}

export default JobsPage;
