import React from "react";
import companyImg from "../assets/companies.webp";
import Img from "../components/Img";
import { useEffect, useState } from "react";
import JobSearch from "../components/JobSearch";
import JobList from "../components/JobsList";

import JobDetailsCard from "../components/cards/JobDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { selectJob, setIsCardClicked } from "../redux/jobDetailsSlice";
import SkeletonLoader from "../components/skeletons/Skeleton";
import CompanySearchForm from "../components/forms/CompanySearchForm";
import CompanyList from "../components/CompanyList";
function CompaniesPage() {
  // Get state values from the Redux store
  const isCardClicked = useSelector((state) => state.jobDetails.isCardClicked);
  const jobs = useSelector((state) => state.jobs?.data);
  const loading = useSelector((state) => state.jobs.loading);

  // Initialize dispatch
  const dispatch = useDispatch();

  // useEffect to handle side effects: select the first job by default and ensure the job details card is displayed
  useEffect(() => {
    if (jobs.length > 0) {
      dispatch(selectJob(jobs[0])); // Select the first job by default
      dispatch(setIsCardClicked(true)); // Ensure the job details card is displayed
    }
  }, [dispatch, jobs]);
  return (
    <div className="w-full bg-white">
      {/* Header Section with Image and Information */}
      <div className="w-full bg-green-50 flex justify-center py-10">
        <div className="w-full xl:w-[70%] lg:[85%] flex flex-col lg:flex-row justify-between items-center gap-2">
          <div className="w-full lg:w-1/2 ">
            {/* Image Container */}
            <Img src={companyImg} alt="" className="w-[100%] h-[100%]" />
          </div>

          {/* Text Information Container */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="">
              <h1 className="text-2xl font-bold">
                Find a workplace that works for you{" "}
                <small className="bg-green-200 text-xs p-1 font-bold ">
                  NEW
                </small>
              </h1>
            </div>

            {/* Description Text */}
            <div>
              <p className="text-[#20262e]">
                Discover what an employer is really like before you make your
                next move. Search reviews and ratings, and filter companies
                based on the qualities that matter most to your job search.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              <button className="bg-white border text-[#20262e]  rounded  p-2 text-md font-bold">
                Work/Life Balance
              </button>
              <button className="bg-white border text-[#20262e]  rounded  p-2 text-md font-bold">
                Diversity and inclusion
              </button>
              <button className="bg-white border text-[#20262e]  rounded  p-2 text-md font-bold">
                Compensation and Benifits
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="w-full flex flex-col ">
        <div
          className={`flex flex-col md:flex-row border-b pt-5 gap-2 items-center justify-center`}
        >
          <p>Have an employer in mind?</p>
          <div className="w-[100%] md:w-[40%] ">
            <CompanySearchForm />
          </div>
        </div>
        {!loading ? (
          <div className="flex  justify-center p-2 lg:p-5 ">
            <div className="w-[100%] lg:w-[95%] xl:w-[90%] flex flex-col md:flex-row justify-center gap-10 ">
              <div className={`w-[100%] md:w-[40%]`}>
                <CompanyList />
              </div>
              {jobs?.length > 0 &&<div
                className={`w-[100%] md:w-[60%] border rounded md:h-[167vh] overflow-hidden `}
              >
                <div className="job-details-container">
                  <JobDetailsCard />
                </div>
              </div>}
            </div>
          </div>
        ) : (
          <SkeletonLoader />
        )}
      </div>
    </div>
  );
}

export default CompaniesPage;
