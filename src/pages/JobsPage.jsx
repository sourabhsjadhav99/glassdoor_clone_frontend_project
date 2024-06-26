import { useEffect, useState } from "react";
import JobSearch from "../components/JobSearch";
import JobList from "../components/lists/JobsList";
import JobDetailsCard from "../components/cards/JobDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobDetails, setIsCardClicked } from "../redux/jobDetailSlice";
import SkeletonLoader from "../components/skeletons/Skeleton";

function JobsPage() {
  // Get state values from the Redux store
  const isCardClicked = useSelector((state) => state.jobDetails.isCardClicked);
  const jobs = useSelector((state) => state.jobSearch.jobs);
  const loading = useSelector((state) => state.jobSearch.loading);
  const error = useSelector((state) => state.jobSearch.error);


  // Initialize dispatch
  const dispatch = useDispatch();

  // useEffect to handle side effects: select the first job by default and ensure the job details card is displayed
  useEffect(() => {
    if (jobs.length > 0) {
      dispatch(fetchJobDetails(jobs[0].id)); // Select the first job by default
      dispatch(setIsCardClicked(true)); // Ensure the job details card is displayed
    }
  }, [dispatch, jobs]);

  return (
    <div className="w-[100%] bg-white  ">
      <div
        className={`w-[100%] border-b border-gray-300 pt-5 ${
          isCardClicked ? "hidden" : "block"
        } md:block`}
      >
        <JobSearch />
      </div>
      {error && <p className="p-5 text-center">Error: {error}</p>}
      {!loading ? (
        <div className="flex  justify-center p-2 lg:p-5 ">
          <div className="w-[100%] lg:w-[95%] xl:w-[90%] flex flex-col md:flex-row justify-center gap-10 ">
            <div
              className={`w-[100%] md:w-[40%] ${
                isCardClicked ? "hidden" : "block"
              } md:block`}
            >
              <JobList />
            </div>
            {jobs?.length > 0 &&<div
              className={`w-[100%] md:w-[60%] border rounded md:h-[167vh] overflow-hidden ${
                isCardClicked ? "block" : "hidden"
              } md:block`}
            >
              <div className="job-details-container"><JobDetailsCard /></div>
            </div>}
          </div>
        </div>
      ) : (
        <SkeletonLoader /> 
       )}
    </div>
  );
}

export default JobsPage;
