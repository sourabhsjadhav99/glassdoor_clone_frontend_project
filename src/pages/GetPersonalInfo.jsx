import React, { useEffect, useState } from "react";
import { useFirebase } from "../FirebaseProvider";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
function GetPersonalInfo() {
  let [url, setUrl] = useState(null);
  let { getPdf, userData } = useFirebase();
  let navigate = useNavigate();

  console.log(userData);
  useEffect(() => {
    if (userData?.pdfURL) {
      getPdf(userData.pdfURL)
        .then((url) => {
          setUrl(url);
        })
        .catch((error) => {
          console.error("Error fetching PDF URL:", error);
        });
    }
  }, [userData?.pdfURL]);

  return (
    <div>
      <button
        className="flex items-center gap-2 border rounded"
        onClick={() => navigate("/create-edit-profile")}
      >
        {userData ? <small>Edit Profile</small> : <small>Create Profile</small>}
        <span>
          <MdEdit />
        </span>
      </button>

      <p>{userData?.firstname}</p>
      <p>{userData?.lastname}</p>
      <p>{userData?.mobile}</p>
      <p>{userData?.role}</p>
      <p>{userData?.userEmail}</p>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          Download PDF
        </a>
      ) : (
        "Loading..."
      )}
      <div>
        <button onClick={() => navigate("/savedjobs")}>Saved jobs</button>
      </div>
    </div>
  );
}

export default GetPersonalInfo;
