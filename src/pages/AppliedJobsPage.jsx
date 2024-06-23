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
import savejob from "../assets/savejob.jpg";
import Img from "../components/Img";

function AppliedJobsPage() {
  // Retrieve state values from the Redux store
  const isCardClicked = useSelector((state) => state.jobDetails.isCardClicked);

  const dispatch = useDispatch();
  const { userData, loading } = useFirebase();

  // Destructure userData safely by providing default values
  const { appliedJobs = [] } = userData || {};

  // Effect hook to run once on component mount
  useEffect(() => {
    // Check if there are applied jobs
    if (appliedJobs.length > 0) {
      dispatch(selectJob(appliedJobs[0])); // Select the first job by default
      dispatch(setIsCardClicked(true)); // Ensure the job details card is displayed
    }
  }, [dispatch, appliedJobs]);

  return (
    <div className="w-[100%] md:min-h-[90vh] bg-white  ">
      {!loading ? (
        <div>
          {appliedJobs?.length > 0 ? (
            <div className="flex  justify-center p-2 lg:p-5 ">
              <div className="w-[100%] lg:w-[95%] xl:w-[90%] flex flex-col md:flex-row justify-center gap-10 ">
                <div
                  className={`w-[100%] md:w-[40%] ${
                    isCardClicked ? "hidden" : "block"
                  } md:block`}
                >
                  <AppliedJobList />
                </div>
                {appliedJobs?.length > 0 && <div
                  className={`w-[100%] md:w-[60%] border rounded md:h-[167vh] overflow-hidden ${
                    isCardClicked ? "block" : "hidden"
                  } md:block`}
                >
                  <div className="job-details-container">
                     <SavedJobDetailsCard />
                  </div>
                </div>}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center p-5 pt-10">
              <div className="w-[100%] md:w-[60%] lg:w-[40%] border-2 rounded border-gray-300 p-5 flex flex-col items-center justify-center gap-2">
                <div>
                  <Img src={savejob} className={"w-[300px] h-[200px]"} />{" "}
                </div>
                <div className="flex flex-col items-center gap-2">
                <h3 className="text-xl">You haven't applied any jobs</h3>
                <p>Apply jobs and come back here to review.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <SkeletonLoader />
      )}
    </div>
  );
}

export default AppliedJobsPage;
