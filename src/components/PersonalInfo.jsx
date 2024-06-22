import React, { useEffect, useState } from "react";
import { useFirebase } from "../FirebaseProvider";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";

function PersonalInfo() {
  let [url, setUrl] = useState(null);

  // Retrieving getPdf and userData from FirebaseProvider
  let { getPdf, userData } = useFirebase();
  let navigate = useNavigate();

  useEffect(() => {
     // Fetch PDF URL when userData.pdfURL changes
    if (userData?.pdfURL) {
      getPdf(userData.pdfURL)
        .then((url) => {
          setUrl(url);
        })
        .catch((error) => {
          console.error("Error fetching PDF URL:", error);
        });
    }
  }, [userData?.pdfURL]);// Trigger effect on changes in userData.pdfURL

  return (
    <div className="bg-white flex flex-col justify-center gap-5 w-[100%]">
        <button
          className="flex items-center gap-2 border border-gray-300 rounded w-[120px] justify-center self-end p-2 hover:bg-blue-200 bg-green-200"
          onClick={() => navigate("/create-edit-profile")}
        >
          {userData ? (
            <small>Edit Profile</small>
          ) : (
            <small>Create Profile</small>
          )}
          <span>
            <MdEdit />
          </span>
        </button>

        <div className="border-2 border-gray-200 rounded flex flex-col gap-2 p-5">
          <p>
            First Name:{" "}
            <span className="text-lg font-semibold text-gray-500">
              {userData?.firstname}
            </span>{" "}
          </p>
          <p>
            Last Name:{" "}
            <span className="text-lg font-semibold text-gray-500">
              {userData?.lastname}
            </span>{" "}
          </p>
          <p>
            Mobile no.{" "}
            <span className="text-lg font-semibold text-gray-500">
              {userData?.mobile}
            </span>{" "}
          </p>
          <p>
            Registered Email:{" "}
            <span className="text-lg font-semibold text-gray-500">
              {userData?.userEmail}
            </span>{" "}
          </p>
          <p>
            Role:{" "}
            <span className="text-lg font-semibold text-gray-500">
              {userData?.role}
            </span>{" "}
          </p>
        </div>
        <div className="flex gap-1 justify-around border-2 border-gray-200 rounded p-5 items-center">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-500 text-sm md:text-md"
            >
              Uploaded CV
            </a>
          ) : (
            <button onClick={() => navigate("/create-edit-profile")} className="underline">Upload CV</button>
          )}
       
        </div>
   
    </div>
  );
}

export default PersonalInfo;
