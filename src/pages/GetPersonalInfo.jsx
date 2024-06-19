// import React, { useEffect, useState } from "react";
// import { useFirebase } from "../FirebaseProvider";
// import { useNavigate } from "react-router-dom";
// import { MdEdit } from "react-icons/md";
// function GetPersonalInfo() {
//   let [url, setUrl] = useState(null);
//   let { getPdf, userData } = useFirebase();
//   let navigate = useNavigate();

//   console.log(userData);
//   useEffect(() => {
//     if (userData?.pdfURL) {
//       getPdf(userData.pdfURL)
//         .then((url) => {
//           setUrl(url);
//         })
//         .catch((error) => {
//           console.error("Error fetching PDF URL:", error);
//         });
//     }
//   }, [userData?.pdfURL]);

//   return (
//     <div>
//       <button
//         className="flex items-center gap-2 border rounded"
//         onClick={() => navigate("/create-edit-profile")}
//       >
//         {userData ? <small>Edit Profile</small> : <small>Create Profile</small>}
//         <span>
//           <MdEdit />
//         </span>
//       </button>

//       <p>{userData?.firstname}</p>
//       <p>{userData?.lastname}</p>
//       <p>{userData?.mobile}</p>
//       <p>{userData?.role}</p>
//       <p>{userData?.userEmail}</p>
//       {url ? (
//         <a href={url} target="_blank" rel="noopener noreferrer">
//           Download PDF
//         </a>
//       ) : (
//         "Loading..."
//       )}
//       <div>
//         <button onClick={() => navigate("/savedjobs")}>Saved jobs</button>
//       </div>
//     </div>
//   );
// }

// export default GetPersonalInfo;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPdfUrl, fetchUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";

function GetPersonalInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userData = useSelector((state) => state.user.userData);
  const pdfURL = useSelector((state) => state.user.pdfURL);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserData(user.uid));
    }
  }, [user, dispatch]);

  const handleGetPdf = async (path) => {
    setPdfLoading(true);
    dispatch(fetchPdfUrl(path)).finally(() => setPdfLoading(false));
  };

  return (
    <div>
      <h1>Personal Info</h1>
      {userData && (
        <div>
          <p>First Name: {userData.firstname}</p>
          <p>Last Name: {userData.lastname}</p>
          <p>Mobile: {userData.mobile}</p>
          <p>Role: {userData.role}</p>
          <button onClick={() => handleGetPdf(userData.pdfURL)}>
            Get PDF
          </button>
          {pdfLoading ? <p>Loading PDF...</p> : pdfURL && <a href={pdfURL} download>Download PDF</a>}
        </div>
      )}
    </div>
  );
}

export default GetPersonalInfo;
