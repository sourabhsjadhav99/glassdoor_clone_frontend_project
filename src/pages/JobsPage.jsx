import React, { useState } from "react";
import { useFirebase } from "../FirebaseProvider";

function JobsPage() {
  const { updateSavedJobs, userData } = useFirebase();

  const { savedJobs = [], appliedJobs=[] } = userData || {};



  let handleSaveJob = async () => {
    const newJob = { id: 4, role: "bdoctor" };
    const updatedJobs = [...savedJobs, newJob]; // Create a new array with the added job
    await updateSavedJobs({ savedJobs: updatedJobs }); // Update the saved jobs in Firebase
  };

  let handleApplyJob = async () => {
    const newJob = { id: 4, role: "bdoctor" };
    const updatedJobs = [...appliedJobs, newJob]; // Create a new array with the added job
    await updateSavedJobs({ appliedJobs: updatedJobs }); // Update the saved jobs in Firebase
  };



  return (
    <div>
      <button onClick={handleSaveJob}>Save job</button>
      <button onClick={handleApplyJob}>Apply job</button>
    </div>
  );
}

export default JobsPage;
