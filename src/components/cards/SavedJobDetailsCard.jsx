

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCardClicked } from "../../redux/jobDetailsSlice";
import { IoIosArrowBack } from "react-icons/io";

const SavedJobDetailsCard = () => {
  const selectedJob = useSelector((state) => state.jobDetails.selectedJob);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useDispatch();
 


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
  

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (!selectedJob) {
    return <div className="p-5">Please select a job to see the details.</div>;
  }



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
          <p className="text-sm">Posted: {detected_extensions?.posted_at}</p>
        )}
        {detected_extensions?.salary && (
          <p className="text-sm">Salary: {detected_extensions?.salary}</p>
        )}
        {detected_extensions?.schedule_type && (
          <p className="text-sm">Type: {detected_extensions?.schedule_type}</p>
        )}
      </div>
      {job_highlights && job_highlights.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">Highlights</h3>
          {job_highlights.map((highlight, index) => (
            <div key={index} className="mb-2">
              <h4 className="font-semibold">{highlight?.title}</h4>
              <ul className="list-disc ml-5">
                {highlight?.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {related_links && related_links.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">Related Links</h3>
          <ul className="list-disc ml-5">
            {related_links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.link}
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

export default SavedJobDetailsCard;
