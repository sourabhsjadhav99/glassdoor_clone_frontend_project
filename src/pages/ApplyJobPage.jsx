import PersonalInfo from "../components/PersonalInfo";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../FirebaseProvider";
import Swal from "sweetalert2";
import JobDetailsCard_ from "../components/cards/jobDetailsCard_";

function ApplyJobPage() {
  // Retrieve the selected job from Redux state
  const selectedJob = useSelector((state) => state.jobDetails.selectedJob);

  // Local state to manage the visibility of the full job description
  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  // Retrieve user data and Firebase functions from the custom Firebase hook
  const { updateSavedJobs, userData, isLoggedIn } = useFirebase();

  // Destructure user data
  const { savedJobs = [], appliedJobs = [] } = userData || {};

  // Destructure selected job data
  const {

    id,
  } = selectedJob || {};


  // Check if the job is already applied
  const isJobApplied = () => {
    return appliedJobs.some((job) => job.id === id);
  };

  // Handle applying for the job
  let handleApplyJob = async () => {
    if (!isJobApplied()) {
      const newJob = selectedJob;
      const updatedJobs = [...appliedJobs, newJob];
      await updateSavedJobs({ appliedJobs: updatedJobs });
    }
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Job Applied successfully",
      showConfirmButton: false,
      timer: 1500,
    });

  };

  return (
    <div className="flex flex-col md:flex-row bg-white gap-5 p-5">
      <div className="w-[100%] md:w-[40%] ">
        <PersonalInfo />
        {userData ? (
          <div>
            {isJobApplied() ? (
              <button
                disabled
                className={`w-[100%] border mt-5 disabled:cursor-not-allowed bg-green-800 text-white font-semibold p-2 rounded  }`}
              >
                <span>Applied</span>
              </button>
            ) : (
              <button
              onClick={handleApplyJob}
              className={`w-[100%] border mt-5 rounded text-white font-semibold bg-green-400 hover:bg-green-700 hover:font-bold p-2 `}
              >
                  Apply Now
              </button>
            )}
          </div>
        ) : (
          <button
            className="underline"
            onClick={() => navigate("/create-edit-profile")}
          >
            Upload your profile data
          </button>
        )}
      </div>
      <div className="w-[100%] md:w-[60%] border rounded md:h-[100vh]">
      <JobDetailsCard_/>
      </div>

    </div>
  );
}

export default ApplyJobPage;
