import React, { useState } from "react";
import { FaRegBookmark, FaStar } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectJob, setIsCardClicked } from "../../redux/jobDetailsSlice";
import { useFirebase } from "../../FirebaseProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function SavedJobCard({ job }) {
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
  let navigate = useNavigate();

  const { updateSavedJobs, userData, isLoggedIn } = useFirebase();
  const { savedJobs = [] } = userData || {};

  // Function to generate random salary for display
  function getRandomSalary() {
    return Math.floor(Math.random() * (15 - 4 + 1)) + 4;
  }

  // Function to generate random ratings for display
  function getRandomRatings() {
    return Math.round((Math.random() * (5 - 3) + 3) * 10) / 10;
  }

  // Handle click on the job card
  const handleCardClick = () => {
    dispatch(selectJob(job));
    dispatch(setIsCardClicked(true));
  };

  // Check if the job is bookmarked
  const isJobBookmarked = (job_id) => {
    return savedJobs.some((job) => job.job_id === job_id);
  };

  // Handle click on the bookmark icon
  const handleBookmarkClick = async (e) => {
    e.stopPropagation();
    if (isJobBookmarked(job_id)) {
      const updatedJobs = savedJobs.filter((job) => job.job_id !== job_id);
      await updateSavedJobs({ savedJobs: updatedJobs });
      toast.success("Job removed");
    }
  };

  return (
    <div
      className={`border-b-2 rounded w-full  flex justify-between p-3 mb-2 bg-white hover:bg-gray-200 ${
        selectedJob && selectedJob.job_id === job_id
          ? "border-2 border-gray-300 shadow-md"
          : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="flex flex-col justify-between  w-[80%] gap-1">
        <div className="flex gap-2 items-center text-sm ">
          <p className="w-[40%] truncate whitespace-nowrap overflow-hidden">
            {" "}
            {company_name}
          </p>
          <p className="flex items-center gap-1">
            <span>{getRandomRatings()}</span>{" "}
            <span className="text-xs">
              <FaStar />
            </span>
          </p>
        </div>
        <p className="text-lg font-semibold w-[80%] truncate whitespace-nowrap overflow-hidden">
          {title}
        </p>
        <p className="text-xs">{location}</p>

        <p className="text-xs">{getRandomSalary()}L (glassdoor estimated) </p>
      </div>
      <div className="flex flex-col justify-between items-end">
        <button
          className={`text-xl bg-white text-gray-500 hover:text-red-600 rounded-md w-[35px] h-[35px] flex items-center justify-center `}
          onClick={isLoggedIn ? handleBookmarkClick : () => navigate("/signup")}
        >
          <MdDelete />
        </button>
        <p className="text-sm">{detected_extensions?.posted_at}</p>
      </div>
    </div>
  );
}

export default SavedJobCard;
