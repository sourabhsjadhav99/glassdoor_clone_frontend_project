import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCardClicked } from "../../redux/jobDetailsSlice";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";
import { useFirebase } from "../../FirebaseProvider";
import { GiElectric } from "react-icons/gi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const JobDetailsCard = () => {
  const selectedJob = useSelector((state) => state.jobDetails.selectedJob);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { updateSavedJobs, userData, isLoggedIn } = useFirebase();
  const { savedJobs = [], appliedJobs = [] } = userData || {};
  const {
    company_name,
    title,
    location,
    description,
    detected_extensions,
    job_highlights,
    related_links,
    job_id,
  } = selectedJob || {};

  // Toggle full description visibility
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (!selectedJob) {
    return <div className="p-5">Please select a job to see the details.</div>;
  }

  // Check if the job is bookmarked
  const isJobBookmarked = (job_id) => {
    return savedJobs.some((job) => job.job_id === job_id);
  };

  // Check if the job is already applied
  const isJobApplied = (job_id) => {
    return appliedJobs.some((job) => job.job_id === job_id);
  };

  // Handle bookmark button click
  const handleBookmarkClick = async () => {
    if (isJobBookmarked(job_id)) {
      const updatedJobs = savedJobs.filter((job) => job.job_id !== job_id);
      await updateSavedJobs({ savedJobs: updatedJobs });
      toast.success("Job removed");
    } else {
      const newJob = selectedJob;
      const updatedJobs = [...savedJobs, newJob];
      await updateSavedJobs({ savedJobs: updatedJobs });
      toast.success("Job saved");
    }
  };

  let handleJobApplyClick = () => {
    navigate("/applyjob");
    toast.warning("Update Your Profile Data");
  };

  let handleCardClick = () => {
    dispatch(setIsCardClicked(false));
  };

  return (
    <div className="p-5 bg-white shadow-md rounded overflow-y-auto h-full scrollbar">
      <button
        onClick={handleCardClick}
        className="flex items-center bg-gray-100 px-2 rounded text-lg gap-2 hover:bg-gray-200 mb-2 md:hidden"
      >
        {" "}
        <span>
          <IoIosArrowBack />
        </span>{" "}
        <span>Back to job list</span>
      </button>
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-lg text-gray-700 mb-1">{company_name}</p>
          <p className="text-sm text-gray-600 mb-4">{location}</p>
        </div>
        <div className="flex gap-5 items-center">
          <button
            className={`text-xl bg-gray-100 hover:bg-green-400 hover:rounded-full w-[35px] h-[35px] flex items-center justify-center ${
              isJobBookmarked(job_id)
                ? "bg-green-400 rounded-full text-white"
                : ""
            }`}
            onClick={
              isLoggedIn ? handleBookmarkClick : () => navigate("/signup")
            }
          >
            <FaRegBookmark />
          </button>

          {isJobApplied(job_id) ? (
            <button
              disabled
              className={` disabled:cursor-not-allowed bg-green-800 text-white font-semibold p-2 rounded  }`}
            >
              <span>Applied</span>
            </button>
          ) : (
            <button
              onClick={
                isLoggedIn ? handleJobApplyClick : () => navigate("/signup")
              }
              className={`flex gap-2 items-center text-black bg-green-500 font-semibold p-2 rounded hover:text-white hover:bg-green-800 }`}
            >
              <span className="text-lg">
                <GiElectric />
              </span>{" "}
              <span>Easy Apply</span>
            </button>
          )}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Description</h3>
        <p className="text-sm">
          {showFullDescription
            ? description
            : `${description.slice(0, 200)}...`}
        </p>
        {description.length > 200 && (
          <button
            onClick={toggleDescription}
            className="text-blue-500 hover:underline"
          >
            {showFullDescription ? "Show Less..." : "Show More..."}
          </button>
        )}
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Details</h3>
        {detected_extensions?.posted_at && (
          <p className="text-sm">Posted: {detected_extensions.posted_at}</p>
        )}
        {detected_extensions?.salary && (
          <p className="text-sm">Salary: {detected_extensions.salary}</p>
        )}
        {detected_extensions?.schedule_type && (
          <p className="text-sm">Type: {detected_extensions.schedule_type}</p>
        )}
      </div>
      {job_highlights && job_highlights?.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">Highlights</h3>
          {job_highlights?.map((highlight, index) => (
            <div key={index} className="mb-2">
              <h4 className="font-semibold">{highlight.title}</h4>
              <ul className="list-disc ml-5">
                {highlight.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {related_links && related_links?.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">Related Links</h3>
          <ul className="list-disc ml-5">
            {related_links?.map((link, index) => (
              <li key={index}>
                <a
                  href={link?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobDetailsCard;
