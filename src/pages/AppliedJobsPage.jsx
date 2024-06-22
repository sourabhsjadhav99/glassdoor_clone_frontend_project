import { useEffect, useState } from "react";
import JobSearch from "../components/JobSearch";
import JobList from "../components/JobsList";

import JobDetailsCard from "../components/cards/JobDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { selectJob, setIsCardClicked } from "../redux/jobDetailsSlice";
import AppliedJobList from "../components/AppliedJobList";
import { useFirebase } from "../FirebaseProvider";
import SavedJobDetailsCard from "../components/cards/SavedJobDetailsCard";
import SkeletonLoader from "../components/skeletons/Skeleton";

function AppliedJobsPage() {
  const isCardClicked = useSelector((state) => state.jobDetails.isCardClicked);
  console.log(isCardClicked);

  const dispatch = useDispatch();
  const { userData, loading } = useFirebase();

  // Destructure userData safely by providing default values
  const { appliedJobs = [] } = userData || {};

  useEffect(() => {
    if (appliedJobs.length > 0) {
      dispatch(selectJob(appliedJobs[0])); // Select the first job by default
      dispatch(setIsCardClicked(true)); // Ensure the job details card is displayed
    }
  }, [dispatch, appliedJobs]);
  return (
    <div className="w-[100%] bg-white  ">
      {!loading ? (
        <div className="flex  justify-center p-2 lg:p-5 ">
          <div className="w-[100%] lg:w-[95%] xl:w-[90%] flex flex-col md:flex-row justify-center gap-10 ">
            <div
              className={`w-[100%] md:w-[40%] ${
                isCardClicked ? "hidden" : "block"
              } md:block`}
            >
              <AppliedJobList />
            </div>
            <div
              className={`w-[100%] md:w-[60%] border rounded md:h-[167vh] overflow-hidden ${
                isCardClicked ? "block" : "hidden"
              } md:block`}
            >
              <div className="job-details-container">
                {appliedJobs?.length > 0 && <SavedJobDetailsCard />}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SkeletonLoader />
      )}
    </div>
  );
}

export default AppliedJobsPage;
