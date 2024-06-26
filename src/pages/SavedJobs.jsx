import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SavedJobList from "../components/lists/SavedJobsList";
import { useFirebase } from "../FirebaseProvider";
import SkeletonLoader from "../components/skeletons/Skeleton";
import Img from "../components/Img";
import savejob from "../assets/savejob.jpg";
import JobDetailsCard from "../components/cards/JobDetailsCard";
import { fetchJobDetails, setIsCardClicked } from "../redux/jobDetailSlice";
import JobDetailsCard_ from "../components/cards/jobDetailsCard_";

function SavedJobs() {
  // Use Redux useSelector to get the state of isCardClicked from the jobDetails slice
  const isCardClicked = useSelector((state) => state.jobDetails?.isCardClicked);

  const dispatch = useDispatch();

  // Get userData and loading state from useFirebase hook
  const { userData, loading } = useFirebase();

  // Destructure userData safely by providing default values for savedJobs
  const { savedJobs = [] } = userData || {};

  // first 
  useEffect(() => {
    if (savedJobs?.length > 0) {
      dispatch(fetchJobDetails(savedJobs[0].id)); // Select the first job by default
      dispatch(setIsCardClicked(true)); // Ensure the job details card is displayed
    }
  }, [dispatch, savedJobs]);

  return (
    <div className="w-[100%] bg-white md:min-h-[90vh] ">
      {!loading ? (
        <div>
          {savedJobs.length > 0 ? (
            <div className="flex  justify-center p-2 lg:p-5 ">
              <div className="w-[100%] lg:w-[95%] xl:w-[90%] flex flex-col md:flex-row justify-center gap-10 ">
                <div
                  className={`w-[100%] md:w-[40%] ${
                    isCardClicked ? "hidden" : "block"
                  } md:block`}
                >
                  <SavedJobList />
                </div>
               {savedJobs?.length > 0 && isCardClicked &&  <div
                  className={`w-[100%] md:w-[60%] border rounded md:h-[167vh] overflow-hidden ${
                    isCardClicked ? "block" : "hidden"
                  } md:block`}
                >
                  <div className="job-details-container">
                    <JobDetailsCard_ />
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
            
                  <h3 className="text-xl">You haven't saved any jobs</h3>
                  <p>
                    Save jobs by clicking the heart on a job you like. Come back
                    here to review them and apply to the best jobs for you.
                  </p>
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

export default SavedJobs;
