import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCardClicked } from "../../redux/jobDetailSlice";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";
import { useFirebase } from "../../FirebaseProvider";
import { GiElectric } from "react-icons/gi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import spinner from "../../assets/spinner.svg"
import DetailsCardSkeleton from "../skeletons/DetailsCardSkeleton";
const JobDetailsCard_ = () => {
  const selectedJob = useSelector((state) => state.jobDetails.selectedJob);
  const loading = useSelector((state) => state.jobDetails.loading);
  // const error = useSelector((state) => state.jobDetails.error);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { updateSavedJobs, userData, isLoggedIn } = useFirebase();
  const { savedJobs = [], appliedJobs = [] } = userData || {};
  const { company, title, location, description, skills, type, workPlace, id } =
    selectedJob || {};

  // Toggle full description visibility
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (!selectedJob) {
    return  <p className="p-5 text-lg">Oops! We're having trouble retrieving data from API right now. Please try again later.</p>
  }

  let handleCardClick = () => {
    dispatch(setIsCardClicked(false));
  };

  return (
    <>
   {!loading ? <div className="p-5 bg-white shadow-md rounded overflow-y-auto h-full scrollbar">
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
          <p className="text-sm text-gray-600 mb-4">{location}</p>
          <p className="text-sm text-gray-600 mb-4">Workplace: {workPlace}</p>
          <p className="text-sm text-gray-600 mb-4">Type: {type}</p>
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
      {skills && skills?.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">Skills</h3>
          <ul className="list-disc ml-5">
            {skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1">Company Details:</h2>
        <h3 className="text-lg text-gray-700 mb-1">{company.name}</h3>
        <p className="text-gray-700 mb-1">{company.description}</p>
        <p className="text-gray-700 font-semibold mb-1">
          Staff: {company?.staffCountRange.start} to{" "}
          {company?.staffCountRange.end}
        </p>
        {company?.specialities && company?.specialities?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Specialities</h3>
            <ul className="list-disc ml-5">
              {company?.specialities.map((speciality, idx) => (
                <li key={idx}>{speciality}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div> : <DetailsCardSkeleton/>}
    </>
  );
};

export default JobDetailsCard_;
