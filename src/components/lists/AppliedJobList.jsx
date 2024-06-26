import React, { useEffect, useState } from "react";
import { useFirebase } from "../../FirebaseProvider";

import AppliedJobCard from "../cards/AppliedJobCard";

const SavedJobList = () => {
  const [data, setData] = useState([]);
  const [appliedLoading, setAppliedLoading] = useState(false);
  const [appliedError, setAppliedError] = useState(null);
  const {  userData } = useFirebase();


  // Destructure userData safely by providing default values
  const { appliedJobs = [], error=null, loading=false } = userData || {};

  useEffect(() => {
    // Update state with applied jobs data
    setData(appliedJobs)
    setAppliedError(error)
    setAppliedLoading(loading)
  }, [userData]);


  return (
    <div className="bg-white">
      {appliedError && <p>Error: {appliedError}</p>}

      {data.length > 0 && <div className="job-list">
        {data.length > 0 ? (
          data?.map((job, index) => (
           <AppliedJobCard key={job.id} job={job} />
          ))
        ) : (
          <div className="text-xl">Sorry! results not found</div>
        )}
      </div>}

      
    </div>
  );
};

export default SavedJobList;
