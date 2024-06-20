import React, { useState } from "react";
import { FaRegBookmark, FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { selectJob } from "../../redux/jobDetailsSlice";
import { useFirebase } from "../../FirebaseProvider";
function JobCard({ job }) {
  const {
    title,
    company_name,
    location,
    description,
    detected_extensions,
    job_id,
  } = job;
  const dispatch = useDispatch();
  const selectedJob = useSelector((state) => state.jobDetails.selectedJob);
  const { updateSavedJobs, userData } = useFirebase();
  const { savedJobs = [], appliedJobs = [] } = userData || {};

  // let handleRemoveJob = async (job_idToDelete) => {
  //   const updatedJobs = savedJobs.filter((job) => job.id !== job_idToDelete);
  //   await updateSavedJobs({ savedJobs: updatedJobs });

  // };

  function getRandomSalary() {
    return Math.floor(Math.random() * (15 - 4 + 1)) + 4;
  }
  function getRandomRatings() {
    return Math.round((Math.random() * (5 - 3) + 3) * 10) / 10;
  }

  const handleCardClick = () => {
    dispatch(selectJob(job));
  };


  const isJobBookmarked = (job_id) => {
    return savedJobs.some((job) => job.job_id === job_id);
  };

  const handleBookmarkClick = async (e) => {
    e.stopPropagation();
    if (isJobBookmarked(job_id)) {
      const updatedJobs = savedJobs.filter((job) => job.id !== job_id);
      await updateSavedJobs({ savedJobs: updatedJobs });
    } else {
      const newJob = job;
    const updatedJobs = [...savedJobs, newJob];
    await updateSavedJobs({ savedJobs: updatedJobs });
    }
  };

  // let handleSaveJob = async () => {
  //   const newJob = job;
  //   const updatedJobs = [...savedJobs, newJob];
  //   await updateSavedJobs({ savedJobs: updatedJobs });
  // };
  console.log(job);

  return (
    <div
      className={`border-b-2 rounded w-full  flex justify-between p-3 mb-2 bg-white hover:bg-gray-200 ${
        selectedJob && selectedJob.job_id === job_id
          ? "border-2 border-gray-300 shadow-md"
          : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="flex flex-col justify-between  gap-1">
        <div className="flex gap-2 items-center text-sm ">
          <p className=""> {company_name}</p>
          <p className="flex items-center gap-1">
            <span>{getRandomRatings()}</span>{" "}
            <span className="text-xs">
              <FaStar />
            </span>
          </p>
        </div>
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-xs">{location}</p>
        <p className="text-xs">{getRandomSalary()}L (glassdoor estimated) </p>
      </div>
      <div className="flex flex-col justify-between items-end">
        <button
          className={`text-xl hover:bg-green-400 hover:rounded-full w-[35px] h-[35px] flex items-center justify-center ${isJobBookmarked(job_id) ? 'bg-green-400 rounded-full text-white' : ''}`}
          onClick={handleBookmarkClick}
        >
          <FaRegBookmark />
        </button>
        <p className="text-sm">{detected_extensions?.posted_at}</p>
      </div>
    </div>
  );
}

export default JobCard;
