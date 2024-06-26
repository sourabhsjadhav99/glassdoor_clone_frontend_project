import React, { useState } from "react";
import { FaRegBookmark, FaStar } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "../../FirebaseProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Img from "../Img";
import { fetchJobDetails, setIsCardClicked } from "../../redux/jobDetailSlice";
import CardSkeleton from "../skeletons/CardSkeleton";
function AppliedJobCard({ job }) {
   // Destructuring job object
   const { title, postDate, location, company, id } = job;
  const dispatch = useDispatch();
  const selectedJob = useSelector((state) => state.jobDetails.selectedJob);
  let navigate = useNavigate();

   // Firebase hooks for user data and actions
  const { updateSavedJobs, userData, isLoggedIn,loading } = useFirebase();
  const { appliedJobs = [] } = userData || {};


   // Function to generate a random salary for UI display
  function getRandomSalary() {
    return Math.floor(Math.random() * (15 - 4 + 1)) + 4;
  }

   // Function to generate random ratings for UI display
  function getRandomRatings() {
    return Math.round((Math.random() * (5 - 3) + 3) * 10) / 10;
  }

    // Handle click event on the job card
  const handleCardClick = () => {
    dispatch(fetchJobDetails(id));
    dispatch(setIsCardClicked(true));
  };

  const isApplied = (id) => {
    return appliedJobs?.some((job) => job.id === id);
  };

  const handleRemoveJob = async (e) => {
    e.stopPropagation();
    if (isApplied(id)) {
      // If the job is applied, remove it from applied jobs
      const updatedJobs = appliedJobs?.filter((job) => job.id !== id);
      await updateSavedJobs({ appliedJobs: updatedJobs });

      toast.success("Job removed");
    }
  };

  return (
    <>
    {!loading ? <div
      className={`border-b-2 rounded w-full  flex justify-between p-3 mb-2 bg-white hover:bg-gray-200 ${
        selectedJob && selectedJob?.id === id
          ? "border-2 border-gray-300 shadow-md"
          : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="flex flex-col justify-between  w-[80%]  gap-1">
        <div className="flex gap-2 items-center text-sm ">
        <div className="flex gap-2">
            <Img
              src={company?.logo}
              className="w-[25px] h-[25px] rounded-full"
            />
            <p className="w-[60%] truncate whitespace-nowrap overflow-hidden">
              {company.name}
            </p>
          </div>
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
          onClick={isLoggedIn ? handleRemoveJob : () => navigate("/signup")}
        >
          <MdDelete />
        </button>
        <p className="text-sm">{postDate}</p>
      </div>
    </div>: <CardSkeleton/>}
    </>
  );
}

export default AppliedJobCard;
