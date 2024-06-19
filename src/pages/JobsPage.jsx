
// components/JobsPage.js
import React, { useEffect, useState } from "react";
import { useFirebase } from "../FirebaseProvider";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../redux/jobsSlice";

function JobsPage() {
  const { updateSavedJobs, userData } = useFirebase();
  const { savedJobs = [], appliedJobs = [] } = userData || {};
  const jobs = useSelector((state) => state.jobs.data); // Accessing jobs.data directly
  const loading = useSelector((state) => state.jobs.loading);
  const error = useSelector((state) => state.jobs.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    console.log('Fetched Jobs:', jobs);
  }, [jobs]);

  let handleSaveJob = async () => {
    const newJob = { id: 4, role: "doctor" };
    const updatedJobs = [...savedJobs, newJob];
    await updateSavedJobs({ savedJobs: updatedJobs });
  };

  let handleApplyJob = async () => {
    const newJob = { id: 4, role: "doctor" };
    const updatedJobs = [...appliedJobs, newJob];
    await updateSavedJobs({ appliedJobs: updatedJobs });
  };

  return (
    <div>
      <button onClick={handleSaveJob}>Save job</button>
      <button onClick={handleApplyJob}>Apply job</button>

    </div>
  );
}

export default JobsPage;
